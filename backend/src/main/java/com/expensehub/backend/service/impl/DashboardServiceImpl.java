package com.expensehub.backend.service.impl;

import com.expensehub.backend.dto.DashboardResponse;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.exception.ResourceNotFoundException;
import com.expensehub.backend.repository.ExpenseRepository;
import com.expensehub.backend.repository.IncomeRepository;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final UserRepository userRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;

    // Implementing the getSummary method to retrieve a summary of the user's financial data for the dashboard.
    // It takes the user's email as input and returns a DashboardResponse object containing the total income, 
    // total expenses, and balance. If the user is not found, a ResourceNotFoundException is thrown.
    @Override
    public DashboardResponse getSummary(
            String email
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"));

        BigDecimal totalIncome =
                incomeRepository.getTotalIncome(user);

        BigDecimal totalExpenses =
                expenseRepository.getTotalExpenses(user);

        BigDecimal balance =
                totalIncome.subtract(totalExpenses);

        return DashboardResponse.builder()
                .totalIncome(totalIncome)
                .totalExpenses(totalExpenses)
                .balance(balance)
                .build();
    }

    @Override
    public List<com.expensehub.backend.dto.TransactionDto> getRecentTransactions(String email, int limit) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new com.expensehub.backend.exception.ResourceNotFoundException("User not found"));

        List<com.expensehub.backend.dto.TransactionDto> ex = expenseRepository.findByUser(user).stream()
                .map(e -> com.expensehub.backend.dto.TransactionDto.builder()
                        .id("exp-" + e.getId())
                        .title(e.getTitle())
                        .amount(e.getAmount())
                        .date(e.getExpenseDate())
                        .type("expense")
                        .category(e.getCategory())
                        .description(e.getDescription())
                        .build())
                .collect(Collectors.toList());

        List<com.expensehub.backend.dto.TransactionDto> inc = incomeRepository.findByUser(user).stream()
                .map(i -> com.expensehub.backend.dto.TransactionDto.builder()
                        .id("inc-" + i.getId())
                        .title(i.getSource())
                        .amount(i.getAmount())
                        .date(i.getIncomeDate())
                        .type("income")
                        .category("Income")
                        .description(i.getDescription())
                        .build())
                .collect(Collectors.toList());

        return Stream.concat(ex.stream(), inc.stream())
                .filter(t -> t.getDate() != null)
                .sorted(Comparator.comparing(com.expensehub.backend.dto.TransactionDto::getDate).reversed())
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Override
    public com.expensehub.backend.dto.MonthlyDashboardResponse getMonthlySummary(String email, String yearMonth) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new com.expensehub.backend.exception.ResourceNotFoundException("User not found"));

        YearMonth ym = YearMonth.parse(yearMonth);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        List<com.expensehub.backend.entity.Expense> expenses = expenseRepository.findByUser(user).stream()
                .filter(e -> e.getExpenseDate() != null && !e.getExpenseDate().isBefore(start) && !e.getExpenseDate().isAfter(end))
                .collect(Collectors.toList());

        List<com.expensehub.backend.entity.Income> incomes = incomeRepository.findByUser(user).stream()
                .filter(i -> i.getIncomeDate() != null && !i.getIncomeDate().isBefore(start) && !i.getIncomeDate().isAfter(end))
                .collect(Collectors.toList());

        BigDecimal totalInc = incomes.stream().map(i -> i.getAmount() == null ? BigDecimal.ZERO : i.getAmount()).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalExp = expenses.stream().map(e -> e.getAmount() == null ? BigDecimal.ZERO : e.getAmount()).reduce(BigDecimal.ZERO, BigDecimal::add);

        // highest expense category
        Map<String, BigDecimal> catSums = new java.util.HashMap<>();
        for (var e : expenses) {
            String cat = e.getCategory() == null ? "Other" : e.getCategory();
            catSums.put(cat, catSums.getOrDefault(cat, BigDecimal.ZERO).add(e.getAmount() == null ? BigDecimal.ZERO : e.getAmount()));
        }

        String highestCat = "N/A";
        BigDecimal highestAmt = BigDecimal.ZERO;
        for (var entry : catSums.entrySet()) {
            if (entry.getValue().compareTo(highestAmt) > 0) {
                highestAmt = entry.getValue();
                highestCat = entry.getKey();
            }
        }

        return com.expensehub.backend.dto.MonthlyDashboardResponse.builder()
                .totalIncome(totalInc)
                .totalExpenses(totalExp)
                .highestExpenseCategory(highestCat)
                .highestExpenseAmount(highestAmt)
                .build();
    }
}