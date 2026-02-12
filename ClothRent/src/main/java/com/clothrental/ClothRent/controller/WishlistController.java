package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.entity.Wishlist;
import com.clothrental.ClothRent.repository.UserRepository;
import com.clothrental.ClothRent.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    // ------------------- GET WISHLIST BY USER -------------------
    @GetMapping("/user/{userId}")
    public List<Wishlist> getWishlistByUser(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        return wishlistRepository.findByUser(userOpt.get());
    }

    // ------------------- ADD TO WISHLIST -------------------
    @PostMapping("/add")
    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {

        if (wishlist.getUser() == null || wishlist.getUser().getUserId() == null) {
            throw new RuntimeException("User ID is required");
        }

        User user = userRepository.findById(wishlist.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        wishlist.setUser(user); // attach the managed entity
        return wishlistRepository.save(wishlist);
    }

    // ------------------- DELETE WISHLIST ITEM -------------------
    @DeleteMapping("/{id}")
    public void removeWishlistItem(@PathVariable Long id) {
        wishlistRepository.deleteById(id);
    }
}
