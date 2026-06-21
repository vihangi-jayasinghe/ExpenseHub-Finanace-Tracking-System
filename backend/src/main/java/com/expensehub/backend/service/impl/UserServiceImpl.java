package com.expensehub.backend.service.impl;
import com.expensehub.backend.dto.*;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.exception.ResourceNotFoundException;
import com.expensehub.backend.exception.UnauthorizedException;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.service.UserService;
import com.expensehub.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        

        // Implementing the createUser method to create a new user.
        // It takes a RegisterUserRequest object as input, which contains the user's name, email, address, and password. 
        // The password is encoded before saving the user to the database.
        @Override
        public UserResponse createUser(
                RegisterUserRequest request
        ) {

                User user =
                        User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .address(request.getAddress())
                                .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                                )
                                .build();

                User saved =
                        userRepository.save(user);

                return map(saved);
        }

        // Implementing the getUserById method to retrieve a user by their ID. 
        // If the user is not found, a ResourceNotFoundException is thrown.
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

        // Implementing the getAllUsers method to retrieve all users from the database.
        @Override
        public List<UserResponse>
        getAllUsers() {

                return userRepository.findAll()
                        .stream()
                        .map(this::map)
                        .toList();
        }

        // Implementing the updateUser method to update an existing user's information.
        // It takes the user's ID and an UpdateUserRequest object as input.
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

        // Implementing the deleteUser method to delete a user by their ID.
        // If the user is not found, a ResourceNotFoundException is thrown.
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

        // Implementing a private map method to convert a User entity to a UserResponse DTO.
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

        // Implementing the login method to authenticate a user based on their email and password.
        // It checks if the user exists and if the provided password matches the stored password.
        @Override
        public String login(LoginRequest request) {

                User user = userRepository
                        .findByEmail(request.getEmail())
                                .orElseThrow(() ->
                                        new UnauthorizedException(
                                                "Invalid credentials"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return jwtService.generateToken(
                user.getEmail());
        }

        // Implementing the getUserByEmail method to retrieve a user by their email address.
        // If the user is not found, a ResourceNotFoundException is thrown.
        @Override
        public UserResponse getUserByEmail(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        return map(user);
        }
}
