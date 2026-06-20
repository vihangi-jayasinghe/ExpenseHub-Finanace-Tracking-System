package com.expensehub.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    // Implementing a UserResponse class to represent the response data for user-related operations.
    private Long id;

    private String name;

    private String email;

    private String address;
}
