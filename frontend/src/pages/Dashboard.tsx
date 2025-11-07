import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StatCard from '../components/StatCard';

export default function Dashboard({ username }: any) {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [employeesCount, setEmployeesCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [deptAgg, setDeptAgg] = useState<Record<string, number>>({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uRes, eRes] = await Promise.all([api.get('/users'), api.get('/employees')]);
      const users = uRes.data || [];
      const employees = eRes.data || [];
      setUsersCount(users.length);
      setEmployeesCount(employees.length);
      // recent users: take last created if available, fallback to last items
      setRecentUsers(users.slice(-5).reverse());
      // dept aggregation
      const agg: Record<string, number> = {};
      employees.forEach((emp: any) => {
        const d = (emp.department || 'Unknown');
        agg[d] = (agg[d] || 0) + 1;
      });
      setDeptAgg(agg);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const deptEntries = Object.entries(deptAgg);

  return (
    <div className="container dark-mode">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h2>Dashboard</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link className="btn" to="/employees">Employees</Link>
          <Link className="btn" to="/manage-users">Manage Users</Link>
          <button className="btn" onClick={() => fetchData()}>Refresh</button>
        </div>
      </div>
      {username && <div style={{ marginTop: 6 }} className="message">{`Welcome back, ${username}`}</div>}

      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        <StatCard title="Total Users" value={usersCount ?? '...'} subtitle="Registered accounts" link="/manage-users" loading={loading && usersCount === null} />
        <StatCard title="Total Employees" value={employeesCount ?? '...'} subtitle="Company employees" link="/employees" loading={loading && employeesCount === null} />
        <StatCard title="Recent Sign-ups" value={recentUsers.length} subtitle="Last 5 users" />
      </div>

      <div style={{ display: 'flex', gap: 18, marginTop: 18, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginTop: 0 }}>Employees by Department</h4>
          {deptEntries.length === 0 ? <div>No data</div> : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120 }}>
              {deptEntries.map(([dept, count]) => {
                const max = Math.max(...deptEntries.map(e => e[1]));
                const h = max ? Math.round((count / max) * 100) : 10;
                return (
                  <div key={dept} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ height: `${h}%`, background: 'var(--accent)', borderRadius: 6, marginBottom: 6 }} />
                    <div style={{ fontSize: 12 }}>{dept}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{count}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ width: 300 }}>
          <h4 style={{ marginTop: 0 }}>Recent Users</h4>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {recentUsers.length === 0 && <li style={{ color: 'var(--muted)' }}>No recent users</li>}
            {recentUsers.map(u => (
              <li key={u.id} style={{ padding: '8px 0', borderBottom: '1px dashed rgba(0,0,0,0.06)' }}>
                <div style={{ fontWeight: 700 }}>{u.username}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>{u.email || '—'}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
