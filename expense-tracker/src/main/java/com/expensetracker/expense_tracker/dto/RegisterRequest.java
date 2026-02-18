package com.expensetracker.expense_tracker.dto;

public record RegisterRequest(
        String name,
        String email,
        String password
) {
}
