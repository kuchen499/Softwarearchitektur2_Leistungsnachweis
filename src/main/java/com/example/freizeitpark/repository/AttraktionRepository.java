package com.example.freizeitpark.repository;

import com.example.freizeitpark.model.Attraktion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttraktionRepository extends JpaRepository<Attraktion, Long> {
}
