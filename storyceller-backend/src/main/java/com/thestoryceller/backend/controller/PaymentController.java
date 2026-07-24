package com.thestoryceller.backend.controller;

import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.Payment;
import com.thestoryceller.backend.repository.OrderRepository;
import com.thestoryceller.backend.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.thestoryceller.backend.service.EmailService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final EmailService emailService;

    @Value("${razorpay.key.id:rzp_test_sample}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret:sample_secret}")
    private String razorpayKeySecret;

    /**
     * Create Razorpay Order ID for initiating online payment.
     */
    @PostMapping("/create-order")
    public ResponseEntity<?> createRazorpayOrder(@RequestBody Map<String, Object> body) {
        try {
            Double amountInRupees = ((Number) body.get("amount")).doubleValue();
            String receipt = (String) body.getOrDefault("receipt", "receipt_" + System.currentTimeMillis());

            // Amount in paise (1 INR = 100 paise)
            long amountInPaise = Math.round(amountInRupees * 100);

            if (razorpayKeyId.startsWith("rzp_test_sample") || razorpayKeySecret.equals("sample_secret")) {
                // Fallback mock order response if test key is not yet replaced in env
                log.warn("Using Razorpay fallback mode. Please configure real RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET.");
                Map<String, Object> mockResponse = new HashMap<>();
                mockResponse.put("id", "order_mock_" + System.currentTimeMillis());
                mockResponse.put("amount", amountInPaise);
                mockResponse.put("currency", "INR");
                mockResponse.put("keyId", razorpayKeyId);
                return ResponseEntity.ok(mockResponse);
            }

            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", receipt);

            com.razorpay.Order order = razorpay.orders.create(orderRequest);

            Map<String, Object> response = new HashMap<>();
            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("keyId", razorpayKeyId);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to create Razorpay Order: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Razorpay order creation failed: " + e.getMessage()));
        }
    }

    /**
     * Verify Razorpay Payment Signature after payment completion.
     */
    @PostMapping("/verify-signature")
    public ResponseEntity<?> verifySignature(@RequestBody Map<String, String> body) {
        try {
            String razorpayOrderId = body.get("razorpay_order_id");
            String razorpayPaymentId = body.get("razorpay_payment_id");
            String razorpaySignature = body.get("razorpay_signature");

            if (razorpayOrderId == null || razorpayPaymentId == null || razorpaySignature == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Missing required signature fields"));
            }

            if (razorpayKeySecret.equals("sample_secret")) {
                // Mock verification fallback
                return ResponseEntity.ok(Map.of("verified", true, "message", "Signature verified (Mock mode)"));
            }

            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);

            boolean isSignatureValid = Utils.verifyPaymentSignature(options, razorpayKeySecret);

            if (isSignatureValid) {
                return ResponseEntity.ok(Map.of("verified", true, "message", "Payment signature verified successfully"));
            } else {
                return ResponseEntity.status(400).body(Map.of("verified", false, "error", "Invalid payment signature"));
            }
        } catch (Exception e) {
            log.error("Error verifying Razorpay signature: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Signature verification error: " + e.getMessage()));
        }
    }

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

        Optional<Order> optOrder = orderRepository.findByOrderId(orderId);
        if (optOrder.isEmpty()) {
            log.warn("Payment received for orderId {} but order record does not exist in DB yet.", orderId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Payment recorded, pending order link.", "orderId", orderId));
        }

        Order order = optOrder.get();

        Payment payment = Payment.builder()
                .order(order)
                .transactionId(transactionId)
                .amount(amount)
                .status(status.toUpperCase())
                .paymentMethod(method)
                .build();

        Payment saved = paymentRepository.save(payment);

        if ("COMPLETED".equalsIgnoreCase(status)) {
            try {
                String toEmail = order.getEmail();
                if (toEmail == null && order.getUser() != null) {
                    toEmail = order.getUser().getEmail();
                }
                if (toEmail != null && !toEmail.isBlank()) {
                    String customerName = order.getPersonalDetails() != null ? order.getPersonalDetails().getName() : "Customer";
                    emailService.sendOrderConfirmationEmail(toEmail, orderId, amount, customerName);
                }
            } catch (Exception e) {
                log.error("Failed to send order confirmation email for order {}: {}", orderId, e.getMessage(), e);
            }
        }

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
