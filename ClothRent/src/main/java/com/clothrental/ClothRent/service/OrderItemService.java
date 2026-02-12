package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.OrderItem;
import com.clothrental.ClothRent.entity.Order;
import com.clothrental.ClothRent.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public OrderItem addOrderItem(OrderItem item) {
        return orderItemRepository.save(item);
    }

    public List<OrderItem> getItemsByOrder(Order order) {
        return orderItemRepository.findByOrder(order);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }
}
