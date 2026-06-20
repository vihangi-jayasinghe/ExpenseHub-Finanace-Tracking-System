package com.expensehub.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterUserRequest {
    // Implementing a RegisterUserRequest class to represent the request data for user registration.
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    private String address;

    @Size(min = 6)
    private String password;
}
