package com.expensehub.backend.dto;

import lombok.Data;

@Data
// Only these profile fields can be changed in an update request.
//because email and password are not updatable, they are not included in this DTO.
public class UpdateUserRequest {
    
    private String name;

    private String address;
}
