package com.urlshortner.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urlshortner.entity.Url;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    public boolean existsByShortUrl(String shortUrl);
    public Optional<Url> findByShortUrl(String shortCode);
    
    public Integer deleteByShortUrl(String shortCode);

}
