// package com.clothrental.ClothRent.controller;

// import com.clothrental.ClothRent.entity.Order;
// import com.clothrental.ClothRent.entity.OrderItem;
// import com.clothrental.ClothRent.entity.User;
// import com.clothrental.ClothRent.repository.OrderItemRepository;
// import com.clothrental.ClothRent.repository.OrderRepository;
// import com.clothrental.ClothRent.repository.UserRepository;
// import com.clothrental.ClothRent.repository.ProductRepository;
// import com.clothrental.ClothRent.entity.Product;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/orders")
// public class OrderController {

//     @Autowired
//     private OrderRepository orderRepository;

//     @Autowired
//     private OrderItemRepository orderItemRepository;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private ProductRepository productRepository;

//     // ------------------- PLACE ORDER -------------------
//     @PostMapping("/place")
//     public Order placeOrder(@RequestBody Order order) {
//         // Validate user
//         Optional<User> userOpt = userRepository.findById(order.getUser().getUserId());
//         if (userOpt.isEmpty()) {
//             throw new RuntimeException("User not found!");
//         }
//         order.setUser(userOpt.get());
//         Order savedOrder = orderRepository.save(order);

//         // Save order items
//         if(order.getOrderItems() != null) {
//             for(OrderItem item : order.getOrderItems()) {
//                 Optional<Product> productOpt = productRepository.findById(item.getProduct().getProductId());
//                 if(productOpt.isEmpty()) {
//                     throw new RuntimeException("Product not found: " + item.getProduct().getProductId());
//                 }
//                 item.setProduct(productOpt.get());
//                 item.setOrder(savedOrder);
//                 orderItemRepository.save(item);
//             }
//         }

//         return savedOrder;
//     }

//     // ------------------- GET USER ORDERS -------------------
//     @GetMapping("/user/{userId}")
//     public List<Order> getUserOrders(@PathVariable Long userId) {
//         Optional<User> userOpt = userRepository.findById(userId);
//         if(userOpt.isEmpty()) {
//             throw new RuntimeException("User not found!");
//         }
//         return orderRepository.findByUser(userOpt.get());
//     }

//     // ------------------- GET ORDER BY ID -------------------
//     @GetMapping("/{orderId}")
//     public Order getOrderById(@PathVariable Long orderId) {
//         Optional<Order> orderOpt = orderRepository.findById(orderId);
//         return orderOpt.orElse(null);
//     }
// }

package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.Order;
import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.service.OrderService;
import com.clothrental.ClothRent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {
        User user = userService.getUserById(order.getUser().getUserId());
        return orderService.placeOrder(order, user);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return orderService.getOrdersByUser(user);
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/owner/{ownerId}")
    public List<com.clothrental.ClothRent.entity.OrderItem> getOrdersForOwner(@PathVariable Long ownerId) {
        return orderService.getOrdersForOwner(ownerId);
    }
}
