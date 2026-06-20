package com.expensehub.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateExpenseRequest {
    // This DTO represents the data required to create a new expense. It includes fields for the title, amount, category, date of the expense, and an optional description.
    private String title;

    private BigDecimal amount;

    private String category;

    private LocalDate expenseDate;

    private String description;
}
