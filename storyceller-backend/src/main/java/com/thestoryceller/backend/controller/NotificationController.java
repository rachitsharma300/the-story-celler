package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Notification;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.repository.NotificationRepository;
import com.thestoryceller.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return userRepository.findByEmail(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(notificationRepository.findByUserOrderByCreatedAtDesc(user)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<?> markAsRead(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long notificationId) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return notificationRepository.findById(notificationId)
                .map(notification -> {
                    if (!notification.getUser().getEmail().equals(userDetails.getUsername())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                    notification.setIsRead(true);
                    notificationRepository.save(notification);
                    return ResponseEntity.ok(Map.of("message", "Notification marked as read"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createNotification(@RequestBody Map<String, Object> body) {
        String email = (String) body.get("email");
        String title = (String) body.get("title");
        String message = (String) body.get("message");

        if (email == null || title == null || message == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email, title, and message are required"));
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .isRead(false)
                .build();

        Notification saved = notificationRepository.save(notification);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
