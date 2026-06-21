package com.expensehub.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateIncomeRequest {

    // This DTO represents the data required to create a new income entry.
    private String source;

    private BigDecimal amount;

    private LocalDate incomeDate;

    private String description;
}