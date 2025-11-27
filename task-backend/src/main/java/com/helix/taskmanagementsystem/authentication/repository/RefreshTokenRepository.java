package com.helix.taskmanagementsystem.authentication.repository;

import com.helix.taskmanagementsystem.authentication.entity.RefreshToken;
import com.helix.taskmanagementsystem.authentication.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken,Long> {

    Optional<RefreshToken> findByToken(String token);
    Optional<User> findByUser (User user);
    @Transactional
    void deleteAllByUser(User user);
}
