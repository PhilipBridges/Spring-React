package com.example.agile.JWT;

import com.example.agile.domain.UserPrinciple;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;


// generate a JWT token
// validate a token
// parse username from JWT token

@Component
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${agile.app.jwtSecret}")
    private String jwtSecret;

    @Value("${agile.app.jwtExpiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication) {

        UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid com.example.agile.JWT signature -> Message: {} ", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid com.example.agile.JWT token -> Message: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("Expired com.example.agile.JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported com.example.agile.JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("com.example.agile.JWT claims string is empty -> Message: {}", e);
        }

        return false;
    }
}