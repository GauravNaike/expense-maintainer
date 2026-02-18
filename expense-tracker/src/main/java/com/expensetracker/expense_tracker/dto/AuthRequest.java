package com.expensetracker.expense_tracker.dto;

public record AuthRequest(
        String email,
        String password
) {
}
