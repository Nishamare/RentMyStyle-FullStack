package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.Order;
import com.clothrental.ClothRent.entity.OrderItem;
import com.clothrental.ClothRent.entity.Product;
import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.repository.OrderItemRepository;
import com.clothrental.ClothRent.repository.OrderRepository;
import com.clothrental.ClothRent.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    // ------------------- PLACE ORDER -------------------
    public Order placeOrder(Order order, User user) {
        order.setUser(user);
        Order savedOrder = orderRepository.save(order);

        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                Product product = productRepository.findById(item.getProduct().getProductId())
                        .orElseThrow(
                                () -> new RuntimeException("Product not found: " + item.getProduct().getProductId()));
                item.setProduct(product);
                item.setOrder(savedOrder);
                orderItemRepository.save(item);
            }
        }
        return savedOrder;
    }

    // ------------------- GET ORDERS BY USER -------------------
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    // ------------------- GET ORDER BY ID -------------------
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    // ------------------- GET ORDERS FOR OWNER -------------------
    public List<OrderItem> getOrdersForOwner(Long ownerId) {
        return orderItemRepository.findByProduct_Owner_UserId(ownerId);
    }
}
