package com.example.freizeitpark.controller;

import com.example.freizeitpark.model.Tour;
import com.example.freizeitpark.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/touren")
public class TourController {

    @Autowired
    private TourRepository tourRepository;

    // GET: Alle Touren abrufen
    @GetMapping
    public List<Tour> getAllTouren() {
        return tourRepository.findAll();
    }

    // POST: Neue Tour anlegen
    @PostMapping
    public Tour createTour(@RequestBody Tour tour) {
        return tourRepository.save(tour);
    }

    // PUT: Bestehende Tour aktualisieren
    @PutMapping("/{id}")
    public Tour updateTour(@PathVariable Long id, @RequestBody Tour updatedTour) {
        return tourRepository.findById(id).map(tour -> {
            tour.setName(updatedTour.getName());
            tour.setLogo(updatedTour.getLogo());
            tour.setPreis(updatedTour.getPreis());
            tour.setAttraktionen(updatedTour.getAttraktionen());
            tour.setDauer(updatedTour.getDauer());
            tour.setStartZeit(updatedTour.getStartZeit());
            tour.setEndZeit(updatedTour.getEndZeit());
            tour.setBeschreibung(updatedTour.getBeschreibung());
            return tourRepository.save(tour);
        }).orElseGet(() -> {
            updatedTour.setId(id);
            return tourRepository.save(updatedTour);
        });
    }

    // DELETE: Tour löschen
    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable Long id) {
        tourRepository.deleteById(id);
    }
}
