package com.expensehub.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private String id; // prefixed with exp- or inc-
    private String title;
    private BigDecimal amount;
    private LocalDate date;
    private String type; // "income" or "expense"
    private String category;
    private String description;
}
