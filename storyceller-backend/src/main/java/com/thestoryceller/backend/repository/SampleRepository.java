package com.thestoryceller.backend.repository;

import com.thestoryceller.backend.entity.Sample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SampleRepository extends JpaRepository<Sample, Long> {
    List<Sample> findByCategory(String category);
}
