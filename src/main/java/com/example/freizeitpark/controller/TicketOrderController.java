package com.example.freizeitpark.controller;

import com.example.freizeitpark.model.TicketOrder;
import com.example.freizeitpark.repository.TicketOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")  // oder den Port deines Frontends
public class TicketOrderController {

    @Autowired
    private TicketOrderRepository ticketOrderRepository;

    // Fest definierte Ticketpreise
    private final double priceEntrance = 20.0;
    private final double priceTour = 30.0;

    @PostMapping
    public TicketOrder purchaseTickets(@RequestBody TicketOrder order) {
        return ticketOrderRepository.save(order);
    }
}

