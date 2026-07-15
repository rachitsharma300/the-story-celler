package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Delivery;
import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.entity.enums.OrderStatus;
import com.thestoryceller.backend.repository.DeliveryRepository;
import com.thestoryceller.backend.repository.UserRepository;
import com.thestoryceller.backend.repository.OrderRepository;
import com.thestoryceller.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;
    private final DeliveryRepository deliveryRepository;
    private final OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<?> getAllOrders(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        return userRepository.findByEmail(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(orderService.getOrdersByUser(user)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderByOrderId(@PathVariable String orderId) {
        return orderService.getOrderByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Order order) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        return userRepository.findByEmail(userDetails.getUsername())
                .map(user -> {
                    Order created = orderService.createOrder(order, user);
                    return ResponseEntity.status(HttpStatus.CREATED).body(created);
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
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

    @GetMapping("/track/{orderId}")
    public ResponseEntity<?> trackOrder(@PathVariable String orderId) {
        Optional<Order> optOrder = orderService.getOrderByOrderId(orderId);
        if (optOrder.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Order order = optOrder.get();
        OrderStatus status = order.getStatus();

        // Build response map
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("orderId", order.getOrderId());
        result.put("productName", order.getProductName());
        result.put("status", status.name());
        result.put("totalAmount", order.getTotalAmount());
        result.put("advanceAmount", order.getAdvanceAmount());
        result.put("pages", order.getPages());
        result.put("printingType", order.getPrintingType());
        result.put("createdAt", order.getCreatedAt());

        // Customer name from personalDetails
        String customerName = "Customer";
        if (order.getPersonalDetails() != null && order.getPersonalDetails().getName() != null) {
            customerName = order.getPersonalDetails().getName();
        }
        result.put("customerName", customerName);

        // Delivery info if exists
        Optional<Delivery> optDelivery = deliveryRepository.findByOrder(order);
        if (optDelivery.isPresent()) {
            Delivery delivery = optDelivery.get();
            Map<String, Object> deliveryInfo = new LinkedHashMap<>();
            deliveryInfo.put("trackingNumber", delivery.getTrackingNumber());
            deliveryInfo.put("carrier", delivery.getCarrier());
            deliveryInfo.put("deliveryStatus", delivery.getStatus());
            deliveryInfo.put("estimatedDelivery", delivery.getEstimatedDelivery());
            result.put("delivery", deliveryInfo);
        }

        // Compute timeline based on order status
        OrderStatus[] allStatuses = { OrderStatus.PENDING, OrderStatus.DESIGNING, OrderStatus.REVIEW, OrderStatus.PRINTING, OrderStatus.SHIPPED, OrderStatus.DELIVERED };
        int currentIndex = Arrays.asList(allStatuses).indexOf(status);

        List<Map<String, Object>> timeline = new ArrayList<>();
        for (int i = 0; i < allStatuses.length; i++) {
            Map<String, Object> step = new LinkedHashMap<>();
            step.put("status", allStatuses[i].name());
            step.put("done", i <= currentIndex);
            timeline.add(step);
        }
        result.put("timeline", timeline);

        return ResponseEntity.ok(result);
    }
}
