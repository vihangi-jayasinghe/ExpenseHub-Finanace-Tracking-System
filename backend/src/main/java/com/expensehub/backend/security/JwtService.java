package com.expensehub.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import io.jsonwebtoken.Claims;
import java.util.function.Function;

@Service
public class JwtService {

        // Defining a secret key for signing the JWT tokens. 
        // In a real application, this should be stored securely and not hardcoded.
        private static final String SECRET =
                "mySecretKeyForExpenseHubApplication123456789";

        private final SecretKey key =
                Keys.hmacShaKeyFor(
                        SECRET.getBytes(StandardCharsets.UTF_8));

        public String generateToken(String email) {

                return Jwts.builder()
                        .subject(email)
                        .issuedAt(new Date())
                        .expiration(
                                new Date(
                                        System.currentTimeMillis()
                                                + 1000 * 60 * 60 * 24
                                )
                        )
                        .signWith(key)
                        .compact();
        }
        
        // The extractUsername method extracts the email (username) from the JWT token using the extractClaim method, 
        // which retrieves the subject claim from the token's payload.
        //Extract email from JWT
        public String extractUsername(String token) {

                return extractClaim(
                        token,
                        Claims::getSubject
                );
        }

        //Generic claim extractor
        public <T> T extractClaim(
                String token,
                Function<Claims, T> claimsResolver
        ) {

                Claims claims = extractAllClaims(token);

                return claimsResolver.apply(claims);
        }

        //Extract all claims
        private Claims extractAllClaims(String token) {

                return Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();
        }

        //Validate token
        public boolean isTokenValid(
                String token,
                String email
        ) {

                String username = extractUsername(token);

                return username.equals(email)
                        && !isTokenExpired(token);
        }

        //Check expiration
        private boolean isTokenExpired(
                String token
        ) {

                return extractClaim(
                        token,
                        Claims::getExpiration
                ).before(new Date());
        }
}
