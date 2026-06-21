package com.expensehub.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponse {
    // This DTO represents the data returned in response to an expense-related request. 
    // It includes fields for the expense ID, title, amount, category, date of the expense, and an optional description.
    private Long id;

    private String title;

    private BigDecimal amount;

    private String category;

    private LocalDate expenseDate;

    private String description;
}