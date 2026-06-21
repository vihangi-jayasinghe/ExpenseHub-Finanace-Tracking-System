package com.expensehub.backend.service;

import com.expensehub.backend.dto.DashboardResponse;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.repository.ExpenseRepository;
import com.expensehub.backend.repository.IncomeRepository;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.impl.DashboardServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DashboardServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private IncomeRepository incomeRepository;

    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private DashboardServiceImpl dashboardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getSummary_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(incomeRepository.getTotalIncome(user)).thenReturn(new BigDecimal("5000"));
        when(expenseRepository.getTotalExpenses(user)).thenReturn(new BigDecimal("2000"));

        DashboardResponse summary = dashboardService.getSummary("john@example.com");

        assertNotNull(summary);
        assertEquals(new BigDecimal("5000"), summary.getTotalIncome());
        assertEquals(new BigDecimal("2000"), summary.getTotalExpenses());
        assertEquals(new BigDecimal("3000"), summary.getBalance());
    }
}
