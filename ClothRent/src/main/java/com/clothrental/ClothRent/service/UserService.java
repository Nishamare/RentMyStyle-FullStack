package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ------------------- REGISTER USER -------------------
    public User registerUser(User user) {
        // Optional: Check if email already exists
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        return userRepository.save(user);
    }

    // ------------------- LOGIN USER -------------------
    public User loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password!");
        }
        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password!");
        }
        return user;
    }

    // ------------------- GET ALL USERS -------------------
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ------------------- GET USER BY ID -------------------
    public User getUserById(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with id: " + id);
        }
        return userOpt.get();
    }
}
