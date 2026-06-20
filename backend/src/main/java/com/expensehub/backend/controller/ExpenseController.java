package com.expensehub.backend.controller;

import com.expensehub.backend.dto.*;
import com.expensehub.backend.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    // The ExpenseController handles expense-related endpoints, such as creating, retrieving, updating, and deleting expenses.
    private final ExpenseService expenseService;

    @PostMapping
    public ExpenseResponse createExpense(
            @RequestBody CreateExpenseRequest request,
            Authentication authentication
    ) {

        return expenseService.createExpense(
                request,
                authentication.getName()
        );
    }

    @GetMapping
    public List<ExpenseResponse> getAllExpenses(
            Authentication authentication
    ) {

        return expenseService.getAllExpenses(
                authentication.getName()
        );
    }

    @GetMapping("/{id}")
    public ExpenseResponse getExpense(
            @PathVariable Long id,
            Authentication authentication
    ) {

        return expenseService.getExpenseById(
                id,
                authentication.getName()
        );
    }

    @PutMapping("/{id}")
    public ExpenseResponse updateExpense(
            @PathVariable Long id,
            @RequestBody UpdateExpenseRequest request,
            Authentication authentication
    ) {

        return expenseService.updateExpense(
                id,
                request,
                authentication.getName()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(
            @PathVariable Long id,
            Authentication authentication
    ) {

        expenseService.deleteExpense(
                id,
                authentication.getName()
        );
    }
}