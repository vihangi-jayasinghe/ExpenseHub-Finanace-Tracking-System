package com.expensehub.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UpdateIncomeRequest {

    // This DTO represents the data required to update an existing income entry.
    private String source;

    private BigDecimal amount;

    private LocalDate incomeDate;

    private String description;
}