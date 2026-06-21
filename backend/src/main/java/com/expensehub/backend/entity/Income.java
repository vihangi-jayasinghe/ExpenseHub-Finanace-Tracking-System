package com.expensehub.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "income")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Income {

    // The Income entity represents an income record in the system. 
    // It includes fields for the income ID, source of income, amount, date of income, and an optional description. 
    // Each income record is associated with a specific user through a many-to-one relationship.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String source;

    private BigDecimal amount;

    private LocalDate incomeDate;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}