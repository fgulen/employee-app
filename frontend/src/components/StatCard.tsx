// small presentational stat card

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  link?: string;
  loading?: boolean;
};

export default function StatCard({ title, value, subtitle, link, loading }: Props) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-title">{title}</div>
        {link ? <a className="stat-link" href={link}>View</a> : null}
      </div>
      <div className="stat-value">{loading ? '...' : value}</div>
      {subtitle && <div className="stat-sub">{subtitle}</div>}
      <style>{`
        .stat-card { background: var(--card-bg); padding: 16px; border-radius: 10px; box-shadow: 0 8px 20px rgba(2,6,23,0.04); min-width: 180px; }
        .stat-card-top { display:flex; justify-content:space-between; align-items:center; }
        .stat-title { font-weight:700; color:var(--muted); }
        .stat-link { font-size:13px; color:var(--accent); text-decoration:none; }
        .stat-value { font-size:28px; font-weight:800; margin-top:8px; }
        .stat-sub { margin-top:6px; color:var(--muted); font-size:13px; }
      `}</style>
    </div>
  );
}
