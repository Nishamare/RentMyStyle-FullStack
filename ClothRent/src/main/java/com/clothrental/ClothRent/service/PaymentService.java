package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.Order;
import com.clothrental.ClothRent.entity.Payment;
import com.clothrental.ClothRent.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Make payment
    public Payment makePayment(Payment payment, Order order) {
        payment.setOrder(order);
        payment.setStatus("COMPLETED"); // mark payment completed
        return paymentRepository.save(payment);
    }

    // Get payments by order
    public List<Payment> getPaymentsByOrder(Order order) {
        return paymentRepository.findByOrder(order);
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
