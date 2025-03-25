package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.Tour;
import com.example.freizeitpark.repository.TourRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.Arrays;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TourControllerTest extends IntegrationTestBase {

    @Autowired
    private TourRepository repository;

    @BeforeEach
    public void setup() {
        repository.deleteAll();
    }

    @Test
    public void testCreateAndGetTour() throws Exception {
        Tour tour = new Tour();
        tour.setName("Familientour");
        tour.setLogo("logo.png");
        tour.setPreis("25€");
        tour.setAttraktionen(Arrays.asList("Riesenrad", "Geisterbahn"));
        tour.setDauer("60 Minuten");
        tour.setStartZeit("10:00");
        tour.setEndZeit("11:00");
        tour.setBeschreibung("Perfekt für Familien!");

        // POST: Neue Tour erstellen
        mockMvc.perform(post("/api/touren")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(tour)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Familientour"));

        // GET: Alle Touren abrufen und prüfen, ob "Familientour" enthalten ist
        mockMvc.perform(get("/api/touren"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].name").value(hasItem("Familientour")));
    }
}
