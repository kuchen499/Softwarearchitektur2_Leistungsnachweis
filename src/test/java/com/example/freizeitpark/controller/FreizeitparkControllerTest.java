package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.Freizeitpark;
import com.example.freizeitpark.repository.FreizeitparkRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class FreizeitparkControllerTest extends IntegrationTestBase {

    @Autowired
    private FreizeitparkRepository repository;

    @BeforeEach
    public void setup() {
        repository.deleteAll();
    }

    @Test
    public void testGetAndUpdateFreizeitpark() throws Exception {
        // Zuerst den Test-Datensatz einfügen
        Freizeitpark park = new Freizeitpark();
        park.setName("Hameln Park");
        park.setAdresse("Hameln");
        park.setLogo("logo.png");
        park.setOeffnungszeiten("09:00 - 18:00");
        park.setEintrittspreise("Erwachsene: 20€, Kinder: 10€");
        park.setBeschreibung("Ein schöner Freizeitpark.");
        repository.save(park);

        // GET: Überprüfe, ob der gespeicherte Datensatz zurückgegeben wird
        mockMvc.perform(get("/api/freizeitpark"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Hameln Park"));

        // Update: Datensatz ändern und über PUT aktualisieren
        park.setName("Updated Park");
        String json = objectMapper.writeValueAsString(park);
        mockMvc.perform(put("/api/freizeitpark")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Park"));
    }
}
