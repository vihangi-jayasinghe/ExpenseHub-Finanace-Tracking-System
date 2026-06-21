package com.expensehub.backend.repository;

import com.expensehub.backend.entity.Income;
import com.expensehub.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface IncomeRepository
        extends JpaRepository<Income, Long> {

    // The IncomeRepository interface extends JpaRepository, providing CRUD operations for the Income entity.
    List<Income> findByUser(User user);

    Optional<Income> findByIdAndUser(
            Long id,
            User user
    );

    // Adding a custom query method to calculate the total income for a specific 
    // user by summing the amount of all income entries associated with that user.
    @Query("""
            SELECT COALESCE(SUM(i.amount),0)
            FROM Income i
            WHERE i.user = :user
            """)
    BigDecimal getTotalIncome(
            @Param("user") User user
    );
}