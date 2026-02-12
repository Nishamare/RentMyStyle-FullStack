package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.Wishlist;
import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public Wishlist addToWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public List<Wishlist> getWishlistByUser(User user) {
        return wishlistRepository.findByUser(user);
    }

    public void removeFromWishlist(Long wishlistId) {
        wishlistRepository.deleteById(wishlistId);
    }

    public List<Wishlist> getAllWishlistItems() {
        return wishlistRepository.findAll();
    }
}
