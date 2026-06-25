package com.thestoryceller.backend.controller;

import com.thestoryceller.backend.entity.Sample;
import com.thestoryceller.backend.repository.SampleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/samples")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SampleController {

    private final SampleRepository sampleRepository;

    @GetMapping
    public ResponseEntity<List<Sample>> getAllSamples() {
        return ResponseEntity.ok(sampleRepository.findAll());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Sample>> getSamplesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(sampleRepository.findByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Sample> createSample(@RequestBody Sample sample) {
        Sample saved = sampleRepository.save(sample);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
