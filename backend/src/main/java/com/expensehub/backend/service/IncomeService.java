package com.expensehub.backend.service;

import com.expensehub.backend.dto.*;

import java.util.List;

public interface IncomeService {

    // Defining the methods for managing income entries, including creating, retrieving, updating, and deleting income records associated with a user identified by their email address.
    IncomeResponse createIncome(
            CreateIncomeRequest request,
            String email
    );

    List<IncomeResponse> getAllIncome(
            String email
    );

    IncomeResponse getIncomeById(
            Long id,
            String email
    );

    IncomeResponse updateIncome(
            Long id,
            UpdateIncomeRequest request,
            String email
    );

    void deleteIncome(
            Long id,
            String email
    );
}