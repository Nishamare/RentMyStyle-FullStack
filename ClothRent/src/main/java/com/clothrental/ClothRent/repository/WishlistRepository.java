package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.Wishlist;
import com.clothrental.ClothRent.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    // This is required to query wishlist by user
    List<Wishlist> findByUser(User user);
}
