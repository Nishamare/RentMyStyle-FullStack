// package com.clothrental.ClothRent.controller;

// import com.clothrental.ClothRent.entity.Payment;
// import com.clothrental.ClothRent.entity.Order;
// import com.clothrental.ClothRent.repository.PaymentRepository;
// import com.clothrental.ClothRent.repository.OrderRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.Optional;
// import java.util.List;

// @RestController
// @RequestMapping("/payments")
// public class PaymentController {

//     @Autowired
//     private PaymentRepository paymentRepository;

//     @Autowired
//     private OrderRepository orderRepository;

//     // ------------------- MAKE PAYMENT -------------------
//     @PostMapping("/pay")
//     public Payment makePayment(@RequestBody Payment payment) {
//         // Validate order
//         Optional<Order> orderOpt = orderRepository.findById(payment.getOrder().getOrderId());
//         if(orderOpt.isEmpty()) {
//             throw new RuntimeException("Order not found!");
//         }

//         // Link order and mark payment as COMPLETED
//         payment.setOrder(orderOpt.get());
//         payment.setStatus("COMPLETED");

//         return paymentRepository.save(payment);
//     }

//     // ------------------- GET PAYMENT BY ORDER -------------------
//     @GetMapping("/order/{orderId}")
//     public List<Payment> getPaymentsByOrder(@PathVariable Long orderId) {
//         Optional<Order> orderOpt = orderRepository.findById(orderId);
//         if(orderOpt.isEmpty()) {
//             throw new RuntimeException("Order not found!");
//         }

//         // Use instance of repository, not class name
//         return paymentRepository.findByOrder(orderOpt.get());
//     }

//     // ------------------- GET ALL PAYMENTS -------------------
//     @GetMapping("/all")
//     public List<Payment> getAllPayments() {
//         return paymentRepository.findAll();
//     }
// }



package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.Order;
import com.clothrental.ClothRent.entity.Payment;
import com.clothrental.ClothRent.service.OrderService;
import com.clothrental.ClothRent.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    // ------------------- MAKE PAYMENT -------------------
    @PostMapping("/pay")
    public Payment makePayment(@RequestBody Payment payment) {
        if(payment.getOrder() == null || payment.getOrder().getOrderId() == null) {
            throw new RuntimeException("Order ID is required to make a payment!");
        }

        // Get full order
        Order order = orderService.getOrderById(payment.getOrder().getOrderId());
        if(order == null) {
            throw new RuntimeException("Order not found!");
        }

        // Delegate to PaymentService
        return paymentService.makePayment(payment, order);
    }

    // ------------------- GET PAYMENT BY ORDER -------------------
    @GetMapping("/order/{orderId}")
    public List<Payment> getPaymentsByOrder(@PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        if(order == null) {
            throw new RuntimeException("Order not found!");
        }
        return paymentService.getPaymentsByOrder(order);
    }

    // ------------------- GET ALL PAYMENTS -------------------
    @GetMapping("/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }
}
