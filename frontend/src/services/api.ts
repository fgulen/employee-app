import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

export const login = async (username: string, password: string) => {
    const response = await axios.post(API_URL + "login", { username, password });
    return response.data;
};

export const getToken = (): string | null => localStorage.getItem("token");
export const setToken = (token: string) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");
