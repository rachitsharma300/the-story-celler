package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.enums.OrderStatus;
import com.thestoryceller.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderByOrderId(@PathVariable String orderId) {
        return orderService.getOrderByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order created = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody Map<String, String> body) {
        
        String statusStr = body.get("status");
        if (statusStr == null) {
            return ResponseEntity.badRequest().build();
        }
        
        try {
            OrderStatus status = OrderStatus.valueOf(statusStr.toUpperCase());
            return orderService.updateOrderStatus(orderId, status)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{orderId}/pdf")
    public ResponseEntity<Order> updateFinalPdfUrl(
            @PathVariable String orderId,
            @RequestBody Map<String, String> body) {
        
        String pdfUrl = body.get("pdfUrl");
        if (pdfUrl == null) {
            return ResponseEntity.badRequest().build();
        }
        
        return orderService.updateFinalPdfUrl(orderId, pdfUrl)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
