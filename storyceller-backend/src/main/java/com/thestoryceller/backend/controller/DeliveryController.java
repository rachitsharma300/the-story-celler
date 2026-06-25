package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Delivery;
import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.enums.OrderStatus;
import com.thestoryceller.backend.repository.DeliveryRepository;
import com.thestoryceller.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeliveryController {

    private final DeliveryRepository deliveryRepository;
    private final OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<?> createDeliveryRecord(@RequestBody Map<String, Object> body) {
        String orderId = (String) body.get("orderId");
        String trackingNumber = (String) body.get("trackingNumber");
        String carrier = (String) body.get("carrier");
        String status = (String) body.get("status");
        String estimatedDateStr = (String) body.get("estimatedDelivery");

        if (orderId == null || trackingNumber == null || carrier == null || status == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required delivery fields"));
        }

        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));

        // Update Order Status to SHIPPED
        order.setStatus(OrderStatus.SHIPPED);
        orderRepository.save(order);

        LocalDate estimatedDelivery = estimatedDateStr != null ? LocalDate.parse(estimatedDateStr) : null;

        Delivery delivery = Delivery.builder()
                .order(order)
                .trackingNumber(trackingNumber)
                .carrier(carrier)
                .status(status.toUpperCase())
                .estimatedDelivery(estimatedDelivery)
                .build();

        Delivery saved = deliveryRepository.save(delivery);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{trackingNumber}")
    public ResponseEntity<Delivery> getDeliveryByTrackingNumber(@PathVariable String trackingNumber) {
        return deliveryRepository.findByTrackingNumber(trackingNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Delivery> getDeliveryByOrderId(@PathVariable String orderId) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));

        return deliveryRepository.findByOrder(order)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
