import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { fetchEnquiries } from '../lib/enquiryService';
import './Admin.css';

export default function AdminOverview() {
  const { projects } = useAdmin();
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries().then(setEnquiries);
  }, []);

  const completed = projects.filter(p => p.status === 'COMPLETED').length;
  const ongoing = projects.filter(p => p.status === 'ONGOING').length;
  const featured = projects.filter(p => p.featured).length;
  const unread = enquiries.filter(e => !e.read).length;

  const recent = enquiries.slice(0, 5);

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: '🏗️', color: '#c9a84c' },
    { label: 'Completed', value: completed, icon: '✅', color: '#22c55e' },
    { label: 'Ongoing', value: ongoing, icon: '🔄', color: '#f59e0b' },
    { label: 'Total Enquiries', value: enquiries.length, icon: '📩', color: '#818cf8' },
    { label: 'Unread', value: unread, icon: '🔔', color: '#ef4444' },
    { label: 'Featured', value: featured, icon: '⭐', color: '#c9a84c' },
  ];

  return (
    <div className="admin-overview">
      {/* Stat cards */}
      <div className="overview-stats">
        {stats.map(s => (
          <div key={s.label} className="overview-stat">
            <span className="overview-stat__icon">{s.icon}</span>
            <div>
              <p className="overview-stat__value" style={{ color: s.color }}>{s.value}</p>
              <p className="overview-stat__label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-grid">
        {/* Recent enquiries */}
        <div className="overview-card">
          <h3 className="overview-card__title">Recent Enquiries</h3>
          {recent.length === 0 ? (
            <p className="overview-empty">No enquiries yet. They'll appear here when visitors submit the contact form.</p>
          ) : (
            <div className="overview-enquiry-list">
              {recent.map(e => (
                <div key={e.id} className={`overview-enquiry${!e.read ? ' unread' : ''}`}>
                  <div className="overview-enquiry__avatar">{e.name?.charAt(0) || '?'}</div>
                  <div className="overview-enquiry__body">
                    <p className="overview-enquiry__name">{e.name || 'Unknown'}</p>
                    <p className="overview-enquiry__meta">{e.phone} · {e.interest || 'General'}</p>
                  </div>
                  <div className="overview-enquiry__right">
                    <p className="overview-enquiry__date">
                      {new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                    {!e.read && <span className="overview-enquiry__dot" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project breakdown */}
        <div className="overview-card">
          <h3 className="overview-card__title">Projects by Category</h3>
          {['Villa', 'Residential', 'Township', 'Commercial', 'Layout'].map(cat => {
            const count = projects.filter(p => p.category === cat).length;
            const pct = projects.length ? Math.round((count / projects.length) * 100) : 0;
            return (
              <div key={cat} className="overview-bar-row">
                <span className="overview-bar-label">{cat}</span>
                <div className="overview-bar-track">
                  <div className="overview-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="overview-bar-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
