package com.example.freizeitpark.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String logo;
    private String preis;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tour_attraktionen", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "attraktionen")
    private List<String> attraktionen;

    private String dauer;
    private String startZeit;
    private String endZeit;

    @Column(length = 2000)
    private String beschreibung;

    // Getter und Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getPreis() {
        return preis;
    }

    public void setPreis(String preis) {
        this.preis = preis;
    }

    public List<String> getAttraktionen() {
        return attraktionen;
    }

    public void setAttraktionen(List<String> attraktionen) {
        this.attraktionen = attraktionen;
    }

    public String getDauer() {
        return dauer;
    }

    public void setDauer(String dauer) {
        this.dauer = dauer;
    }

    public String getStartZeit() {
        return startZeit;
    }

    public void setStartZeit(String startZeit) {
        this.startZeit = startZeit;
    }

    public String getEndZeit() {
        return endZeit;
    }

    public void setEndZeit(String endZeit) {
        this.endZeit = endZeit;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }
}

