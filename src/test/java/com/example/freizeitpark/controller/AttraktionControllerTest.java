package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.Attraktion;
import com.example.freizeitpark.repository.AttraktionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AttraktionControllerTest extends IntegrationTestBase {

    @Autowired
    private AttraktionRepository attraktionRepository;

    @BeforeEach
    void setUp() {
        // Vor jedem Test die Datenbank leeren
        attraktionRepository.deleteAll();
    }

    @Test
    void testCreateAttraktion() throws Exception {
        Attraktion attraktion = new Attraktion();
        attraktion.setName("Test Attraktion");
        attraktion.setLogo("test_logo.png");
        attraktion.setTags(Arrays.asList("Spaß", "Adrenalin"));
        attraktion.setBeschreibung("Beschreibung...");

        mockMvc.perform(post("/api/attraktionen")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(attraktion)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Test Attraktion"))
                .andExpect(jsonPath("$.logo").value("test_logo.png"))
                .andExpect(jsonPath("$.tags[0]").value("Spaß"))
                .andExpect(jsonPath("$.beschreibung").value("Beschreibung..."));

        // Überprüfen, ob der Datensatz wirklich in der DB liegt
        List<Attraktion> saved = attraktionRepository.findAll();
        assertThat(saved).hasSize(1);
        assertThat(saved.get(0).getName()).isEqualTo("Test Attraktion");
    }

    @Test
    void testGetAllAttraktionen() throws Exception {
        // Zwei Attraktionen in DB anlegen
        Attraktion a1 = new Attraktion();
        a1.setName("Attraktion 1");
        a1.setLogo("logo1.png");
        a1.setTags(Arrays.asList("tag1", "tag2"));
        a1.setBeschreibung("desc1");

        Attraktion a2 = new Attraktion();
        a2.setName("Attraktion 2");
        a2.setLogo("logo2.png");
        a2.setTags(Arrays.asList("tag3", "tag4"));
        a2.setBeschreibung("desc2");

        attraktionRepository.save(a1);
        attraktionRepository.save(a2);

        mockMvc.perform(get("/api/attraktionen"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$.[0].name").value("Attraktion 1"))
                .andExpect(jsonPath("$.[1].name").value("Attraktion 2"));
    }

    @Test
    void testUpdateAttraktion() throws Exception {
        // Bestehende Attraktion in DB anlegen
        Attraktion existing = new Attraktion();
        existing.setName("Old Name");
        existing.setLogo("old.png");
        existing.setTags(Arrays.asList("oldTag"));
        existing.setBeschreibung("old desc");
        existing = attraktionRepository.save(existing);

        // Neue Werte zum Updaten
        Attraktion updated = new Attraktion();
        updated.setName("New Name");
        updated.setLogo("new.png");
        updated.setTags(Arrays.asList("newTag"));
        updated.setBeschreibung("new desc");

        mockMvc.perform(put("/api/attraktionen/" + existing.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(existing.getId()))
                .andExpect(jsonPath("$.name").value("New Name"))
                .andExpect(jsonPath("$.logo").value("new.png"))
                .andExpect(jsonPath("$.tags[0]").value("newTag"))
                .andExpect(jsonPath("$.beschreibung").value("new desc"));
    }

    @Test
    void testDeleteAttraktion() throws Exception {
        // Attraktion anlegen
        Attraktion existing = new Attraktion();
        existing.setName("ToDelete");
        existing = attraktionRepository.save(existing);

        mockMvc.perform(delete("/api/attraktionen/" + existing.getId()))
                .andExpect(status().isOk());

        // Prüfen, ob sie wirklich gelöscht wurde
        assertThat(attraktionRepository.findById(existing.getId())).isEmpty();
    }
}
