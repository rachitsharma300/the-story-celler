package com.thestoryceller.backend.service;

import com.thestoryceller.backend.entity.Product;
import com.thestoryceller.backend.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductBySlug(String slug) {
        return productRepository.findBySlug(slug);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @PostConstruct
    public void seedProducts() {
        if (productRepository.count() == 0) {
            List<Product> defaultProducts = List.of(
                Product.builder()
                    .slug("custom-magazine")
                    .name("Custom Magazine")
                    .description("A beautiful custom designed editorial style magazine of your memories.")
                    .price(1200.0)
                    .originalPrice(1500.0)
                    .imageUrl("/images/products/custom-magazine.jpg")
                    .build(),
                Product.builder()
                    .slug("photo-album")
                    .name("Photo Album")
                    .description("Premium custom photo book to cherish forever.")
                    .price(1500.0)
                    .originalPrice(2000.0)
                    .imageUrl("/images/products/photo-album.jpg")
                    .build(),
                Product.builder()
                    .slug("recap-reel")
                    .name("Recap Reels")
                    .description("Dynamic scanning QR recap video reels.")
                    .price(550.0)
                    .originalPrice(750.0)
                    .imageUrl("/images/products/recap-reels.jpg")
                    .build(),
                Product.builder()
                    .slug("custom-frame")
                    .name("Custom Frame")
                    .description("Custom framed prints for your wall.")
                    .price(650.0)
                    .originalPrice(850.0)
                    .imageUrl("/images/products/custom-frame.jpg")
                    .build(),
                Product.builder()
                    .slug("birthday-magazine")
                    .name("Birthday Magazine - Quick")
                    .description("Instantly created birthday memory book.")
                    .price(699.0)
                    .originalPrice(999.0)
                    .imageUrl("/images/products/birthday-magazine.jpg")
                    .build(),
                Product.builder()
                    .slug("anniversary-album")
                    .name("Anniversary Magazine - Quick")
                    .description("Instantly created anniversary celebration magazine.")
                    .price(699.0)
                    .originalPrice(999.0)
                    .imageUrl("/images/products/anniversary-magazine.jpg")
                    .build()
            );
            productRepository.saveAll(defaultProducts);
        }
    }
}
