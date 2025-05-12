package com.urlshortner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.urlshortner.config.IpConfig;
import com.urlshortner.dto.UrlFetchDto;
import com.urlshortner.dto.UrlFetchForCustomDto;
import com.urlshortner.entity.Url;
import com.urlshortner.exception.UrlException;
import com.urlshortner.service.UrlServiceImpl;
import com.urlshortner.util.IPAddressUtil;
import com.urlshortner.validation.UrlValidator;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Delegate;

@RestController
@RequestMapping("/api")
public class UrlApi {

    @Autowired
    private UrlServiceImpl urlService;
    @Autowired 
    private UrlValidator urlValidator;
    @Autowired
    private Environment environment;
    
    @Autowired
    private IpConfig ipConfig;
    
    private IPAddressUtil addressUtil;

    @PostMapping("/shorten")
    public ResponseEntity<String> createShortUrl(@RequestBody UrlFetchDto fetchDto){
        Url url = urlService.createShortUrl(fetchDto.getOriginalUrl());
        return new ResponseEntity<>("http://localhost:3000/api/"+url.getShortUrl() , HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{shortCode}")
    public RedirectView redirectToOriginalUrl(@PathVariable String shortCode, HttpServletRequest httpServletRequest) throws UrlException {
    	String clientIp = getClientIpAddress(httpServletRequest);
    	System.out.println("Client Ip: "+clientIp);
//        ipConfig.setupIpInfo(clientIp);
    	Url url = urlService.getOriginalUrl(shortCode);
    	if (url != null)
    		return new RedirectView(url.getOriginalUrl());
    	else
    		throw new UrlException(environment.getProperty("Service.URL_NOT_FOUND"));
    }
    
    @PostMapping("/shorten/customUrl")
    public ResponseEntity<String> createCustomShortUrl(@RequestBody UrlFetchForCustomDto fetchDto){
    	
    	if (urlValidator.isValidCustomUrl(fetchDto.getCustomUrl())) {
	    	if (urlService.createCustomShortUrl(fetchDto)) {
	    		return new ResponseEntity<String>("http://localhost:3000/api/"+fetchDto.getCustomUrl(),HttpStatus.CREATED);
	    	}
	    	return new ResponseEntity<String>("This Custom Url already exists, Kindly try different one", HttpStatus.CONFLICT);
    	}else {
    		return new ResponseEntity<String>(environment.getProperty("API.WRONG_URL"), HttpStatus.BAD_REQUEST);
    	}
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUrl(@RequestBody UrlFetchDto urlToBeDeleted){
    	if (urlService.deleteCreatedUrl(urlToBeDeleted.getOriginalUrl()) > 0) {
    		return new ResponseEntity<String>("Url got deleted", HttpStatus.OK);
    	}else {
    		return new ResponseEntity<String>("Some error occured", HttpStatus.BAD_REQUEST);
    	}
    	
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            String add =  request.getRemoteAddr();
            ipConfig.setupIpInfo(add);
            return add;
        }
        return xForwardedForHeader.split(",")[0];
    }



}
