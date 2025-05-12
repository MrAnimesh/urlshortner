package com.urlshortner.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urlshortner.dto.UrlDto;
import com.urlshortner.dto.UrlFetchForCustomDto;
import com.urlshortner.entity.Url;
import com.urlshortner.exception.UrlException;
import com.urlshortner.repository.UrlRepository;

import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class UrlServiceImpl {

    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int SHORT_CODE_LENGTH = 6;
    private Random pickRandom = new Random();
    @Autowired
    private UrlRepository urlRepository;

    public Url createShortUrl(String originalUrl){
        String shortenUrl = generateShortCode(SHORT_CODE_LENGTH);
        while(urlRepository.existsByShortUrl(shortenUrl)){
            shortenUrl = generateShortCode(SHORT_CODE_LENGTH);
        }

        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortUrl(shortenUrl);
        url.setCount((long) 0);

        return urlRepository.save(url);
    }
    
    public boolean createCustomShortUrl(UrlFetchForCustomDto customDto) {
    	if (!urlRepository.existsByShortUrl(customDto.getCustomUrl())) {
    		Url url = new Url();
    		url.setOriginalUrl(customDto.getOriginalUrl());
    		url.setShortUrl(customDto.getCustomUrl());
    		url.setCount((long) 0);
    		
    		urlRepository.save(url);
    		
    		return true;
    	}
    	else {
    		return false;
    	}
    }

    public Url getOriginalUrl(String shortUrl) throws UrlException{

    	Optional<Url> optionalUrl = urlRepository.findByShortUrl(shortUrl);
    	Url url = optionalUrl.orElseThrow(()-> new UrlException("Service.URL_NOT_FOUND"));
    	url.setCount(url.getCount()+1);
    	return url;
    
    	
    }

    public String generateShortCode(int length){
        StringBuilder sb = new StringBuilder(length);
        for(int i = 0; i < length; i+=1){
           sb.append(CHARACTERS.charAt(pickRandom.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }
    
    
    public Integer deleteCreatedUrl(String url) {
    	
    	int lastSlashIndex = url.lastIndexOf('/');
    	String extractedShortUrl = url.substring(lastSlashIndex + 1);
        
        return urlRepository.deleteByShortUrl(extractedShortUrl);
    
    }
    

}
