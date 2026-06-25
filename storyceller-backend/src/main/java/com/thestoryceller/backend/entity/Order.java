package com.thestoryceller.backend.entity;

import com.thestoryceller.backend.entity.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order extends BaseEntity {

    @Column(name = "order_id", unique = true, nullable = false)
    private String orderId;

    @Column(name = "product_slug", nullable = false)
    private String productSlug;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "quantity", nullable = false)
    @Builder.Default
    private Integer quantity = 1;

    @Column(name = "occasion", nullable = false)
    private String occasion;

    @Column(name = "pages", nullable = false)
    private Integer pages;

    @Column(name = "printing_type", nullable = false)
    private String printingType;

    @Embedded
    private PersonalDetails personalDetails;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_photos", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "photo_url")
    @Builder.Default
    private List<String> uploadedPhotos = new ArrayList<>();

    @Column(name = "front_cover_photo")
    private String frontCoverPhoto;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "advance_amount", nullable = false)
    private Double advanceAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "final_pdf_url")
    private String finalPdfUrl;
}
