package com.expensehub.backend.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    // Handling ResourceNotFoundException and returning a 404 Not Found response with the exception message.
    @ExceptionHandler(
            ResourceNotFoundException.class
    )
    public ResponseEntity<String>
    handleNotFound(
            ResourceNotFoundException ex
    ) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    // Handling generic exceptions and returning a 500 Internal Server Error response with the exception message.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String>
    handleException(Exception ex) {

        return ResponseEntity
                .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                )
                .body(ex.getMessage());
    }
}
