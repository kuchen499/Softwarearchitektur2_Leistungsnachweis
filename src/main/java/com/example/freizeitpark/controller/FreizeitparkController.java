package com.example.freizeitpark.controller;

import com.example.freizeitpark.model.Freizeitpark;
import com.example.freizeitpark.repository.FreizeitparkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/freizeitpark")
public class FreizeitparkController {

    @Autowired
    private FreizeitparkRepository freizeitparkRepository;

    // GET: Freizeitpark-Daten abrufen
    @GetMapping
    public Freizeitpark getFreizeitpark() {
        // Wir gehen davon aus, dass es nur einen Datensatz gibt.
        return freizeitparkRepository.findAll().stream().findFirst().orElseGet(() -> {
            Freizeitpark park = new Freizeitpark();
            park.setName("Abenteuerpark Hameln");
            park.setLogo("https://via.placeholder.com/150");
            park.setAdresse("Am Weserufer 1, 31785 Hameln");
            park.setOeffnungszeiten("09:00 - 18:00");
            park.setEintrittspreise("Erwachsene: 20€, Kinder: 10€");
            park.setBeschreibung("Ein aufregender Freizeitpark mit zahlreichen Attraktionen.");
            return freizeitparkRepository.save(park);
        });
    }

    // PUT: Freizeitpark-Daten aktualisieren
    @PutMapping
    public Freizeitpark updateFreizeitpark(@RequestBody Freizeitpark updatedPark) {
        Freizeitpark park = getFreizeitpark();
        park.setName(updatedPark.getName());
        park.setLogo("img_4.png");
        park.setAdresse(updatedPark.getAdresse());
        park.setOeffnungszeiten(updatedPark.getOeffnungszeiten());
        park.setEintrittspreise(updatedPark.getEintrittspreise());
        park.setBeschreibung(updatedPark.getBeschreibung());
        return freizeitparkRepository.save(park);
    }
}
