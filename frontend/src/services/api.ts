// API service
import axios from 'axios';
import { getToken } from './auth';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the auth token automatically
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;

// Employee interface
export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
}

// Employee API functions
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get('/employees');
  return response.data;
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const response = await api.post('/employees', employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee> => {
  const response = await api.put(`/employees/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

export const getEmployee = async (id: number): Promise<Employee> => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};