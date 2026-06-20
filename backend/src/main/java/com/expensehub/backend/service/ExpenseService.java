package com.expensehub.backend.service;

import com.expensehub.backend.dto.*;

import java.util.List;

public interface ExpenseService {

    // Implementing the methods defined in the ExpenseService interface to handle expense-related operations
    // such as creating, retrieving, updating, and deleting expenses.
    ExpenseResponse createExpense(
            CreateExpenseRequest request,
            String email
    );

    List<ExpenseResponse> getAllExpenses(
            String email
    );

    ExpenseResponse getExpenseById(
            Long id,
            String email
    );

    ExpenseResponse updateExpense(
            Long id,
            UpdateExpenseRequest request,
            String email
    );

    void deleteExpense(
            Long id,
            String email
    );
}