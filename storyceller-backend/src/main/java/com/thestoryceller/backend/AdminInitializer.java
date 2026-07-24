package com.thestoryceller.backend;

import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email:admin@storyceller.in}")
    private String adminEmail;

    @Value("${admin.password:admin123}")
    private String adminPassword;

    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.findByEmail(adminEmail)
            .ifPresentOrElse(
                admin -> {
                    if (!"ADMIN".equals(admin.getRole())) {
                        admin.setRole("ADMIN");
                        admin.setPassword(passwordEncoder.encode(adminPassword));
                        userRepository.save(admin);
                        System.out.println("Admin role updated to ADMIN for: " + adminEmail);
                    }
                },
                () -> {
                    User admin = new User();
                    admin.setName("System Admin");
                    admin.setEmail(adminEmail);
                    admin.setPassword(passwordEncoder.encode(adminPassword));
                    admin.setRole("ADMIN");
                    admin.setIsRegistered(true);
                    userRepository.save(admin);
                    System.out.println("Default admin user initialized successfully: " + adminEmail);
                }
            );
    }
}

