package com.thestoryceller.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "samples")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sample extends BaseEntity {

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "pdf_url", nullable = false)
    private String pdfUrl;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @Column(name = "category")
    private String category;
}
