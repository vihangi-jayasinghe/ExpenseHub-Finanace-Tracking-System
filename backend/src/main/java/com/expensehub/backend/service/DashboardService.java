package com.expensehub.backend.service;

import com.expensehub.backend.dto.DashboardResponse;

public interface DashboardService {

    // Implementing the getSummary method to retrieve a summary of the user's financial data for the dashboard.
    // It takes the user's email as input and returns a DashboardResponse object containing the total income
    DashboardResponse getSummary(
            String email
    );
}