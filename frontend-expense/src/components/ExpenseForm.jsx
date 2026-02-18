import { useState } from "react";
import { createExpense } from "../services/api";

export default function ExpenseForm() {
    const [form, setForm] = useState({
        amount: "",
        category: "",
        description: "",
        date: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await createExpense(form);
            alert("Expense Added Successfully ✅");

            setForm({
                amount: "",
                category: "",
                description: "",
                date: "",
            });
        } catch (error) {
            console.error(error);
            alert("Error adding expense ❌");
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 max-w-md space-y-5 shadow-lg">

            <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none transition"
            />

            <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none transition"
            />

            <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white outline-none transition"
            />

            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-white outline-none transition"
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-white text-indigo-900 py-3 rounded-lg font-bold hover:bg-indigo-100 transition"
            >
                Add Expense
            </button>
        </div>
    );
}
