package com.expensehub.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyDashboardResponse {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private String highestExpenseCategory;
    private BigDecimal highestExpenseAmount;
}
