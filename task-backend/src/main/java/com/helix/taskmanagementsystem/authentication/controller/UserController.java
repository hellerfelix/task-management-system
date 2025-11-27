package com.helix.taskmanagementsystem.authentication.controller;

import com.helix.taskmanagementsystem.authentication.entity.User;
import com.helix.taskmanagementsystem.authentication.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 👇 GET logged-in user details
    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {

        String email = authentication.getName(); // JWT subject

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
