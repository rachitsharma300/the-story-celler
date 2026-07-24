package com.thestoryceller.backend.service;

import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User registerUser(User user) {
        Optional<User> existingUserOpt = userRepository.findByEmail(user.getEmail());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            if (existingUser.getIsRegistered() != null && existingUser.getIsRegistered()) {
                throw new IllegalArgumentException("Email already in use");
            }
            existingUser.setName(user.getName());
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            existingUser.setRole("USER");
            existingUser.setIsRegistered(true);
            return userRepository.save(existingUser);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole("USER");
        }
        user.setIsRegistered(true);
        return userRepository.save(user);
    }

    public void generateAndSendOtp(String email) {
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            // Create user placeholder for first-time OTP registration
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(email.split("@")[0]);
            newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            newUser.setRole("USER");
            newUser.setIsRegistered(false);
            return newUser;
        });

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);
        emailService.sendOtpEmail(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            return false;
        }

        if (user.getOtpExpiry() == null || user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return false;
        }

        // Clear OTP once verified
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
        return true;
    }

    public User updateUserProfile(String email, User updatedData) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setName(updatedData.getName());
        user.setPhone(updatedData.getPhone());
        user.setAddress(updatedData.getAddress());
        user.setCity(updatedData.getCity());
        user.setState(updatedData.getState());
        user.setPincode(updatedData.getPincode());
        return userRepository.save(user);
    }

    public void resetPassword(String email, String otp, String newPassword) {
        if (!verifyOtp(email, otp)) {
            throw new IllegalArgumentException("Invalid or expired OTP");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public User registerGoogleUser(String email, String name) {
        Optional<User> existingUserOpt = userRepository.findByEmail(email);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            if (existingUser.getIsRegistered() == null || !existingUser.getIsRegistered()) {
                existingUser.setIsRegistered(true);
                existingUser.setName(name);
                return userRepository.save(existingUser);
            }
            return existingUser;
        }
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setName(name);
        newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        newUser.setRole("USER");
        newUser.setIsRegistered(true);
        return userRepository.save(newUser);
    }
}
