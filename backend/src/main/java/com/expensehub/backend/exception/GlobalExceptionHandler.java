package com.expensehub.backend.exception;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

        //Implementing a global exception handler to catch ResourceNotFoundException and return a standardized error response with a 404 Not Found status.
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleNotFound(
                ResourceNotFoundException ex) {

                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(
                                ErrorResponse.builder()
                                        .timestamp(LocalDateTime.now())
                                        .status(404)
                                        .error("NOT_FOUND")
                                        .message(ex.getMessage())
                                        .build()
                        );
        }

        // Implementing a global exception handler to catch any unhandled exceptions and 
        // return a standardized error response with a 500 Internal Server Error status.
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleException(
                Exception ex) {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(
                                ErrorResponse.builder()
                                        .timestamp(LocalDateTime.now())
                                        .status(500)
                                        .error("INTERNAL_SERVER_ERROR")
                                        .message(ex.getMessage())
                                        .build()
                        );
        }

        // Implementing a global exception handler to catch validation errors (MethodArgumentNotValidException) and return a map of field errors with a 400 Bad Request status.
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, String>> handleValidation(
                MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        ));

        return ResponseEntity.badRequest()
                .body(errors);
        }
}