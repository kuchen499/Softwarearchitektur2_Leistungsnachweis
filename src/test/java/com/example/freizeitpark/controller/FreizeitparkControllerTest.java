package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.Freizeitpark;
import com.example.freizeitpark.repository.FreizeitparkRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class FreizeitparkControllerTest extends IntegrationTestBase {

    @Autowired
    private FreizeitparkRepository freizeitparkRepository;

    @BeforeEach
    void setUp() {
        freizeitparkRepository.deleteAll();
    }

    @Test
    void testGetFreizeitpark() throws Exception {
        // Datensatz anlegen
        Freizeitpark park = new Freizeitpark();
        park.setName("Hameln Park");
        park.setAdresse("Hameln");
        park.setLogo("logo.png");
        park.setOeffnungszeiten("09:00 - 18:00");
        park.setEintrittspreise("Erwachsene: 20€, Kinder: 10€");
        park.setBeschreibung("Ein schöner Freizeitpark.");
        freizeitparkRepository.save(park);

        // Prüfen, ob GET-Endpunkt den Datensatz zurückgibt
        mockMvc.perform(get("/api/freizeitpark"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Hameln Park"))
                .andExpect(jsonPath("$.adresse").value("Hameln"))
                .andExpect(jsonPath("$.logo").value("logo.png"))
                .andExpect(jsonPath("$.oeffnungszeiten").value("09:00 - 18:00"))
                .andExpect(jsonPath("$.eintrittspreise").value("Erwachsene: 20€, Kinder: 10€"))
                .andExpect(jsonPath("$.beschreibung").value("Ein schöner Freizeitpark."));
    }

    @Test
    void testUpdateFreizeitpark() throws Exception {
        // Ursprünglichen Datensatz speichern
        Freizeitpark park = new Freizeitpark();
        park.setName("Original Park");
        park.setAdresse("Original Address");
        park.setLogo("original.png");
        park.setOeffnungszeiten("10:00 - 17:00");
        park.setEintrittspreise("10€ Kinder, 20€ Erwachsene");
        park.setBeschreibung("Original Beschreibung");
        freizeitparkRepository.save(park);

        // Neue Werte
        Freizeitpark updated = new Freizeitpark();
        updated.setName("Updated Park");
        updated.setAdresse("Updated Address");
        updated.setLogo("updated.png");
        updated.setOeffnungszeiten("09:00 - 18:00");
        updated.setEintrittspreise("Kinder 15€, Erwachsene 25€");
        updated.setBeschreibung("Neue Beschreibung");

        mockMvc.perform(put("/api/freizeitpark")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Park"))
                .andExpect(jsonPath("$.adresse").value("Updated Address"))
                // Achtung: Im Controller wird das Logo immer auf "img_4.png" gesetzt.
                .andExpect(jsonPath("$.logo").value("img_4.png"))
                .andExpect(jsonPath("$.oeffnungszeiten").value("09:00 - 18:00"))
                .andExpect(jsonPath("$.eintrittspreise").value("Kinder 15€, Erwachsene 25€"))
                .andExpect(jsonPath("$.beschreibung").value("Neue Beschreibung"));

        // Prüfung in der DB
        Freizeitpark saved = freizeitparkRepository.findAll().get(0);
        assertThat(saved.getName()).isEqualTo("Updated Park");
        assertThat(saved.getAdresse()).isEqualTo("Updated Address");
        assertThat(saved.getLogo()).isEqualTo("img_4.png");
        assertThat(saved.getOeffnungszeiten()).isEqualTo("09:00 - 18:00");
        assertThat(saved.getEintrittspreise()).isEqualTo("Kinder 15€, Erwachsene 25€");
        assertThat(saved.getBeschreibung()).isEqualTo("Neue Beschreibung");
    }
}
