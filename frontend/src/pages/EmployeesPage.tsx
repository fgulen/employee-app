import { useEffect, useState } from 'react';
import api from '../services/api';
import { getToken } from '../services/auth';

type Employee = { id?: number; firstName: string; lastName: string; email?: string; position?: string };

export default function EmployeesPage({ username }: { username?: string }) {
  const [list, setList] = useState<Employee[]>([]);
  const [form, setForm] = useState<Employee>({ firstName: '', lastName: '', email: '', position: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [showCreate, setShowCreate] = useState<boolean>(false);

  async function fetchList() {
    setLoading(true);
    try {
      const token = getToken();
      const res = await api.get('/employees', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setList(res.data);
    } catch (err: any) {
      console.error('Failed to fetch employees', err);
      setError((err?.response?.data && typeof err.response.data === 'string') ? err.response.data : 'Failed to load employees');
      setList([]);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchList(); }, []);

  function validateForm() {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!/^[A-Za-zÇçĞğİıÖöŞşÜü\s'-]+$/.test(form.firstName)) return 'First name must contain only letters.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!/^[A-Za-zÇçĞğİıÖöŞşÜü\s'-]+$/.test(form.lastName)) return 'Last name must contain only letters.';
    if (!form.email?.trim()) return 'Email is required.';
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
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, form);
        setSuccess('Employee updated successfully!');
      } else {
        await api.post('/employees', form);
        setSuccess('Employee created successfully!');
      }
    } catch (err: any) {
      console.error('Failed to submit employee', err);
      setError((err?.response?.data && typeof err.response.data === 'string') ? err.response.data : 'Failed to save employee');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setForm({ firstName: '', lastName: '', email: '', position: '' });
    setEditingId(null);
    setShowCreate(false);
    fetchList();
    setTimeout(() => setSuccess(''), 2000);
  }

  async function edit(e: Employee) {
    setEditingId(e.id || null);
    setForm({ firstName: e.firstName, lastName: e.lastName, email: e.email, position: e.position });
    setShowCreate(true);
  }

  async function remove(id?: number) {
    if (!id) return;
    try {
      await api.delete(`/employees/${id}`);
      setSuccess('Employee deleted successfully!');
      fetchList();
      setTimeout(() => setSuccess(''), 2000);
    } catch (err: any) {
      console.error('Failed to delete employee', err);
      setError((err?.response?.data && typeof err.response.data === 'string') ? err.response.data : 'Failed to delete employee');
      setTimeout(() => setError(''), 3000);
    }
  }

  return (
    <div className="container dark-mode">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h2>Employees</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input placeholder="Search employees" value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn" onClick={() => setShowCreate(s => !s)}>{showCreate ? 'Cancel' : 'Create New'}</button>
        </div>
      </div>
      {error && <div className="message">{error}</div>}
      {success && <div className="message">{success}</div>}
      {loading && <div className="message">Loading employees...</div>}

      {showCreate && (
        <div style={{ margin: '12px 0', padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff' }}>
          <h3>{editingId ? 'Edit employee' : 'Create employee'}</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
            <input placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
            <button className="btn" onClick={submit}>{editingId ? 'Save' : 'Create'}</button>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 && !loading && (
            <tr>
              <td colSpan={6}>No employees found</td>
            </tr>
          )}
          {list
            .filter(u => (search ? ((u.email || '').toLowerCase().includes(search.toLowerCase()) || (u.firstName || '').toLowerCase().includes(search.toLowerCase()) || (u.lastName || '').toLowerCase().includes(search.toLowerCase())) : true))
            .map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.position}</td>
                <td>
                  <button className="btn" style={{ marginRight: 8 }} onClick={() => edit(e)}>Edit</button>
                  <button className="btn" onClick={() => remove(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

// ...existing code...
/* All CSS below is now inside the <style> tag in JSX above, with correct syntax. */
