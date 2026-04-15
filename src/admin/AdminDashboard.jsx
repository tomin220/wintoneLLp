import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { fetchEnquiries } from '../lib/enquiryService';
import AdminOverview from './AdminOverview';
import AdminProjects from './AdminProjects';
import AdminSiteInfo from './AdminSiteInfo';
import AdminEnquiries from './AdminEnquiries';
import AdminTestimonials from './AdminTestimonials';
import './Admin.css';

const NAV = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'enquiries', label: 'Enquiries', icon: '📩' },
  { id: 'projects', label: 'Projects', icon: '🏗️' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'siteinfo', label: 'Site Info', icon: '⚙️' },
];

export default function AdminDashboard() {
  const { logout, projects, siteInfo } = useAdmin();
  const [active, setActive] = useState('overview');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchEnquiries().then(list => {
      setUnreadCount(list.filter(e => !e.read).length);
    });
  }, [active]); // refresh count when switching tabs

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <img src="/winstonelogo.jpg" alt="Winstone" className="admin-sidebar__logo" />
          <div>
            <p className="admin-sidebar__name">Winstone</p>
            <p className="admin-sidebar__role">Admin Panel</p>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV.map(item => {
            const badge = item.id === 'enquiries' ? unreadCount : 0;
            return (
              <button
                key={item.id}
                className={`admin-nav-item${active === item.id ? ' active' : ''}`}
                onClick={() => setActive(item.id)}
              >
                <span className="admin-nav-item__icon">{item.icon}</span>
                {item.label}
                {badge > 0 && <span className="admin-nav-badge">{badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar__stats">
          <div className="admin-stat-pill">
            <span>{projects.length}</span>
            <span>Projects</span>
          </div>
          <div className="admin-stat-pill">
            <span>{projects.filter(p => p.status === 'ONGOING').length}</span>
            <span>Ongoing</span>
          </div>
        </div>

        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-view-site">
            ↗ View Site
          </a>
          <button className="admin-logout" onClick={logout}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-topbar__title">
            {NAV.find(n => n.id === active)?.label}
          </h1>
          <div className="admin-topbar__right">
            <span className="admin-topbar__user">👤 admin</span>
          </div>
        </div>

        <div className="admin-content">
          {active === 'overview' && <AdminOverview />}
          {active === 'enquiries' && <AdminEnquiries />}
          {active === 'projects' && <AdminProjects />}
          {active === 'testimonials' && <AdminTestimonials />}
          {active === 'siteinfo' && <AdminSiteInfo />}
        </div>
      </main>
    </div>
  );
}
