package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.TicketOrder;
import com.example.freizeitpark.repository.TicketOrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TicketOrderControllerTest extends IntegrationTestBase {

    @Autowired
    private TicketOrderRepository ticketOrderRepository;

    @BeforeEach
    void setUp() {
        ticketOrderRepository.deleteAll();
    }

    @Test
    void testPurchaseTickets() throws Exception {
        TicketOrder order = new TicketOrder();
        order.setEntranceTickets(2);
        order.setChildTickets(1);
        order.setTourTickets(1);
        // totalPrice wird vom Controller (Stand jetzt) nicht automatisch berechnet,
        // sondern so abgespeichert, wie es geschickt wird.
        // Falls du hier Logik haben willst, müsstest du sie im Controller hinterlegen.

        mockMvc.perform(post("/api/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.bookingId").isNotEmpty())
                .andExpect(jsonPath("$.entranceTickets").value(2))
                .andExpect(jsonPath("$.childTickets").value(1))
                .andExpect(jsonPath("$.tourTickets").value(1));

        // Datenbankprüfung
        assertThat(ticketOrderRepository.findAll()).hasSize(1);
        TicketOrder saved = ticketOrderRepository.findAll().get(0);
        assertThat(saved.getEntranceTickets()).isEqualTo(2);
        assertThat(saved.getChildTickets()).isEqualTo(1);
        assertThat(saved.getTourTickets()).isEqualTo(1);
        assertThat(saved.getBookingId()).isNotBlank();
    }
}
