package com.expensehub.backend.service;

import com.expensehub.backend.dto.*;

import java.util.List;

public interface UserService {
    // Implementing the methods defined in the UserService interface to handle user-related operations 
    // such as creating, retrieving, updating, and deleting users.
    UserResponse createUser(
            RegisterUserRequest request
    );

    UserResponse getUserById(Long id);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(
            Long id,
            UpdateUserRequest request
    );

    void deleteUser(Long id);
}
