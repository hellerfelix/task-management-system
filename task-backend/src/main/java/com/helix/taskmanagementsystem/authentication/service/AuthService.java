package com.helix.taskmanagementsystem.authentication.service;

import com.helix.taskmanagementsystem.authentication.dto.AuthRequest;
import com.helix.taskmanagementsystem.authentication.dto.AuthResponse;
import com.helix.taskmanagementsystem.authentication.dto.SignupRequest;
import com.helix.taskmanagementsystem.authentication.dto.TokenRefreshRequest;
import com.helix.taskmanagementsystem.authentication.entity.RefreshToken;
import com.helix.taskmanagementsystem.authentication.entity.User;
import com.helix.taskmanagementsystem.authentication.repository.RefreshTokenRepository;
import com.helix.taskmanagementsystem.authentication.repository.UserRepository;
import com.helix.taskmanagementsystem.authentication.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // 1️⃣ SIGNUP
    public String register(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // hash password
        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully!";
    }

    // 2️⃣ LOGIN + Generate Access & Refresh Token
    public AuthResponse login(AuthRequest request) {

        // Validate username & password using Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // User exists → retrieve user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate ACCESS token
        String accessToken = jwtUtil.generateAccessToken(user.getEmail());

        // Generate & save REFRESH token
        RefreshToken refreshToken = createRefreshToken(user);

        return new AuthResponse(
                accessToken,
                refreshToken.getToken(),
                3600000L  // access token expiry (1 hour)
        );
    }

    // 3️⃣ CREATE REFRESH TOKEN
    @Transactional
    private RefreshToken createRefreshToken(User user) {
        // delete old token if exists (one token per user)
        refreshTokenRepository.deleteAllByUser(user);

        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Instant.now().plusMillis(86400000)); // 24 hours

        return refreshTokenRepository.save(token);
    }

    // 4️⃣ REFRESH ACCESS TOKEN using Refresh Token
    public AuthResponse refreshToken(TokenRefreshRequest request) {

        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Refresh token expired. Please login again.");
        }

        User user = refreshToken.getUser();

        // Create new access token
        String newAccessToken = jwtUtil.generateAccessToken(user.getEmail());

        return new AuthResponse(
                newAccessToken,
                refreshToken.getToken(),
                3600000L
        );
    }

    // 5️⃣ LOGOUT (delete refresh token from DB)
    public String logout(TokenRefreshRequest request) {

        RefreshToken token = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElse(null);

        if (token != null) {
            refreshTokenRepository.delete(token);
        }

        return "Logged out successfully!";
    }
}