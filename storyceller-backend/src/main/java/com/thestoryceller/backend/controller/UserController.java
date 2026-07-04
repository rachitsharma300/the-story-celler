package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        return userService.getUserByEmail(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "role", user.getRole(),
                        "phone", user.getPhone() != null ? user.getPhone() : "",
                        "address", user.getAddress() != null ? user.getAddress() : "",
                        "city", user.getCity() != null ? user.getCity() : "",
                        "state", user.getState() != null ? user.getState() : "",
                        "pincode", user.getPincode() != null ? user.getPincode() : ""
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateUserProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody User updatedData) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        try {
            User updated = userService.updateUserProfile(userDetails.getUsername(), updatedData);
            return ResponseEntity.ok(Map.of(
                    "id", updated.getId(),
                    "name", updated.getName(),
                    "email", updated.getEmail(),
                    "role", updated.getRole(),
                    "phone", updated.getPhone() != null ? updated.getPhone() : "",
                    "address", updated.getAddress() != null ? updated.getAddress() : "",
                    "city", updated.getCity() != null ? updated.getCity() : "",
                    "state", updated.getState() != null ? updated.getState() : "",
                    "pincode", updated.getPincode() != null ? updated.getPincode() : ""
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
