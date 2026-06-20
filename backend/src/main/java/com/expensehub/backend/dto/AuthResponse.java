package com.expensehub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    //contains the authentication token returned after a successful login.
    private String token;
    
}
