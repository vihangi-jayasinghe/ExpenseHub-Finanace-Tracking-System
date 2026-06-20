package com.expensehub.backend.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String name;

    private String address;
}
