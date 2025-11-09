import api from './api';
import type { Employee } from '../types';

export const employeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
  },

  getEmployeeById: async (id: number): Promise<Employee> => {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  createEmployee: async (employee: Employee): Promise<Employee> => {
    const response = await api.post<Employee>('/employees', employee);
    return response.data;
  },

  updateEmployee: async (id: number, employee: Employee): Promise<Employee> => {
    const response = await api.put<Employee>(`/employees/${id}`, employee);
    return response.data;
  },

  deleteEmployee: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  getEmployeesByDepartment: async (department: string): Promise<Employee[]> => {
    const response = await api.get<Employee[]>(`/employees/department/${department}`);
    return response.data;
  },
};
