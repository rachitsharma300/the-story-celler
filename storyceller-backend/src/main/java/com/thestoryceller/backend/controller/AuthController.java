package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.dto.AuthResponse;
import com.thestoryceller.backend.dto.LoginRequest;
import com.thestoryceller.backend.dto.RegisterRequest;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.security.JwtTokenProvider;
import com.thestoryceller.backend.service.UserService;
import lombok.RequiredArgsConstructor;
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
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            User user = userService.getUserByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            return ResponseEntity.ok(new AuthResponse(
                    jwt,
                    user.getEmail(),
                    user.getName(),
                    user.getRole()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
    }
}
