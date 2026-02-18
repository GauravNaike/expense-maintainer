import { useState, useEffect } from "react";
import { getExpenses } from "../services/api";

export default function Filter() {
    const [category, setCategory] = useState("");
    const [expenses, setExpenses] = useState([]);

    // 🔥 Load all expenses automatically when Filter page opens
    useEffect(() => {
        fetchAllExpenses();
    }, []);

    const fetchAllExpenses = async () => {
        try {
            const res = await getExpenses(); // no category → all expenses
            setExpenses(res.data.content);
        } catch (error) {
            console.error("Error loading expenses:", error);
        }
    };

    const handleFilter = async () => {
        try {
            if (!category.trim()) {
                // If empty → show all again
                fetchAllExpenses();
                return;
            }

            const res = await getExpenses(category);
            setExpenses(res.data.content);
        } catch (error) {
            console.error("Filter error:", error.response?.data || error);
        }
    };

    const handleReset = () => {
        setCategory("");
        fetchAllExpenses();
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Filter Expenses</h2>

            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 rounded text-black w-64"
                />

                <button
                    onClick={handleFilter}
                    className="bg-white text-purple-800 px-6 py-2 rounded font-bold"
                >
                    Apply Filter
                </button>

                <button
                    onClick={handleReset}
                    className="bg-gray-300 text-black px-6 py-2 rounded font-bold"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-4">
                {expenses.length === 0 ? (
                    <p>No expenses found</p>
                ) : (
                    expenses.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-purple-700 p-4 rounded-xl"
                        >
                            ₹ {exp.amount} — {exp.category} — {exp.description}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
