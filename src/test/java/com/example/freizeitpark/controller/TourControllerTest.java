package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.Tour;
import com.example.freizeitpark.repository.TourRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TourControllerTest extends IntegrationTestBase {

    @Autowired
    private TourRepository tourRepository;

    @BeforeEach
    void setUp() {
        tourRepository.deleteAll();
    }

    @Test
    void testGetAllTouren() throws Exception {
        Tour t1 = new Tour();
        t1.setName("Tour 1");
        t1.setLogo("t1.png");
        t1.setPreis("25€");
        t1.setAttraktionen(Arrays.asList("A1", "A2"));
        t1.setDauer("60 min");
        t1.setStartZeit("10:00");
        t1.setEndZeit("11:00");
        t1.setBeschreibung("Tour 1 Beschreibung");

        Tour t2 = new Tour();
        t2.setName("Tour 2");
        t2.setLogo("t2.png");
        t2.setPreis("30€");
        t2.setAttraktionen(Arrays.asList("A3", "A4"));
        t2.setDauer("90 min");
        t2.setStartZeit("12:00");
        t2.setEndZeit("13:30");
        t2.setBeschreibung("Tour 2 Beschreibung");

        tourRepository.save(t1);
        tourRepository.save(t2);

        mockMvc.perform(get("/api/touren"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$.[0].name").value("Tour 1"))
                .andExpect(jsonPath("$.[1].name").value("Tour 2"));
    }

    @Test
    void testCreateTour() throws Exception {
        Tour t = new Tour();
        t.setName("Neue Tour");
        t.setLogo("neu.png");
        t.setPreis("50€");
        t.setAttraktionen(Arrays.asList("Attr1", "Attr2"));
        t.setDauer("120 min");
        t.setStartZeit("09:00");
        t.setEndZeit("11:00");
        t.setBeschreibung("Beschreibung...");

        mockMvc.perform(post("/api/touren")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(t)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Neue Tour"))
                .andExpect(jsonPath("$.logo").value("neu.png"))
                .andExpect(jsonPath("$.preis").value("50€"))
                .andExpect(jsonPath("$.attraktionen.length()").value(2))
                .andExpect(jsonPath("$.beschreibung").value("Beschreibung..."));

        assertThat(tourRepository.findAll()).hasSize(1);
    }

    @Test
    void testUpdateTour() throws Exception {
        Tour existing = new Tour();
        existing.setName("Old Tour");
        existing.setLogo("old.png");
        existing.setPreis("40€");
        existing.setAttraktionen(Arrays.asList("X", "Y"));
        existing.setDauer("90 min");
        existing.setStartZeit("10:00");
        existing.setEndZeit("11:30");
        existing.setBeschreibung("Old desc");
        existing = tourRepository.save(existing);

        Tour updated = new Tour();
        updated.setName("Updated Tour");
        updated.setLogo("updated.png");
        updated.setPreis("60€");
        updated.setAttraktionen(Arrays.asList("A", "B", "C"));
        updated.setDauer("150 min");
        updated.setStartZeit("09:00");
        updated.setEndZeit("11:30");
        updated.setBeschreibung("Updated desc");

        mockMvc.perform(put("/api/touren/" + existing.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(existing.getId()))
                .andExpect(jsonPath("$.name").value("Updated Tour"))
                .andExpect(jsonPath("$.logo").value("updated.png"))
                .andExpect(jsonPath("$.preis").value("60€"))
                .andExpect(jsonPath("$.attraktionen.length()").value(3))
                .andExpect(jsonPath("$.beschreibung").value("Updated desc"));
    }

    @Test
    void testDeleteTour() throws Exception {
        Tour existing = new Tour();
        existing.setName("Delete Me");
        existing = tourRepository.save(existing);

        mockMvc.perform(delete("/api/touren/" + existing.getId()))
                .andExpect(status().isOk());

        assertThat(tourRepository.findById(existing.getId())).isEmpty();
    }
}
