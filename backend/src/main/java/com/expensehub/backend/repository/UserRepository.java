package com.expensehub.backend.repository;

import com.expensehub.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//this interface is used to perform CRUD operations on the User entity in the database. 
//It extends JpaRepository, which provides methods for saving, deleting, and finding User entities.
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
