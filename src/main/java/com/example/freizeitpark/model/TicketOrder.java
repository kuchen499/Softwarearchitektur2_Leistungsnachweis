package com.example.freizeitpark.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class TicketOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingId;
    private int entranceTickets;
    private int tourTickets;
    private double totalPrice;
    private LocalDateTime orderDate;

    @PrePersist
    public void prePersist() {
        // Generiere eine zufällige Buchungs-ID und setze das Bestelldatum
        this.bookingId = UUID.randomUUID().toString();
        this.orderDate = LocalDateTime.now();
    }

    // Getter und Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public int getEntranceTickets() { return entranceTickets; }
    public void setEntranceTickets(int entranceTickets) { this.entranceTickets = entranceTickets; }

    public int getTourTickets() { return tourTickets; }
    public void setTourTickets(int tourTickets) { this.tourTickets = tourTickets; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
}