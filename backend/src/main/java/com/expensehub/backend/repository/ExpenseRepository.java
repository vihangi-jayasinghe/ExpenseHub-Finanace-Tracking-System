package com.expensehub.backend.repository;

import com.expensehub.backend.entity.Expense;
import com.expensehub.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);

    Optional<Expense> findByIdAndUser(
            Long id,
            User user
    );

    // Adding a custom query method to calculate the total expense for a 
    // specific user by summing the amount of all expense entries associated with that user.
   @Query("""
        SELECT COALESCE(SUM(e.amount),0)
        FROM Expense e
        WHERE e.user = :user
    """)
    BigDecimal getTotalExpenses(
        @Param("user") User user
    );
}
