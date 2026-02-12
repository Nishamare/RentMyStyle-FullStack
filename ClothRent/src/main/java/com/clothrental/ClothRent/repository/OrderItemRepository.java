package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.OrderItem;
import com.clothrental.ClothRent.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);

    List<OrderItem> findByProduct_Owner_UserId(Long userId);
}
