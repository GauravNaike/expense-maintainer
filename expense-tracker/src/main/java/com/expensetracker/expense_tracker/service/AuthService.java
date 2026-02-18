package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.AuthRequest;
import com.expensetracker.expense_tracker.dto.AuthResponse;
import com.expensetracker.expense_tracker.dto.RegisterRequest;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.UserRepository;
import com.expensetracker.expense_tracker.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }


        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getName());
    }

    public AuthResponse login(AuthRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getName());
    }

}
