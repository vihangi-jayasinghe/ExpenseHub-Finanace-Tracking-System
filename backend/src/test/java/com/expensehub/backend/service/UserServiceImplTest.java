package com.expensehub.backend.service;

import com.expensehub.backend.dto.LoginRequest;
import com.expensehub.backend.dto.RegisterUserRequest;
import com.expensehub.backend.dto.UpdateUserRequest;
import com.expensehub.backend.dto.UserResponse;
import com.expensehub.backend.entity.User;
import com.expensehub.backend.exception.ResourceNotFoundException;
import com.expensehub.backend.repository.UserRepository;
import com.expensehub.backend.security.JwtService;
import com.expensehub.backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private OtpService otpService;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_Success() {
        RegisterUserRequest request = new RegisterUserRequest();
        request.setName("John Doe");
        request.setEmail("john@example.com");
        request.setAddress("123 Street");
        request.setPassword("password");

        User user = User.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .address("123 Street")
                .password("encoded_password")
                .build();

        when(passwordEncoder.encode(any())).thenReturn("encoded_password");
        when(userRepository.save(any())).thenReturn(user);

        UserResponse response = userService.createUser(request);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("John Doe", response.getName());
        assertEquals("john@example.com", response.getEmail());
        verify(userRepository, times(1)).save(any());
    }

    @Test
    void getUserById_Success() {
        User user = User.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .address("123 Street")
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        UserResponse response = userService.getUserById(1L);

        assertNotNull(response);
        assertEquals("John Doe", response.getName());
    }

    @Test
    void getUserById_NotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(1L));
    }

    @Test
    void getAllUsers_Success() {
        User user1 = User.builder().id(1L).name("User 1").email("user1@example.com").build();
        User user2 = User.builder().id(2L).name("User 2").email("user2@example.com").build();

        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<UserResponse> users = userService.getAllUsers();

        assertEquals(2, users.size());
        assertEquals("User 1", users.get(0).getName());
        assertEquals("User 2", users.get(1).getName());
    }

    @Test
    void updateUser_Success() {
        User user = User.builder()
                .id(1L)
                .name("John Old")
                .address("Old Address")
                .email("john@example.com")
                .build();

        UpdateUserRequest request = new UpdateUserRequest();
        request.setName("John New");
        request.setAddress("New Address");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.updateUser(1L, request);

        assertEquals("John New", response.getName());
        assertEquals("New Address", response.getAddress());
    }

    @Test
    void deleteUser_Success() {
        User user = User.builder().id(1L).build();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        userService.deleteUser(1L);

        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void login_Success() {
        LoginRequest request = new LoginRequest();
        request.setEmail("john@example.com");
        request.setPassword("password");
        User user = User.builder()
                .email("john@example.com")
                .password("encoded_password")
                .build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encoded_password")).thenReturn(true);
        when(jwtService.generateToken("john@example.com")).thenReturn("mocked_token");

        String token = userService.login(request);

        assertEquals("mocked_token", token);
    }

    @Test
    void login_InvalidCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("john@example.com");
        request.setPassword("wrong_password");
        User user = User.builder()
                .email("john@example.com")
                .password("encoded_password")
                .build();

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong_password", "encoded_password")).thenReturn(false);

        assertThrows(RuntimeException.class, () -> userService.login(request));
    }

    @Test
    void processForgotPassword_Success() {
        User user = User.builder().email("john@example.com").build();
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));

        userService.processForgotPassword("john@example.com");

        verify(otpService, times(1)).generateOtp("john@example.com");
    }

    @Test
    void resetPassword_Success() {
        User user = User.builder().email("john@example.com").password("old_pass").build();
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(otpService.verifyOtp("john@example.com", "123456")).thenReturn(true);
        when(passwordEncoder.encode("new_pass")).thenReturn("encoded_new_pass");

        userService.resetPassword("john@example.com", "123456", "new_pass");

        verify(userRepository, times(1)).save(user);
        assertEquals("encoded_new_pass", user.getPassword());
    }

    @Test
    void resetPassword_InvalidOtp() {
        User user = User.builder().email("john@example.com").build();
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(otpService.verifyOtp("john@example.com", "wrong")).thenReturn(false);

        assertThrows(RuntimeException.class, () -> userService.resetPassword("john@example.com", "wrong", "new_pass"));
    }
}
