package com.urlshortner.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@Transactional
public class EmailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}")
	private String fromEmail;
	
	public void sendVerificationEmial(String toEmail, String verificationToken) {
		
		try {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			
			helper.setFrom(fromEmail);
			helper.setTo(toEmail);
			helper.setSubject("Email Verification");
			String verificationUrl = "http://localhost:3000/api/verify?token="+verificationToken;
			String emailContent = """
				<html>
						<body>
								<h2>Verify Your Email Address</h2>
								<p>Please click the link below to verify your email address</p>
								<a href="%s">Verify Email</a>
								<p> This link is valid for 30 Minutes</p>
								<p> If you didn't request for signup, ignore this email.</p>
						</body>
				</html>	
			""".formatted(verificationUrl);
			
			helper.setText(emailContent);
			javaMailSender.send(message);
			
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
}
