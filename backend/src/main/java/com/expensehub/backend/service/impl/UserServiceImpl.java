package com.expensehub.backend.service.impl;
import com.expensehub.backend.dto.*;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.exception.ResourceNotFoundException;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public UserResponse createUser(
            RegisterUserRequest request
    ) {

        User user =
                User.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .address(request.getAddress())
                        .password(request.getPassword())
                        .build();

        User saved =
                userRepository.save(user);

        return map(saved);
    }

    @Override
    public UserResponse getUserById(
            Long id
    ) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                ));

        return map(user);
    }

    @Override
    public List<UserResponse>
    getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public UserResponse updateUser(
            Long id,
            UpdateUserRequest request
    ) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                ));

        user.setName(request.getName());
        user.setAddress(request.getAddress());

        User updated =
                userRepository.save(user);

        return map(updated);
    }

    @Override
    public void deleteUser(Long id) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                ));

        userRepository.delete(user);
    }

    private UserResponse map(
            User user
    ) {

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .address(user.getAddress())
                .build();
    }
}
