package com.thestoryceller.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.from:${spring.mail.username:noreply@thestoryceller.in}}")
    private String fromEmail;

    public void sendOtpEmail(String toEmail, String otp) {
        String subject = "The Story Celler - Your OTP Code";
        String content = "Hello,\n\nYour One-Time Password (OTP) code is: " + otp
                + "\n\nThis OTP is valid for 5 minutes. Please do not share it with anyone.\n\nWarm regards,\nThe Story Celler Team";

        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject(subject);
                message.setText(content);
                mailSender.send(message);
                log.info("OTP email successfully sent to {}", toEmail);
                return;
            } catch (Exception e) {
                log.error("Failed to send email via SMTP: {}. Falling back to console log.", e.getMessage(), e);
            }
        } else {
            log.warn("JavaMailSender bean is not available. SMTP email config is disabled.");
        }

        // Fallback for local testing or failure
        log.info("\n==================================================\n" +
                "  [EMAIL VERIFICATION OTP FALLBACK]\n" +
                "  To: {}\n" +
                "  OTP: {}\n" +
                "==================================================\n", toEmail, otp);
    }
}
