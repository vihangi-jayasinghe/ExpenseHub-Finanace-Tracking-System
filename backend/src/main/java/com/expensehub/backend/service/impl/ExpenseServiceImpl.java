package com.expensehub.backend.service.impl;

import com.expensehub.backend.dto.*;
import com.expensehub.backend.entity.Expense;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.exception.ResourceNotFoundException;
import com.expensehub.backend.repository.ExpenseRepository;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl
        implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    // Implementing the createExpense method to create a new expense associated with a specific user identified by their email address.
    // It takes a CreateExpenseRequest object as input, which contains the expense's title, amount, category, expense date, and description.
    // If the user is not found, a ResourceNotFoundException is thrown.
    @Override
    public ExpenseResponse createExpense(
            CreateExpenseRequest request,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Expense expense =
                Expense.builder()
                        .title(request.getTitle())
                        .amount(request.getAmount())
                        .category(request.getCategory())
                        .expenseDate(request.getExpenseDate())
                        .description(request.getDescription())
                        .user(user)
                        .build();

        Expense saved =
                expenseRepository.save(expense);

        return map(saved);
    }

    // Implementing the getAllExpenses method to retrieve all expenses associated with a specific user identified by their email address.
    // If the user is not found, a ResourceNotFoundException is thrown.
    @Override
    public List<ExpenseResponse>
    getAllExpenses(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        return expenseRepository.findByUser(user)
                .stream()
                .map(this::map)
                .toList();
    }

    // Implementing the getExpenseById method to retrieve an expense by its ID and the user's email.
    // If the user or expense is not found, a ResourceNotFoundException is thrown.
    @Override
    public ExpenseResponse getExpenseById(
            Long id,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Expense expense =
                expenseRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Expense not found"));

        return map(expense);
    }

    // Implementing the updateExpense method to update an existing expense's information.
    // It takes the expense's ID, an UpdateExpenseRequest object, and the user's email as input. 
    // If the user or expense is not found, a ResourceNotFoundException is thrown.
    @Override
    public ExpenseResponse updateExpense(
            Long id,
            UpdateExpenseRequest request,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Expense expense =
                expenseRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Expense not found"));

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setDescription(request.getDescription());

        Expense updated =
                expenseRepository.save(expense);

        return map(updated);
    }

    // Implementing the deleteExpense method to delete an expense by its ID and the user's email.
    // If the user or expense is not found, a ResourceNotFoundException is thrown.
    @Override
    public void deleteExpense(
            Long id,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Expense expense =
                expenseRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Expense not found"));

        expenseRepository.delete(expense);
    }

    private ExpenseResponse map(
            Expense expense
    ) {

        return ExpenseResponse.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .category(expense.getCategory())
                .expenseDate(expense.getExpenseDate())
                .description(expense.getDescription())
                .build();
    }
}