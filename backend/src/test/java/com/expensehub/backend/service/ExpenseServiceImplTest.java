package com.expensehub.backend.service;

import com.expensehub.backend.dto.CreateExpenseRequest;
import com.expensehub.backend.dto.ExpenseResponse;
import com.expensehub.backend.dto.UpdateExpenseRequest;
import com.expensehub.backend.entity.Expense;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.repository.ExpenseRepository;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.impl.ExpenseServiceImpl;
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

class ExpenseServiceImplTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ExpenseServiceImpl expenseService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createExpense_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        CreateExpenseRequest request = new CreateExpenseRequest();
        request.setTitle("Lunch");
        request.setAmount(new BigDecimal("15.50"));
        request.setCategory("Food");
        request.setExpenseDate(LocalDate.now());
        request.setDescription("Healthy lunch");

        Expense expense = Expense.builder()
                .id(10L)
                .title("Lunch")
                .amount(new BigDecimal("15.50"))
                .category("Food")
                .expenseDate(request.getExpenseDate())
                .description("Healthy lunch")
                .user(user)
                .build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(expenseRepository.save(any(Expense.class))).thenReturn(expense);

        ExpenseResponse response = expenseService.createExpense(request, "john@example.com");

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Lunch", response.getTitle());
        assertEquals(new BigDecimal("15.50"), response.getAmount());
    }

    @Test
    void getAllExpenses_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Expense e1 = Expense.builder().id(1L).title("Lunch").amount(new BigDecimal("15")).user(user).build();
        Expense e2 = Expense.builder().id(2L).title("Uber").amount(new BigDecimal("20")).user(user).build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(expenseRepository.findByUser(user)).thenReturn(Arrays.asList(e1, e2));

        List<ExpenseResponse> list = expenseService.getAllExpenses("john@example.com");

        assertEquals(2, list.size());
        assertEquals("Lunch", list.get(0).getTitle());
    }

    @Test
    void getExpenseById_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Expense expense = Expense.builder().id(10L).title("Lunch").user(user).build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(expenseRepository.findByIdAndUser(10L, user)).thenReturn(Optional.of(expense));

        ExpenseResponse response = expenseService.getExpenseById(10L, "john@example.com");

        assertNotNull(response);
        assertEquals("Lunch", response.getTitle());
    }

    @Test
    void updateExpense_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Expense expense = Expense.builder().id(10L).title("Lunch").amount(new BigDecimal("10")).user(user).build();

        UpdateExpenseRequest request = new UpdateExpenseRequest();
        request.setTitle("Dinner");
        request.setAmount(new BigDecimal("25"));

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(expenseRepository.findByIdAndUser(10L, user)).thenReturn(Optional.of(expense));
        when(expenseRepository.save(any(Expense.class))).thenAnswer(inv -> inv.getArgument(0));

        ExpenseResponse response = expenseService.updateExpense(10L, request, "john@example.com");

        assertEquals("Dinner", response.getTitle());
        assertEquals(new BigDecimal("25"), response.getAmount());
    }

    @Test
    void deleteExpense_Success() {
        User user = User.builder().id(1L).email("john@example.com").build();
        Expense expense = Expense.builder().id(10L).user(user).build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(expenseRepository.findByIdAndUser(10L, user)).thenReturn(Optional.of(expense));

        expenseService.deleteExpense(10L, "john@example.com");

        verify(expenseRepository, times(1)).delete(expense);
    }
}
