package com.expensehub.backend.repository;

import com.expensehub.backend.entity.Income;
import com.expensehub.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

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
}