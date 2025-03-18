package com.example.freizeitpark.repository;

import com.example.freizeitpark.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, Long> {
}
