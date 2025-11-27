package com.helix.taskmanagementsystem.authentication.controller;

import com.helix.taskmanagementsystem.authentication.dto.AuthRequest;
import com.helix.taskmanagementsystem.authentication.dto.AuthResponse;
import com.helix.taskmanagementsystem.authentication.dto.SignupRequest;
import com.helix.taskmanagementsystem.authentication.dto.TokenRefreshRequest;
import com.helix.taskmanagementsystem.authentication.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend access
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody SignupRequest request) {
        String message = authService.register(request);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    // 2️⃣ LOGIN API
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // 3️⃣ REFRESH TOKEN API
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody TokenRefreshRequest request) {
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    // 4️⃣ LOGOUT API
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody TokenRefreshRequest request) {
        String msg = authService.logout(request);
        return ResponseEntity.ok(msg);
    }
}