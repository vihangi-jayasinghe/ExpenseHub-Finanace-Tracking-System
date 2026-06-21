package com.expensehub.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterUserRequest {
    // Implementing a RegisterUserRequest class to represent the request data for user registration.
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Address is required")
    private String address;

    @Size(min = 6)
    @NotBlank(message = "Password is required")
    private String password;
}
