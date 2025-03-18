package com.example.freizeitpark.repository;

import com.example.freizeitpark.model.TicketOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketOrderRepository extends JpaRepository<TicketOrder, Long> {
}
