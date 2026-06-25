package com.thestoryceller.backend.repository;

import com.thestoryceller.backend.entity.Wishlist;
import com.thestoryceller.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUser(User user);
    Optional<Wishlist> findByUserAndProductId(User user, Long productId);
}
