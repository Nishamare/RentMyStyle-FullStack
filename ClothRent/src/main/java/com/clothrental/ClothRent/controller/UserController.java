// package com.clothrental.ClothRent.controller;

// import com.clothrental.ClothRent.entity.User;
// import com.clothrental.ClothRent.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;

// @RestController
// @RequestMapping("/users")
// public class UserController {

//     @Autowired
//     private UserService userService;

//     @PostMapping("/register")
//     public User registerUser(@RequestBody User user) {
//         return userService.registerUser(user);
//     }

//     @PostMapping("/login")
//     public User loginUser(@RequestBody User user) {
//         return userService.loginUser(user.getEmail(), user.getPassword());
//     }

//     @GetMapping("/all")
//     public List<User> getAllUsers() {
//         return userService.getAllUsers();
//     }

//     @GetMapping("/{id}")
//     public User getUserById(@PathVariable Long id) {
//         return userService.getUserById(id);
//     }
// }


package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.User;
import com.clothrental.ClothRent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class UserController {

    @Autowired
    private UserService userService;

    // ------------------- REGISTER USER -------------------
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("error", ex.getMessage()));
        }
    }

    // ------------------- LOGIN USER -------------------
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("error", ex.getMessage()));
        }
    }

    // ------------------- GET ALL USERS -------------------
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // ------------------- GET USER BY ID -------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("error", ex.getMessage()));
        }
    }
}
