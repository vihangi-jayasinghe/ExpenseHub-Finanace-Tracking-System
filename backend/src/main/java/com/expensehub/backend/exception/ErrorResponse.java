package com.expensehub.backend.exception;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    // This class represents the structure of an error response that can be returned by the API when an exception occurs.
    private LocalDateTime timestamp;

    private int status;

    private String error;

    private String message;
}