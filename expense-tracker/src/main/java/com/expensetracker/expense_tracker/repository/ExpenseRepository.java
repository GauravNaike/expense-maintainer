package com.expensetracker.expense_tracker.repository;

import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, String> {

    Page<Expense> findByUserAndCategoryIgnoreCase(User user, String category, Pageable pageable);

    Page<Expense> findByUser(User user, Pageable pageable);


    @Query("""
       SELECT COALESCE(SUM(e.amount), 0)
       FROM Expense e
       WHERE e.user = :user
       """)
    BigDecimal getTotalAmount(@Param("user") User user);

    @Query("""
       SELECT COALESCE(SUM(e.amount), 0)
       FROM Expense e
       WHERE e.user = :user
       AND LOWER(e.category) = LOWER(:category)
       """)
    BigDecimal getTotalAmountByCategory(@Param("user") User user,
                                        @Param("category") String category);

}
