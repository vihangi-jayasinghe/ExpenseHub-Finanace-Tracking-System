package com.expensehub.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    // Implementing a LoginRequest class to represent the request data for user login.
    @Email
    private String email;

    @NotBlank
    private String password;
}
