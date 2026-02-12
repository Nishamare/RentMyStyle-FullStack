package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.Cart;
import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.service.CartService;
import com.clothrental.ClothRent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    // ------------------- ADD TO CART -------------------
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    // ------------------- GET CART BY USER -------------------
    @GetMapping("/user/{userId}")
    public List<Cart> getCartByUser(@PathVariable Long userId) {
        // Get the user object
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        // Get cart items for that user
        return cartService.getCartByUser(user);
    }

    // ------------------- REMOVE ITEM FROM CART -------------------
    @DeleteMapping("/{cartId}")
    public String removeCartItem(@PathVariable Long cartId) {
        cartService.removeCartItem(cartId);
        return "Cart item removed successfully!";
    }
}
