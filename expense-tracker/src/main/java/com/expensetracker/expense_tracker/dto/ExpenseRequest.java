package com.expensetracker.expense_tracker.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    BigDecimal amount,

    @NotNull
    String category,

    String description,

    @NotNull
    LocalDate date

){}
