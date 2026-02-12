package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.Cart;
import com.clothrental.ClothRent.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
}
