package com.urlshortner.utils;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import reactor.core.publisher.Mono;

@Component
public class AuthTokenFilter implements GlobalFilter, Ordered {

    @Value("${spring.app.jwtSecret}")
    private String secret;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        
        String authHeader = request.getHeaders().getFirst("Authorization");
        
        if (path.startsWith("/api/auth/public") || path.startsWith("/actuator/health") || path.startsWith("/shortner/public") || path.startsWith("/")) {
            return chain.filter(exchange);
        }
        
        // If no auth header, let Spring Security handle it based on path rules
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        
        try {
            // For older versions of JJWT that don't have parserBuilder()
        	Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token);
            
            // Token is valid, continue with the filter chain
            return chain.filter(exchange);
        } catch (Exception e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }

    @Override
    public int getOrder() {
        return -1; // Execute this filter before other filters
    }

    private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
	}
}