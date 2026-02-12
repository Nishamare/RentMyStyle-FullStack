package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.Order;
import com.clothrental.ClothRent.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
