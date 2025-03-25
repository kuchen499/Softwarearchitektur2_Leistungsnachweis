package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.Attraktion;
import com.example.freizeitpark.repository.AttraktionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.Arrays;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AttraktionControllerTest extends IntegrationTestBase {

    @Autowired
    private AttraktionRepository repository;

    @BeforeEach
    public void setup() {
        repository.deleteAll();
    }

    @Test
    public void testCreateAndGetAttraktion() throws Exception {
        Attraktion attraktion = new Attraktion();
        attraktion.setName("Testbahn");
        attraktion.setLogo("logo.png");
        attraktion.setTags(Arrays.asList("Adrenalin", "Schnell"));
        attraktion.setBeschreibung("Rasant!");

        // POST: Neue Attraktion erstellen
        mockMvc.perform(post("/api/attraktionen")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(attraktion)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Testbahn"));

        // GET: Alle Attraktionen abrufen und prüfen, ob "Testbahn" enthalten ist
        mockMvc.perform(get("/api/attraktionen"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].name").value(hasItem("Testbahn")));
    }
}
