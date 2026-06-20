package com.expensehub.backend.service.impl;

import com.expensehub.backend.dto.*;
import com.expensehub.backend.entity.Income;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.exception.ResourceNotFoundException;
import com.expensehub.backend.repository.IncomeRepository;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl
        implements IncomeService {

    // The IncomeServiceImpl class implements the IncomeService interface, providing methods to manage income entries for users.
    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    // Implementing the createIncome method to create a new income associated with a specific user identified by their email address.
    // It takes a CreateIncomeRequest object as input, which contains the income's source,
    @Override
    public IncomeResponse createIncome(
            CreateIncomeRequest request,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Income income =
                Income.builder()
                        .source(request.getSource())
                        .amount(request.getAmount())
                        .incomeDate(request.getIncomeDate())
                        .description(request.getDescription())
                        .user(user)
                        .build();

        Income saved =
                incomeRepository.save(income);

        return map(saved);
    }

    // Implementing the getAllIncome method to retrieve all income entries associated with a specific user identified by their email address.
    // If the user is not found, a ResourceNotFoundException is thrown.
    @Override
    public List<IncomeResponse> getAllIncome(
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        return incomeRepository.findByUser(user)
                .stream()
                .map(this::map)
                .toList();
    }

    // Implementing the getIncomeById method to retrieve an income by its ID and the user's email.
    // If the user or income is not found, a ResourceNotFoundException is thrown.
    @Override
    public IncomeResponse getIncomeById(
            Long id,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Income income =
                incomeRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Income not found"));

        return map(income);
    }

    // Implementing the updateIncome method to update an existing income's information.
    // It takes the income's ID, an UpdateIncomeRequest object, and the user's email
    @Override
    public IncomeResponse updateIncome(
            Long id,
            UpdateIncomeRequest request,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Income income =
                incomeRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Income not found"));

        income.setSource(request.getSource());
        income.setAmount(request.getAmount());
        income.setIncomeDate(request.getIncomeDate());
        income.setDescription(request.getDescription());

        Income updated =
                incomeRepository.save(income);

        return map(updated);
    }

    // Implementing the deleteIncome method to delete an income by its ID and the user's email.
    // If the user or income is not found, a ResourceNotFoundException is thrown.
    @Override
    public void deleteIncome(
            Long id,
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Income income =
                incomeRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Income not found"));

        incomeRepository.delete(income);
    }

    // Implementing a private map method to convert an Income entity to an IncomeResponse DTO.
    private IncomeResponse map(
            Income income
    ) {

        return IncomeResponse.builder()
                .id(income.getId())
                .source(income.getSource())
                .amount(income.getAmount())
                .incomeDate(income.getIncomeDate())
                .description(income.getDescription())
                .build();
    }
}