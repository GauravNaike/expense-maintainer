import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

// 🔐 Add token automatically in every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ================= AUTH =================
export const registerUser = (data) => {
    return API.post("/auth/register", data);
};

export const loginUser = (data) => {
    return API.post("/auth/login", data);
};

// ================= EXPENSE =================

// CREATE
export const createExpense = (data) => {
    return API.post("/expense", data);
};

// GET ALL / FILTER
export const getExpenses = (category = "") => {
    if (category) {
        return API.get(`/expense?category=${category}`);
    }
    return API.get("/expense");
};

// TOTAL
export const getTotal = (category = "") => {
    if (category) {
        return API.get(`/expense/total?category=${category}`);
    }
    return API.get("/expense/total");
};
