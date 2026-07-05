package com.thestoryceller.backend;

import com.thestoryceller.backend.entity.User;
import com.thestoryceller.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.findByEmail("admin@storyceller.in")
            .ifPresentOrElse(
                admin -> {
                    if (!"ADMIN".equals(admin.getRole())) {
                        admin.setRole("ADMIN");
                        admin.setPassword(passwordEncoder.encode("admin123"));
                        userRepository.save(admin);
                        System.out.println("Admin role corrected to ADMIN for: admin@storyceller.in");
                    }
                },
                () -> {
                    User admin = new User();
                    admin.setName("System Admin");
                    admin.setEmail("admin@storyceller.in");
                    admin.setPassword(passwordEncoder.encode("admin123"));
                    admin.setRole("ADMIN");
                    userRepository.save(admin);
                    System.out.println("Default admin user created successfully: admin@storyceller.in / admin123");
                }
            );
    }
}
