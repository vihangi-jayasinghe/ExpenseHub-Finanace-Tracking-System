package com.expensehub.backend.service.impl;

import com.expensehub.backend.dto.DashboardResponse;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.exception.ResourceNotFoundException;
import com.expensehub.backend.repository.ExpenseRepository;
import com.expensehub.backend.repository.IncomeRepository;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final UserRepository userRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;

    // Implementing the getSummary method to retrieve a summary of the user's financial data for the dashboard.
    // It takes the user's email as input and returns a DashboardResponse object containing the total income, 
    // total expenses, and balance. If the user is not found, a ResourceNotFoundException is thrown.
    @Override
    public DashboardResponse getSummary(
            String email
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"));

        BigDecimal totalIncome =
                incomeRepository.getTotalIncome(user);

        BigDecimal totalExpenses =
                expenseRepository.getTotalExpenses(user);

        BigDecimal balance =
                totalIncome.subtract(totalExpenses);

        return DashboardResponse.builder()
                .totalIncome(totalIncome)
                .totalExpenses(totalExpenses)
                .balance(balance)
                .build();
    }
}