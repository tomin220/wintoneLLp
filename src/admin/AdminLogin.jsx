import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import './Admin.css';

export default function AdminLogin() {
  const { login } = useAdmin();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = login(form.username, form.password);
      if (!ok) setError('Invalid username or password.');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <img src="/winstonelogo.jpg" alt="Winstone Projects" />
          <div>
            <p className="admin-login__brand">Winstone Projects</p>
            <p className="admin-login__sub">Admin Dashboard</p>
          </div>
        </div>

        <h1 className="admin-login__title">Sign In</h1>
        <p className="admin-login__hint">Use: admin / winstone2024</p>
        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-field">
            <label htmlFor="al-user">Username</label>
            <input
              id="al-user"
              type="text"
              placeholder="admin"
              required
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="al-pass">Password</label>
            <input
              id="al-pass"
              type="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <Link to="/" className="admin-login__back">
          ← Back to Website
        </Link>
      </div>
    </div>
  );
}
