package com.helix.taskmanagementsystem.authentication.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long accessTokenValidityMs;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-expiration-ms}") long accessTokenValidityMs
    ) {
        // DEBUG PRINTS — ADD THESE TWO LINES
        System.out.println("Loaded JWT Secret: " + secret);
        try {
            byte[] decoded = io.jsonwebtoken.io.Decoders.BASE64.decode(secret);
            System.out.println("Decoded key bytes: " + decoded.length * 8 + " bits");
        } catch (Exception e) {
            System.out.println("Failed to decode secret!!! ERROR: " + e.getMessage());
        }

        // REAL KEY PROCESSING
        byte[] keyBytes = io.jsonwebtoken.io.Decoders.BASE64.decode(secret);
        this.key = io.jsonwebtoken.security.Keys.hmacShaKeyFor(keyBytes);

        this.accessTokenValidityMs = accessTokenValidityMs;
    }

    public String generateAccessToken(String subject) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + accessTokenValidityMs);

        return Jwts.builder()
                .subject(subject)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith((SecretKey) key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public String getSubjectFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith((SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }
}