package com.expensehub.backend.repository;

import com.expensehub.backend.entity.Expense;
import com.expensehub.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);

    Optional<Expense> findByIdAndUser(
            Long id,
            User user
    );
}
