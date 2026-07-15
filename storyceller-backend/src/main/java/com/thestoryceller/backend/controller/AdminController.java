package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.entity.Product;
import com.thestoryceller.backend.entity.enums.OrderStatus;
import com.thestoryceller.backend.repository.UserRepository;
import com.thestoryceller.backend.repository.OrderRepository;
import com.thestoryceller.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        List<Map<String, Object>> list = orderRepository.findAll().stream()
                .map(order -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", order.getId());
                    map.put("orderId", order.getOrderId());
                    map.put("productSlug", order.getProductSlug());
                    map.put("productName", order.getProductName());
                    map.put("quantity", order.getQuantity());
                    map.put("occasion", order.getOccasion());
                    map.put("pages", order.getPages());
                    map.put("printingType", order.getPrintingType());
                    map.put("personalDetails", order.getPersonalDetails());
                    map.put("uploadedPhotos", order.getUploadedPhotos());
                    map.put("frontCoverPhoto", order.getFrontCoverPhoto());
                    map.put("totalAmount", order.getTotalAmount());
                    map.put("advanceAmount", order.getAdvanceAmount());
                    map.put("status", order.getStatus());
                    map.put("finalPdfUrl", order.getFinalPdfUrl());
                    map.put("createdAt", order.getCreatedAt());

                    User u = order.getUser();
                    if (u != null) {
                        map.put("customerName", u.getName());
                        map.put("customerEmail", u.getEmail());
                        map.put("customerPhone", u.getPhone() != null ? u.getPhone() : "");
                        map.put("customerAddress", u.getAddress() != null ? u.getAddress() : "");
                        map.put("customerCity", u.getCity() != null ? u.getCity() : "");
                        map.put("customerState", u.getState() != null ? u.getState() : "");
                        map.put("customerPincode", u.getPincode() != null ? u.getPincode() : "");
                    } else {
                        map.put("customerName", "Guest Customer");
                        map.put("customerEmail", "");
                        map.put("customerPhone", "");
                        map.put("customerAddress", "");
                        map.put("customerCity", "");
                        map.put("customerState", "");
                        map.put("customerPincode", "");
                    }
                    return map;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody Map<String, String> body) {
        
        String statusStr = body.get("status");
        if (statusStr == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Status field is required"));
        }

        return orderRepository.findByOrderId(orderId)
                .map(order -> {
                    try {
                        OrderStatus status = OrderStatus.valueOf(statusStr.toUpperCase());
                        order.setStatus(status);
                        Order saved = orderRepository.save(order);
                        return ResponseEntity.ok(saved);
                    } catch (IllegalArgumentException e) {
                        return ResponseEntity.badRequest().body(Map.of("error", "Invalid status value"));
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<Map<String, Object>> users = userRepository.findAll().stream()
                .map(user -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", user.getId());
                    map.put("name", user.getName());
                    map.put("email", user.getEmail());
                    map.put("role", user.getRole());
                    map.put("phone", user.getPhone() != null ? user.getPhone() : "");
                    map.put("city", user.getCity() != null ? user.getCity() : "");
                    map.put("state", user.getState() != null ? user.getState() : "");
                    return map;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<?> updateUserRole(
            @PathVariable Long userId,
            @RequestBody Map<String, String> body) {
        
        String role = body.get("role");
        if (role == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Role field is required"));
        }

        return userRepository.findById(userId)
                .map(user -> {
                    user.setRole(role.toUpperCase());
                    userRepository.save(user);
                    return ResponseEntity.ok(Map.of("success", true, "role", user.getRole()));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/orders/{orderId}/pdf")
    public ResponseEntity<?> updateOrderPdf(
            @PathVariable String orderId,
            @RequestBody Map<String, String> body) {
        
        String pdfUrl = body.get("pdfUrl");
        if (pdfUrl == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "pdfUrl field is required"));
        }

        return orderRepository.findByOrderId(orderId)
                .map(order -> {
                    order.setFinalPdfUrl(pdfUrl);
                    Order saved = orderRepository.save(order);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getAdminStats() {
        List<Order> orders = orderRepository.findAll();
        List<User> users = userRepository.findAll();

        long totalOrders = orders.size();
        long totalUsers = users.size();
        
        double totalRevenue = orders.stream()
                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                .sum();

        long pendingOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .count();

        long designingOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.DESIGNING)
                .count();

        long deliveredOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", totalOrders);
        stats.put("totalUsers", totalUsers);
        stats.put("totalRevenue", totalRevenue);
        stats.put("pendingOrders", pendingOrders);
        stats.put("designingOrders", designingOrders);
        stats.put("deliveredOrders", deliveredOrders);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        List<Order> allOrders = orderRepository.findAll();

        // --- Current month metrics ---
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime monthStart = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime monthEnd = currentMonth.atEndOfMonth().atTime(23, 59, 59);

        List<Order> monthlyOrders = allOrders.stream()
                .filter(o -> o.getCreatedAt() != null
                        && !o.getCreatedAt().isBefore(monthStart)
                        && !o.getCreatedAt().isAfter(monthEnd))
                .collect(Collectors.toList());

        double monthlyRevenue = monthlyOrders.stream()
                .mapToDouble(o -> o.getTotalAmount() != null ? o.getTotalAmount() : 0.0)
                .sum();

        int monthlyOrderCount = monthlyOrders.size();

        double avgOrderValue = allOrders.isEmpty() ? 0.0 :
                allOrders.stream()
                        .mapToDouble(o -> o.getTotalAmount() != null ? o.getTotalAmount() : 0.0)
                        .average()
                        .orElse(0.0);

        long totalOrders = allOrders.size();

        Map<String, Object> keyMetrics = new LinkedHashMap<>();
        keyMetrics.put("monthlyRevenue", monthlyRevenue);
        keyMetrics.put("monthlyOrders", monthlyOrderCount);
        keyMetrics.put("avgOrderValue", Math.round(avgOrderValue * 100.0) / 100.0);
        keyMetrics.put("totalOrders", totalOrders);

        // --- Revenue trend (last 6 months) ---
        DateTimeFormatter monthFmt = DateTimeFormatter.ofPattern("MMM");
        List<Map<String, Object>> revenueTrend = new java.util.ArrayList<>();
        for (int i = 5; i >= 0; i--) {
            YearMonth ym = currentMonth.minusMonths(i);
            LocalDateTime start = ym.atDay(1).atStartOfDay();
            LocalDateTime end = ym.atEndOfMonth().atTime(23, 59, 59);

            double revenue = allOrders.stream()
                    .filter(o -> o.getCreatedAt() != null
                            && !o.getCreatedAt().isBefore(start)
                            && !o.getCreatedAt().isAfter(end))
                    .mapToDouble(o -> o.getTotalAmount() != null ? o.getTotalAmount() : 0.0)
                    .sum();

            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("month", ym.format(monthFmt));
            entry.put("revenue", revenue);
            revenueTrend.add(entry);
        }

        // --- Sales by product ---
        Map<String, Long> productCounts = allOrders.stream()
                .filter(o -> o.getProductName() != null)
                .collect(Collectors.groupingBy(Order::getProductName, Collectors.counting()));

        List<Map<String, Object>> salesByProduct = productCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("product", e.getKey());
                    m.put("orders", e.getValue());
                    return m;
                })
                .collect(Collectors.toList());

        // --- Popular occasions ---
        Map<String, Long> occasionCounts = allOrders.stream()
                .filter(o -> o.getOccasion() != null && !o.getOccasion().isBlank())
                .collect(Collectors.groupingBy(Order::getOccasion, Collectors.counting()));

        List<Map<String, Object>> popularOccasions = occasionCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("occasion", e.getKey());
                    m.put("count", e.getValue());
                    return m;
                })
                .collect(Collectors.toList());

        // --- Assemble response ---
        Map<String, Object> analytics = new LinkedHashMap<>();
        analytics.put("keyMetrics", keyMetrics);
        analytics.put("revenueTrend", revenueTrend);
        analytics.put("salesByProduct", salesByProduct);
        analytics.put("popularOccasions", popularOccasions);

        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllAdminProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createAdminProduct(@RequestBody Product product) {
        Product saved = productRepository.save(product);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateAdminProduct(
            @PathVariable Long productId,
            @RequestBody Product updatedProduct) {
        
        return productRepository.findById(productId)
                .map(existing -> {
                    existing.setName(updatedProduct.getName());
                    existing.setSlug(updatedProduct.getSlug());
                    existing.setDescription(updatedProduct.getDescription());
                    existing.setPrice(updatedProduct.getPrice());
                    existing.setOriginalPrice(updatedProduct.getOriginalPrice());
                    existing.setImageUrl(updatedProduct.getImageUrl());
                    Product saved = productRepository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteAdminProduct(@PathVariable Long productId) {
        return productRepository.findById(productId)
                .map(product -> {
                    productRepository.delete(product);
                    return ResponseEntity.ok(Map.of("success", true));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    if ("admin@storyceller.in".equals(user.getEmail()) || "ADMIN".equals(user.getRole())) {
                        return ResponseEntity.badRequest().body(Map.of("error", "Cannot remove an administrator"));
                    }
                    userRepository.delete(user);
                    return ResponseEntity.ok(Map.of("success", true));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
