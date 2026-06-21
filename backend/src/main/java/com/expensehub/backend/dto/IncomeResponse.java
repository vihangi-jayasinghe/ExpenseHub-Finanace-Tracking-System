package com.expensehub.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncomeResponse {

    // This DTO represents the data returned in response to an income-related request. 
    // It includes fields for the income ID, source of the income, amount, date of
    private Long id;

    private String source;

    private BigDecimal amount;

    private LocalDate incomeDate;

    private String description;
}