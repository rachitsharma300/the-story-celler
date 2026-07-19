package com.thestoryceller.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    private static final String UPLOAD_DIR = "uploads";

    @PostMapping
    public ResponseEntity<Map<String, Object>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", required = false) String folder) {
        
        Map<String, Object> response = new HashMap<>();
        
        if (file.isEmpty()) {
            response.put("success", false);
            response.put("error", "No file provided");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            // Create upload directory if it doesn't exist
            File uploadFolder = new File(UPLOAD_DIR);
            if (!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }

            // Clean file name
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String cleanName = UUID.randomUUID().toString() + extension;
            Path filepath = Paths.get(UPLOAD_DIR, cleanName);
            
            // Save file
            Files.write(filepath, file.getBytes());

            String fileUrl = "http://localhost:8080/uploads/" + cleanName;
            
            response.put("success", true);
            response.put("url", fileUrl);
            response.put("source", "local");
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("success", false);
            response.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
