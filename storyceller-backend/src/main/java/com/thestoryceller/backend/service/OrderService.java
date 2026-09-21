package com.thestoryceller.backend.service;

import com.thestoryceller.backend.entity.Notification;
import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.entity.enums.OrderStatus;
import com.thestoryceller.backend.repository.NotificationRepository;
import com.thestoryceller.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    public Optional<Order> getOrderByOrderId(String orderId) {
        return orderRepository.findByOrderId(orderId);
    }

    public Order createOrder(Order order, User user) {
        int currentYear = LocalDate.now().getYear();
        long count = orderRepository.count();
        String sequentialNum = String.format("%04d", count + 1);
        String orderId = "MV-" + currentYear + "-" + sequentialNum;
        
        order.setOrderId(orderId);
        order.setUser(user);
        if (order.getQuantity() == null) {
            order.setQuantity(1);
        }
        if (order.getStatus() == null) {
            order.setStatus(OrderStatus.PENDING);
        }
        return orderRepository.save(order);
    }

    public Optional<Order> updateOrderStatus(String orderId, OrderStatus status) {
        return orderRepository.findByOrderId(orderId)
            .map(order -> {
                order.setStatus(status);
                Order saved = orderRepository.save(order);

                // 1. Create in-app user notification if user exists
                if (order.getUser() != null) {
                    try {
                        Notification notification = Notification.builder()
                                .user(order.getUser())
                                .title("Order #" + orderId + " Updated")
                                .message("Your order status has been updated to: " + status.name())
                                .isRead(false)
                                .build();
                        notificationRepository.save(notification);
                    } catch (Exception e) {
                        log.error("Failed to save order notification: {}", e.getMessage());
                    }
                }

                // 2. Trigger email update
                try {
                    String recipientEmail = order.getEmail();
                    if (recipientEmail == null && order.getUser() != null) {
                        recipientEmail = order.getUser().getEmail();
                    }
                    if (recipientEmail != null && !recipientEmail.isBlank()) {
                        String recipientName = order.getPersonalDetails() != null ? order.getPersonalDetails().getName() : "Customer";
                        emailService.sendOrderStatusUpdateEmail(recipientEmail, orderId, status.name(), recipientName);
                    }
                } catch (Exception e) {
                    log.error("Failed to send order status email: {}", e.getMessage());
                }

                return saved;
            });
    }

    public Optional<Order> updateFinalPdfUrl(String orderId, String finalPdfUrl) {
        return orderRepository.findByOrderId(orderId)
            .map(order -> {
                order.setFinalPdfUrl(finalPdfUrl);
                return orderRepository.save(order);
            });
    }
}
