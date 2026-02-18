package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ExpenseRequest;
import com.expensetracker.expense_tracker.dto.ExpenseResponse;
import com.expensetracker.expense_tracker.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expense")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ExpenseResponse createExpense(@Valid @RequestBody ExpenseRequest request) {

        return expenseService.createExpense(request);
    }

    @GetMapping
    public Page<ExpenseResponse> getExpenses(
                                            @RequestParam(required = false) String category,
                                             @RequestParam(required = false) String sort,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "5") int size) {

        return expenseService.getExpense(category, sort, page, size);
    }

    @GetMapping("/total")
    public BigDecimal getTotal(
            @RequestParam(required = false) String category) {
        return expenseService.getTotal(category);
    }

    @PostMapping("/test")
    public String test() {
        return "Controller Working";
    }
}
