package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.config.ModelMapperConfig;
import com.expensetracker.expense_tracker.dto.ExpenseRequest;
import com.expensetracker.expense_tracker.dto.ExpenseResponse;
import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;
import com.expensetracker.expense_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseResponse createExpense(ExpenseRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = Expense.builder()
                .amount(request.amount())
                .category(request.category())
                .description(request.description())
                .date(request.date())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        Expense saved = expenseRepository.save(expense);

        return mapToResponse(saved);
    }

    public Page<ExpenseResponse> getExpense(
            String category, String sort, int page, int size) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Sort sorting = "date_desc".equalsIgnoreCase(sort)
                ? Sort.by(Sort.Direction.DESC, "date")
                : Sort.unsorted();

        Pageable pageable = PageRequest.of(page, size, sorting);

        Page<Expense> expensePage;

        if (category != null && !category.isBlank()) {
            expensePage = expenseRepository.findByUserAndCategoryIgnoreCase(user, category, pageable);
        } else {
             expensePage = expenseRepository.findByUser(user, pageable);
        }

        return expensePage.map(this::mapToResponse);
    }

    public BigDecimal getTotal(String category) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (category == null || category.isBlank()) {
            return expenseRepository.getTotalAmount(user);
        }

        return expenseRepository.getTotalAmountByCategory(user, category);
    }

    private ExpenseResponse mapToResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getDate(),
                expense.getCreatedAt()
        );
    }
}
