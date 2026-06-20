package com.expensehub.backend.controller;

import com.expensehub.backend.dto.DashboardResponse;
import com.expensehub.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    // The DashboardController handles HTTP requests related to the dashboard, such as retrieving a summary of the user's financial data.
    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardResponse getSummary(
            Authentication authentication
    ) {

        return dashboardService.getSummary(
                authentication.getName()
        );
    }
}