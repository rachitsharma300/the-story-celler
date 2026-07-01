package com.thestoryceller.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    public void sendOtpEmail(String toEmail, String otp) {
        // Temporarily disabled until SMTP/email setup is ready.
        // SimpleMailMessage message = new SimpleMailMessage();
        // message.setTo(toEmail);
        // message.setSubject("MyStoryArchive - Your OTP Code");
        // message.setText("Hello,\n\nYour One-Time Password (OTP) code is: " + otp + "\n\nThis OTP is valid for 5 minutes. Please do not share it with anyone.\n\nWarm regards,\nMyStoryArchive Team");
        // mailSender.send(message);
        log.info("Email sending disabled. OTP for {} is {}", toEmail, otp);
    }
}
