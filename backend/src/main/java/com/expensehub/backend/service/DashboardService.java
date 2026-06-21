package com.expensehub.backend.service;

import com.expensehub.backend.dto.DashboardResponse;
import com.expensehub.backend.dto.MonthlyDashboardResponse;
import com.expensehub.backend.dto.TransactionDto;

import java.util.List;

public interface DashboardService {

    // Implementing the getSummary method to retrieve a summary of the user's financial data for the dashboard.
    // It takes the user's email as input and returns a DashboardResponse object containing the total income
    DashboardResponse getSummary(
            String email
    );

    List<TransactionDto> getRecentTransactions(String email, int limit);

    MonthlyDashboardResponse getMonthlySummary(String email, String yearMonth);
}