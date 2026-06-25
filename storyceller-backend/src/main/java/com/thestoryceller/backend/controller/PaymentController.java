package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.Payment;
import com.thestoryceller.backend.repository.OrderRepository;
import com.thestoryceller.backend.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<?> logPayment(@RequestBody Map<String, Object> body) {
        String orderId = (String) body.get("orderId");
        String transactionId = (String) body.get("transactionId");
        Double amount = ((Number) body.get("amount")).doubleValue();
        String status = (String) body.get("status");
        String method = (String) body.get("paymentMethod");

        if (orderId == null || transactionId == null || amount == null || status == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required payment fields"));
        }

        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));

        Payment payment = Payment.builder()
                .order(order)
                .transactionId(transactionId)
                .amount(amount)
                .status(status.toUpperCase())
                .paymentMethod(method)
                .build();

        Payment saved = paymentRepository.save(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Payment> getPaymentByOrderId(@PathVariable String orderId) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));

        return paymentRepository.findByOrder(order)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
