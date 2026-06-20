package com.expensehub.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    // This DTO represents the data returned in response to a dashboard-related request. 
    // It includes fields for the total income, total expenses, and the balance (total income minus total expenses) for a user.
    private BigDecimal totalIncome;

    private BigDecimal totalExpenses;

    private BigDecimal balance;
}