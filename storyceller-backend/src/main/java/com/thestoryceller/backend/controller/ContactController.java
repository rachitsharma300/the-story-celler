package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Contact;
import com.thestoryceller.backend.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactRepository contactRepository;

    @PostMapping
    public ResponseEntity<?> submitContactForm(@RequestBody Contact contact) {
        if (contact.getName() == null || contact.getEmail() == null || contact.getMessage() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name, email, and message are required fields"));
        }
        Contact saved = contactRepository.save(contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContactInquiries() {
        return ResponseEntity.ok(contactRepository.findAll());
    }
}
