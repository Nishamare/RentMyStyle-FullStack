package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.Payment;
import com.clothrental.ClothRent.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // This method is required for PaymentController
    List<Payment> findByOrder(Order order);
}
