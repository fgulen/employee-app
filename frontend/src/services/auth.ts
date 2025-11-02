import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api/" });

export const getEmployees = async () => {
    const response = await api.get("employees");
    return response.data;
};

export const createEmployee = async (employee: any) => {
    const response = await api.post("employees", employee);
    return response.data;
};

export default api;
