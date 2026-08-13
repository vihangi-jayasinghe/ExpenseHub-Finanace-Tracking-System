package com.expensehub.backend.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    // Defining the User entity class that represents the "users" table in the database.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(
            nullable = false,
            unique = true
    )
    private String email;

    private String address;

    @Column(nullable = false)
    private String password;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL
    )
    private List<Expense> expenses;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL
    )
    private List<Income> incomes;
}