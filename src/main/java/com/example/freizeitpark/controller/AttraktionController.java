package com.example.freizeitpark.controller;

import com.example.freizeitpark.model.Attraktion;
import com.example.freizeitpark.repository.AttraktionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/attraktionen")
public class AttraktionController {

    @Autowired
    private AttraktionRepository attraktionRepository;

    // GET: Alle Attraktionen abrufen
    @GetMapping
    public List<Attraktion> getAllAttraktionen() {
        return attraktionRepository.findAll();
    }

    // POST: Neue Attraktion anlegen
    @PostMapping
    public Attraktion createAttraktion(@RequestBody Attraktion attraktion) {
        return attraktionRepository.save(attraktion);
    }

    // PUT: Bestehende Attraktion aktualisieren
    @PutMapping("/{id}")
    public Attraktion updateAttraktion(@PathVariable Long id, @RequestBody Attraktion updatedAttraktion) {
        return attraktionRepository.findById(id).map(attraktion -> {
            attraktion.setName(updatedAttraktion.getName());
            attraktion.setLogo(updatedAttraktion.getLogo());
            attraktion.setTags(updatedAttraktion.getTags());
            attraktion.setBeschreibung(updatedAttraktion.getBeschreibung());
            return attraktionRepository.save(attraktion);
        }).orElseGet(() -> {
            updatedAttraktion.setId(id);
            return attraktionRepository.save(updatedAttraktion);
        });
    }

    // DELETE: Attraktion löschen
    @DeleteMapping("/{id}")
    public void deleteAttraktion(@PathVariable Long id) {
        attraktionRepository.deleteById(id);
    }
}
