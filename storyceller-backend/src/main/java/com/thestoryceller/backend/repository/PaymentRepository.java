package com.thestoryceller.backend.repository;

import com.thestoryceller.backend.entity.Payment;
import com.thestoryceller.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrder(Order order);
    Optional<Payment> findByTransactionId(String transactionId);
}
