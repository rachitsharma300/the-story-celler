package com.thestoryceller.backend.service;

import com.thestoryceller.backend.entity.Order;
import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.entity.enums.OrderStatus;
import com.thestoryceller.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

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
                return orderRepository.save(order);
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
