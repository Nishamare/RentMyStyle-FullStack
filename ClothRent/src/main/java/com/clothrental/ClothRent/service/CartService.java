package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.Cart;
import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add item to cart
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Get cart items by user
    public List<Cart> getCartByUser(User user) {
        return cartRepository.findByUser(user);  // make sure repository has this method
    }

    // Remove cart item by ID
    public void removeCartItem(Long cartId) {
        cartRepository.deleteById(cartId);
    }
}
