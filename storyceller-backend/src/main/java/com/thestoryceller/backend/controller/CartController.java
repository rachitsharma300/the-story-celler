package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.CartItem;
import com.thestoryceller.backend.entity.Product;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.repository.CartItemRepository;
import com.thestoryceller.backend.repository.ProductRepository;
import com.thestoryceller.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return userRepository.findByEmail(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(cartItemRepository.findByUser(user)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping
    public ResponseEntity<?> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Object> body) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Long productId = ((Number) body.get("productId")).longValue();
        Integer quantity = body.containsKey("quantity") ? ((Number) body.get("quantity")).intValue() : 1;

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        CartItem cartItem = cartItemRepository.findByUserAndProductId(user, productId)
                .map(item -> {
                    item.setQuantity(item.getQuantity() + quantity);
                    return cartItemRepository.save(item);
                })
                .orElseGet(() -> {
                    CartItem newItem = CartItem.builder()
                            .user(user)
                            .product(product)
                            .quantity(quantity)
                            .build();
                    return cartItemRepository.save(newItem);
                });

        return ResponseEntity.ok(cartItem);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> removeFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long cartItemId) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return cartItemRepository.findById(cartItemId)
                .map(item -> {
                    if (!item.getUser().getEmail().equals(userDetails.getUsername())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                    cartItemRepository.delete(item);
                    return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return userRepository.findByEmail(userDetails.getUsername())
                .map(user -> {
                    cartItemRepository.deleteByUser(user);
                    return ResponseEntity.ok(Map.of("message", "Cart cleared"));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
