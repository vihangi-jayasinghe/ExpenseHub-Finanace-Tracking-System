package com.expensehub.backend.service;

import com.expensehub.backend.dto.CreateIncomeRequest;
import com.expensehub.backend.dto.IncomeResponse;
import com.expensehub.backend.dto.UpdateIncomeRequest;
import com.expensehub.backend.entity.Income;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.repository.IncomeRepository;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.impl.IncomeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class IncomeServiceImplTest {

    @Mock
    private IncomeRepository incomeRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private IncomeServiceImpl incomeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createIncome_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        CreateIncomeRequest request = new CreateIncomeRequest();
        request.setSource("Salary");
        request.setAmount(new BigDecimal("3000"));
        request.setIncomeDate(LocalDate.now());
        request.setDescription("Monthly salary");

        Income income = Income.builder()
                .id(10L)
                .source("Salary")
                .amount(new BigDecimal("3000"))
                .incomeDate(request.getIncomeDate())
                .description("Monthly salary")
                .user(user)
                .build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(incomeRepository.save(any(Income.class))).thenReturn(income);

        IncomeResponse response = incomeService.createIncome(request, "john@example.com");

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Salary", response.getSource());
        assertEquals(new BigDecimal("3000"), response.getAmount());
    }

    @Test
    void getAllIncomes_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Income i1 = Income.builder().id(1L).source("Salary").amount(new BigDecimal("3000")).user(user).build();
        Income i2 = Income.builder().id(2L).source("Freelance").amount(new BigDecimal("500")).user(user).build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(incomeRepository.findByUser(user)).thenReturn(Arrays.asList(i1, i2));

        List<IncomeResponse> list = incomeService.getAllIncome("john@example.com");

        assertEquals(2, list.size());
        assertEquals("Salary", list.get(0).getSource());
    }

    @Test
    void getIncomeById_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Income income = Income.builder().id(10L).source("Salary").user(user).build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(incomeRepository.findByIdAndUser(10L, user)).thenReturn(Optional.of(income));

        IncomeResponse response = incomeService.getIncomeById(10L, "john@example.com");

        assertNotNull(response);
        assertEquals("Salary", response.getSource());
    }

    @Test
    void updateIncome_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Income income = Income.builder().id(10L).source("Salary").amount(new BigDecimal("3000")).user(user).build();

        UpdateIncomeRequest request = new UpdateIncomeRequest();
        request.setSource("Bonus");
        request.setAmount(new BigDecimal("3500"));

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(incomeRepository.findByIdAndUser(10L, user)).thenReturn(Optional.of(income));
        when(incomeRepository.save(any(Income.class))).thenAnswer(inv -> inv.getArgument(0));

        IncomeResponse response = incomeService.updateIncome(10L, request, "john@example.com");

        assertEquals("Bonus", response.getSource());
        assertEquals(new BigDecimal("3500"), response.getAmount());
    }

    @Test
    void deleteIncome_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Income income = Income.builder().id(10L).user(user).build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(incomeRepository.findByIdAndUser(10L, user)).thenReturn(Optional.of(income));

        incomeService.deleteIncome(10L, "john@example.com");

        verify(incomeRepository, times(1)).delete(income);
    }
}
