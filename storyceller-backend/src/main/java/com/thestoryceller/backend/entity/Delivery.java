package com.thestoryceller.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "deliveries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery extends BaseEntity {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_db_id", nullable = false)
    private Order order;

    @Column(name = "tracking_number", nullable = false, unique = true)
    private String trackingNumber;

    @Column(name = "carrier", nullable = false)
    private String carrier;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "estimated_delivery")
    private LocalDate estimatedDelivery;
}
