package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Product;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.entity.Wishlist;
import com.thestoryceller.backend.repository.ProductRepository;
import com.thestoryceller.backend.repository.UserRepository;
import com.thestoryceller.backend.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WishlistController {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<Wishlist>> getWishlist(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return userRepository.findByEmail(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(wishlistRepository.findByUser(user)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping
    public ResponseEntity<?> addToWishlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Object> body) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Long productId = ((Number) body.get("productId")).longValue();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        Wishlist wishlist = wishlistRepository.findByUserAndProductId(user, productId)
                .orElseGet(() -> {
                    Wishlist newItem = Wishlist.builder()
                            .user(user)
                            .product(product)
                            .build();
                    return wishlistRepository.save(newItem);
                });

        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/{wishlistItemId}")
    public ResponseEntity<?> removeFromWishlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long wishlistItemId) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return wishlistRepository.findById(wishlistItemId)
                .map(item -> {
                    if (!item.getUser().getEmail().equals(userDetails.getUsername())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                    wishlistRepository.delete(item);
                    return ResponseEntity.ok(Map.of("message", "Item removed from wishlist"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
