import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await getExpenses();
            setExpenses(res.data.content); // because backend returns Page<>
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Expense List</h2>

            {expenses.length === 0 ? (
                <p>No expenses yet...</p>
            ) : (
                <div className="space-y-4">
                    {expenses.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-purple-700 p-4 rounded-xl flex justify-between"
                        >
                            <div>
                                <p className="font-bold">₹ {exp.amount}</p>
                                <p>{exp.category}</p>
                                <p>{exp.description}</p>
                            </div>
                            <p>{exp.date}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
