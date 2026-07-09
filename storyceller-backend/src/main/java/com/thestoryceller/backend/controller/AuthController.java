package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.dto.AuthResponse;
import com.thestoryceller.backend.dto.LoginRequest;
import com.thestoryceller.backend.dto.RegisterRequest;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.security.JwtTokenProvider;
import com.thestoryceller.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;

    @Value("${google.client.id:}")
    private String googleClientId;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            User user = User.builder()
                    .name(registerRequest.getName())
                    .email(registerRequest.getEmail())
                    .password(registerRequest.getPassword())
                    .role("USER")
                    .build();
            User registered = userService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", registered.getId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            User user = userService.getUserByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            return ResponseEntity.ok(new AuthResponse(
                    jwt,
                    user.getEmail(),
                    user.getName(),
                    user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestParam String email) {
        try {
            userService.generateAndSendOtp(email);
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        try {
            boolean isValid = userService.verifyOtp(email, otp);
            if (!isValid) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired OTP"));
            }

            User user = userService.getUserByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Manually set authentication for the OTP verified user
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new AuthResponse(
                    jwt,
                    user.getEmail(),
                    user.getName(),
                    user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");
            String newPassword = request.get("newPassword");

            userService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        try {
            String idToken = request.get("credential");
            if (idToken == null || idToken.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Google credential is required"));
            }

            // Verify Google token via Google API
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest httpRequest = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken))
                    .GET()
                    .build();

            java.net.http.HttpResponse<String> response = client.send(httpRequest,
                    java.net.http.HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid Google ID token"));
            }

            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            Map<String, Object> payload = mapper.readValue(response.body(), Map.class);

            String email = (String) payload.get("email");
            String name = (String) payload.get("name");
            String aud = (String) payload.get("aud");

            // Validate Google Client ID Audience
            if (googleClientId != null && !googleClientId.isBlank()) {
                if (aud == null || !googleClientId.equals(aud)) {
                    return ResponseEntity.status(401).body(Map.of("error", "Invalid Google ID token client ID mismatch"));
                }
            }

            if (email == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Failed to retrieve email from Google profile"));
            }

            if (name == null || name.isBlank()) {
                name = email.split("@")[0];
            }

            User user = userService.registerGoogleUser(email, name);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new AuthResponse(
                    jwt,
                    user.getEmail(),
                    user.getName(),
                    user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal Google Auth failure: " + e.getMessage()));
        }
    }
}
