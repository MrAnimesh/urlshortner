package com.urlshortner.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    @Column(unique = true)
    private String shortUrl;
    private Long count;

}
