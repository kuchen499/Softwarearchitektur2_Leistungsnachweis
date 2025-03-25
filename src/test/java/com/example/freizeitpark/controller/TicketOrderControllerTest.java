package com.example.freizeitpark.controller;

import com.example.freizeitpark.IntegrationTestBase;
import com.example.freizeitpark.model.TicketOrder;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TicketOrderControllerTest extends IntegrationTestBase {

    @Test
    public void testPurchaseTickets() throws Exception {
        TicketOrder order = new TicketOrder();
        order.setEntranceTickets(2);
        order.setTourTickets(1);

        // 2 * 20.0 + 1 * 30.0 = 70.0
        mockMvc.perform(post("/api/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPrice").value(70.0))
                .andExpect(jsonPath("$.bookingId", not("")));
    }
}
