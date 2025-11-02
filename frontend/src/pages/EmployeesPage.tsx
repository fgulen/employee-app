import React, { useEffect, useState } from 'react';
import api from '../services/api';

type Employee = { id?: number; firstName: string; lastName: string; email?: string; position?: string };

export default function EmployeesPage() {
  const [list, setList] = useState<Employee[]>([]);
  const [form, setForm] = useState<Employee>({ firstName: '', lastName: '', email: '', position: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function fetchList() {
    const res = await api.get('/employees');
    setList(res.data);
  }

  useEffect(() => { fetchList(); }, []);

  function validateForm() {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!/^[A-Za-zÇçĞğİıÖöŞşÜü\s'-]+$/.test(form.firstName)) return 'First name must contain only letters.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!/^[A-Za-zÇçĞğİıÖöŞşÜü\s'-]+$/.test(form.lastName)) return 'Last name must contain only letters.';
    if (!form.email?.trim()) return 'Email is required.';
    // Simple email regex
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Email is invalid.';
    return '';
  }

  async function submit() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setTimeout(() => setError(''), 2500);
      return;
    }
    setError('');
    if (editingId) {
      await api.put(`/employees/${editingId}`, form);
      setSuccess('Employee updated successfully!');
    } else {
      await api.post('/employees', form);
      setSuccess('Employee created successfully!');
    }
    setForm({ firstName: '', lastName: '', email: '', position: '' });
    setEditingId(null);
    fetchList();
    setTimeout(() => setSuccess(''), 2000);
  }

  async function edit(e: Employee) {
    setEditingId(e.id || null);
    setForm({ firstName: e.firstName, lastName: e.lastName, email: e.email, position: e.position });
  }

  async function remove(id?: number) {
    if (!id) return;
    await api.delete(`/employees/${id}`);
    setSuccess('Employee deleted successfully!');
    fetchList();
    setTimeout(() => setSuccess(''), 2000);
  }

  return (
    <div className="employees-bg">
      <div className="employees-container">
        <h2 className="employees-title">Employees</h2>
        {error && <div className="employees-error">{error}</div>}
        {success && <div className="employees-success">{success}</div>}
        <form className="employees-form" onSubmit={e => { e.preventDefault(); submit(); }}>
          <input className="employees-input" placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
          <input className="employees-input" placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
          <input className="employees-input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="employees-input" placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
          <button className="employees-btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
        </form>
        <table className="employees-table">
          <thead><tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Position</th><th>Actions</th></tr></thead>
          <tbody>
            {list.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td><td>{e.firstName}</td><td>{e.lastName}</td><td>{e.email}</td><td>{e.position}</td>
                <td>
                  <button className="employees-action" onClick={() => edit(e)}>Edit</button>
                  <button className="employees-action delete" onClick={() => remove(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .employees-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #f7fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .employees-container {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 48px 36px;
          max-width: 700px;
          width: 100%;
        }
        .employees-title {
          color: #2d3748;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 24px;
        }
        .employees-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
          align-items: center;
        }
        .employees-input {
          padding: 10px 14px;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
          min-width: 120px;
        }
        .employees-input:focus {
          border-color: #3182ce;
        }
        .employees-btn {
          padding: 10px 24px;
          background: #3182ce;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          </div>
        }
        .employees-success {
          background: #38a169;
          color: #fff;
          padding: 10px 0;
          border-radius: 6px;
          text-align: center;
          margin-bottom: 10px;
          font-size: 15px;
        }
        .employees-error {
          background: #e53e3e;
          color: #fff;
          padding: 10px 0;
          border-radius: 6px;
          text-align: center;
          margin-bottom: 10px;
          font-size: 15px;
        }
        .employees-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }
        .employees-table th, .employees-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #e2e8f0;
          text-align: left;
        }
        .employees-table th {
          background: #f7fafc;
          color: #2d3748;
          font-weight: 600;
        }
        .employees-action {
          padding: 6px 16px;
          margin-right: 4px;
          background: #3182ce;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .employees-action.delete {
          background: #e53e3e;
        }
        .employees-action:hover {
          background: #2563eb;
        }
        .employees-action.delete:hover {
          background: #c53030;
        }
      `}</style>
    </div>
  );
}
