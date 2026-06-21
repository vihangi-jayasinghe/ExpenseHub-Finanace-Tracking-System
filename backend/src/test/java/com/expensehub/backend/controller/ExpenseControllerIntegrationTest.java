package com.expensehub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.expensehub.backend.dto.CreateExpenseRequest;
import com.expensehub.backend.dto.UpdateExpenseRequest;
import com.expensehub.backend.entity.Expense;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.repository.ExpenseRepository;
import com.expensehub.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ExpenseControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private User user;

    @BeforeEach
    void setUp() {
        expenseRepository.deleteAll();
        userRepository.deleteAll();

        user = User.builder()
                .name("Alice")
                .email("alice@example.com")
                .address("Colombo")
                .password("password")
                .build();
        user = userRepository.save(user);
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void createExpense_Success() throws Exception {
        CreateExpenseRequest request = new CreateExpenseRequest();
        request.setTitle("Office Supplies");
        request.setAmount(new BigDecimal("45.50"));
        request.setCategory("Shopping");
        request.setExpenseDate(LocalDate.now());
        request.setDescription("Pens and notebooks");

        mockMvc.perform(post("/api/expenses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Office Supplies"))
                .andExpect(jsonPath("$.amount").value(45.50));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void getAllExpenses_Success() throws Exception {
        Expense expense = Expense.builder()
                .title("Office Supplies")
                .amount(new BigDecimal("45.50"))
                .category("Shopping")
                .expenseDate(LocalDate.now())
                .description("Pens and notebooks")
                .user(user)
                .build();
        expenseRepository.save(expense);

        mockMvc.perform(get("/api/expenses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Office Supplies"));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void getExpense_Success() throws Exception {
        Expense expense = Expense.builder()
                .title("Office Supplies")
                .amount(new BigDecimal("45.50"))
                .category("Shopping")
                .expenseDate(LocalDate.now())
                .description("Pens and notebooks")
                .user(user)
                .build();
        expense = expenseRepository.save(expense);

        mockMvc.perform(get("/api/expenses/" + expense.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Office Supplies"));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void updateExpense_Success() throws Exception {
        Expense expense = Expense.builder()
                .title("Office Supplies")
                .amount(new BigDecimal("45.50"))
                .category("Shopping")
                .expenseDate(LocalDate.now())
                .description("Pens and notebooks")
                .user(user)
                .build();
        expense = expenseRepository.save(expense);

        UpdateExpenseRequest request = new UpdateExpenseRequest();
        request.setTitle("Premium Office Supplies");
        request.setAmount(new BigDecimal("60.00"));
        request.setCategory("Shopping");
        request.setExpenseDate(LocalDate.now());
        request.setDescription("Pens and notebooks");

        mockMvc.perform(put("/api/expenses/" + expense.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Premium Office Supplies"))
                .andExpect(jsonPath("$.amount").value(60.00));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void deleteExpense_Success() throws Exception {
        Expense expense = Expense.builder()
                .title("Office Supplies")
                .amount(new BigDecimal("45.50"))
                .category("Shopping")
                .expenseDate(LocalDate.now())
                .description("Pens and notebooks")
                .user(user)
                .build();
        expense = expenseRepository.save(expense);

        mockMvc.perform(delete("/api/expenses/" + expense.getId()))
                .andExpect(status().isOk());
    }
}
