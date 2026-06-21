package com.expensehub.backend.dto;

import lombok.Data;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateExpenseRequest {
    // This DTO represents the data required to create a new expense. It includes fields for the title, amount, category, date of the expense, and an optional description.
    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotBlank(message = "Category is required")
    private String category;

   @NotNull(message = "ExpenseDate is required")
    private LocalDate expenseDate;

    @NotBlank(message = "Description is required")
    private String description;
}
