package com.expensehub.backend.controller;

import com.expensehub.backend.dto.*;
import com.expensehub.backend.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@RequiredArgsConstructor
public class IncomeController {

    // The IncomeController handles HTTP requests related to income management, such as creating, retrieving, updating, and deleting income records for authenticated users.
    private final IncomeService incomeService;

    @PostMapping
    public IncomeResponse createIncome(
            @RequestBody CreateIncomeRequest request,
            Authentication authentication
    ) {

        return incomeService.createIncome(
                request,
                authentication.getName()
        );
    }

    @GetMapping
    public List<IncomeResponse> getAllIncome(
            Authentication authentication
    ) {

        return incomeService.getAllIncome(
                authentication.getName()
        );
    }

    @GetMapping("/{id}")
    public IncomeResponse getIncomeById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        return incomeService.getIncomeById(
                id,
                authentication.getName()
        );
    }

    @PutMapping("/{id}")
    public IncomeResponse updateIncome(
            @PathVariable Long id,
            @RequestBody UpdateIncomeRequest request,
            Authentication authentication
    ) {

        return incomeService.updateIncome(
                id,
                request,
                authentication.getName()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(
            @PathVariable Long id,
            Authentication authentication
    ) {

        incomeService.deleteIncome(
                id,
                authentication.getName()
        );
    }
}