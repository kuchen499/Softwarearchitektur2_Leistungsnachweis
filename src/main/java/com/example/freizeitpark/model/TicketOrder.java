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
    private int childTickets;          // <-- neu hinzugefügt
    private int tourTickets;
    private double totalPrice;

    private LocalDateTime orderDate;

    @PrePersist
    public void prePersist() {
        this.bookingId = UUID.randomUUID().toString();
        this.orderDate = LocalDateTime.now();
    }

    // Getter & Setter

    public Long getId() {
        return id;
    }

    public String getBookingId() {
        return bookingId;
    }

    public int getEntranceTickets() {
        return entranceTickets;
    }

    public int getChildTickets() {
        return childTickets;
    }

    public int getTourTickets() {
        return tourTickets;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public void setEntranceTickets(int entranceTickets) {
        this.entranceTickets = entranceTickets;
    }

    public void setChildTickets(int childTickets) {
        this.childTickets = childTickets;
    }

    public void setTourTickets(int tourTickets) {
        this.tourTickets = tourTickets;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}
