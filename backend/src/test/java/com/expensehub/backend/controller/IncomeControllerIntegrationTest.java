package com.expensehub.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.expensehub.backend.dto.CreateIncomeRequest;
import com.expensehub.backend.dto.UpdateIncomeRequest;
import com.expensehub.backend.entity.Income;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.repository.IncomeRepository;
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
class IncomeControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private User user;

    @BeforeEach
    void setUp() {
        incomeRepository.deleteAll();
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
    void createIncome_Success() throws Exception {
        CreateIncomeRequest request = new CreateIncomeRequest();
        request.setSource("Freelance");
        request.setAmount(new BigDecimal("500.00"));
        request.setIncomeDate(LocalDate.now());
        request.setDescription("Website design");

        mockMvc.perform(post("/api/income")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.source").value("Freelance"))
                .andExpect(jsonPath("$.amount").value(500.00));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void getAllIncome_Success() throws Exception {
        Income income = Income.builder()
                .source("Freelance")
                .amount(new BigDecimal("500.00"))
                .incomeDate(LocalDate.now())
                .description("Website design")
                .user(user)
                .build();
        incomeRepository.save(income);

        mockMvc.perform(get("/api/income"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].source").value("Freelance"));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void getIncomeById_Success() throws Exception {
        Income income = Income.builder()
                .source("Freelance")
                .amount(new BigDecimal("500.00"))
                .incomeDate(LocalDate.now())
                .description("Website design")
                .user(user)
                .build();
        income = incomeRepository.save(income);

        mockMvc.perform(get("/api/income/" + income.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.source").value("Freelance"));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void updateIncome_Success() throws Exception {
        Income income = Income.builder()
                .source("Freelance")
                .amount(new BigDecimal("500.00"))
                .incomeDate(LocalDate.now())
                .description("Website design")
                .user(user)
                .build();
        income = incomeRepository.save(income);

        UpdateIncomeRequest request = new UpdateIncomeRequest();
        request.setSource("Consulting");
        request.setAmount(new BigDecimal("1200.00"));
        request.setIncomeDate(LocalDate.now());
        request.setDescription("Website design");

        mockMvc.perform(put("/api/income/" + income.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.source").value("Consulting"))
                .andExpect(jsonPath("$.amount").value(1200.00));
    }

    @Test
    @WithMockUser(username = "alice@example.com")
    void deleteIncome_Success() throws Exception {
        Income income = Income.builder()
                .source("Freelance")
                .amount(new BigDecimal("500.00"))
                .incomeDate(LocalDate.now())
                .description("Website design")
                .user(user)
                .build();
        income = incomeRepository.save(income);

        mockMvc.perform(delete("/api/income/" + income.getId()))
                .andExpect(status().isOk());
    }
}
