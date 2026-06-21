package com.expensehub.backend.exception;

public class ResourceNotFoundException extends RuntimeException{
    // Implementing a custom exception class named ResourceNotFoundException that extends RuntimeException.
    public ResourceNotFoundException(
            String message
    ) {
        super(message);
    }
}
