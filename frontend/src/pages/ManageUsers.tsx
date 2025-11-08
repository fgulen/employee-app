import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<Record<number, string>>({});
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState<string>('');
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'ROLE_USER' });

  useEffect(() => {
    setLoading(true);
    api.get('/users')
      .then(_res => setUsers(_res.data))
      .catch(err => {
        console.error('Failed to load users', err);
        setMessage('Failed to load users');
      })
      .finally(() => setLoading(false));
  }, []);

  // helper: reload users
  const reload = () => {
    setLoading(true);
    api.get('/users')
      .then(_res => setUsers(_res.data))
      .catch(err => {
        console.error('Failed to reload users', err);
        setMessage('Failed to load users');
      })
      .finally(() => setLoading(false));
  };

  const handleRoleChange = (userId: number, role: string) => setSelectedRole(prev => ({ ...prev, [userId]: role }));

  const handleAssignRole = (userId: number) => {
    const role = selectedRole[userId];
    api.put(`/users/${userId}/role`, { role })
      .then(_res => {
        setMessage('Role updated successfully');
        setUsers(prev => prev.map(u => (u.id === userId ? { ...u, role } : u)));
      })
      .catch(() => setMessage('Failed to update role'));
  };

  const handleEditClick = (user: any) => {
    setEditUserId(user.id);
    setEditEmail(user.email || '');
  };

  const handleEditSave = () => {
    if (!editUserId) return;
    api.put(`/users/${editUserId}`, { email: editEmail })
      .then(_res => {
        setMessage('User updated successfully');
        setUsers(prev => prev.map(u => (u.id === editUserId ? { ...u, email: editEmail } : u)));
        setEditUserId(null);
      })
      .catch(() => setMessage('Failed to update user'));
  };

  const handleCreate = () => {
    // basic validation
    if (!newUser.username || !newUser.email || !newUser.password) {
      setMessage('Please fill username, email and password');
      return;
    }
    api.post('/users', newUser)
      .then(_res => {
        setMessage('User created');
        setNewUser({ username: '', email: '', password: '', role: 'ROLE_USER' });
        setShowCreate(false);
        reload();
      })
      .catch(err => {
        setMessage((err?.response?.data && typeof err.response.data === 'string') ? err.response.data : 'Failed to create user');
      });
  };

  return (
    <div style={{ paddingLeft: 12, paddingRight: 12 }}>
      <div style={{ maxWidth: 1200, margin: '24px auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <h2>Manage Users</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input placeholder="Search users" value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn" onClick={() => setShowCreate(s => !s)}>{showCreate ? 'Cancel' : 'Create New'}</button>
            <button className="btn" onClick={reload}>Refresh</button>
            <button className="btn" onClick={() => setShowDebug(d => !d)}>{showDebug ? 'Hide JSON' : 'Show JSON'}</button>
          </div>
        </div>
      {message && <div className="message">{message}</div>}
      {loading && <div className="message">Loading users...</div>}
      {showCreate && (
        <div style={{ margin: '12px 0', padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff' }}>
          <h3>Create user</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input placeholder="Username" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
            <input placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
            <input placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
            <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="ROLE_USER">USER</option>
              <option value="ROLE_ADMIN">ADMIN</option>
            </select>
            <button className="btn" onClick={handleCreate}>Create</button>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && !loading && (
            <tr>
              <td colSpan={3}>No users found</td>
            </tr>
          )}
          {users
            .filter(u => (search ? ((u.email || '').toLowerCase().includes(search.toLowerCase()) || (u.username || '').toLowerCase().includes(search.toLowerCase())) : true))
            .map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: 600 }}>{user.username}</td>
                <td>{editUserId === user.id ? <input value={editEmail} onChange={e => setEditEmail(e.target.value)} /> : user.email}</td>
                <td>
                  <select value={selectedRole[user.id] || user.role} onChange={e => handleRoleChange(user.id, e.target.value)}>
                    <option value="ROLE_USER">USER</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                  </select>
                </td>
                <td>
                  <button className="btn" style={{ marginRight: 8 }} onClick={() => handleAssignRole(user.id)}>
                    Assign
                  </button>
                  {editUserId === user.id ? (
                    <button className="btn" onClick={handleEditSave}>Save</button>
                  ) : (
                    <button className="btn" onClick={() => handleEditClick(user)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showDebug && (
        <pre style={{ marginTop: 12, background: '#0b1220', color: '#e6eef8', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
      )}
      </div>
    </div>
  );
};

export default ManageUsers;
