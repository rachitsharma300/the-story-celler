package com.thestoryceller.backend.repository;

import com.thestoryceller.backend.entity.Delivery;
import com.thestoryceller.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByOrder(Order order);
    Optional<Delivery> findByTrackingNumber(String trackingNumber);
}
