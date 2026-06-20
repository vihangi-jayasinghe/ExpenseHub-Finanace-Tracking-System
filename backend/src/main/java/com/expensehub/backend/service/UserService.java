package com.expensehub.backend.service;

import com.expensehub.backend.dto.*;

import java.util.List;

public interface UserService {
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
