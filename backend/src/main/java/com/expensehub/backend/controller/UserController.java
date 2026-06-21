package com.expensehub.backend.controller;

import com.expensehub.backend.dto.*;
import com.expensehub.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // Implementing the createUser method to handle the HTTP POST request for creating a new user.
    // It takes a RegisterUserRequest object as input, which contains the user's name, email, address, and password.
    @PostMapping
    public UserResponse createUser(
            @Valid
            @RequestBody
            RegisterUserRequest request
    ) {

        return userService.createUser(
                request
        );
    }

    // Implementing the getProfile method to handle the HTTP GET request for retrieving the profile of the currently authenticated user.
    @GetMapping("/profile")
    public UserResponse getProfile(
            Authentication authentication
    ) {

        return userService.getUserByEmail(
                authentication.getName()
        );
    }

    // Implementing the getUser method to handle the HTTP GET request for retrieving a user by their ID.
    @GetMapping("/id/{id}")
    public UserResponse getUser(
            @PathVariable Long id
    ) {

        return userService.getUserById(id);
    }

    // Implementing the getAllUsers method to handle the HTTP GET request for retrieving all users.
    @GetMapping
    public List<UserResponse>
    getAllUsers() {

        return userService.getAllUsers();
    }

    // Implementing the updateUser method to handle the HTTP PUT request for updating an existing user's information.
    // It takes the user's ID and an UpdateUserRequest object as input.
    @PutMapping("/{id}")
    public UserResponse updateUser(
            @PathVariable Long id,
            @RequestBody
            UpdateUserRequest request
    ) {

        return userService.updateUser(
                id,
                request
        );
    }

    // Implementing the deleteUser method to handle the HTTP DELETE request for deleting a user by their ID.
    @DeleteMapping("/{id}")
    public void deleteUser(
            @PathVariable Long id
    ) {

        userService.deleteUser(id);
    }
}
