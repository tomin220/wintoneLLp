import { useState, useEffect } from 'react';
import { fetchEnquiries, markEnquiryRead, deleteEnquiry, markAllRead, deleteAllEnquiries } from '../lib/enquiryService';
import './Admin.css';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const data = await fetchEnquiries();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = enquiries.filter(e => {
    if (filter === 'unread') return !e.read;
    if (filter === 'read') return e.read;
    return true;
  });

  const handleSelect = async (e) => {
    setSelected(e);
    if (!e.read) {
      await markEnquiryRead(e.id);
      setEnquiries(prev => prev.map(x => x.id === e.id ? { ...x, read: true } : x));
    }
  };

  const handleDelete = async (id) => {
    await deleteEnquiry(id);
    setEnquiries(prev => prev.filter(e => e.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleMarkAllRead = async () => {
    await markAllRead();
    setEnquiries(prev => prev.map(e => ({ ...e, read: true })));
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete all enquiries? This cannot be undone.')) return;
    await deleteAllEnquiries();
    setEnquiries([]);
    setSelected(null);
  };

  const unreadCount = enquiries.filter(e => !e.read).length;

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="admin-enquiries">
      <div className="admin-section-header">
        <div>
          <p className="admin-section-count">
            {loading ? 'Loading...' : `${enquiries.length} total · ${unreadCount} unread · stored in Supabase`}
          </p>
        </div>
        <div className="admin-section-actions">
          <button className="admin-btn admin-btn--ghost" onClick={load}>↻ Refresh</button>
          {unreadCount > 0 && (
            <button className="admin-btn admin-btn--ghost" onClick={handleMarkAllRead}>Mark All Read</button>
          )}
          {enquiries.length > 0 && (
            <button className="admin-btn admin-btn--ghost" onClick={handleClearAll}>Clear All</button>
          )}
        </div>
      </div>

      <div className="admin-filter-tabs" style={{ marginBottom: 20 }}>
        {[
          { key: 'all', label: `All (${enquiries.length})` },
          { key: 'unread', label: `Unread (${unreadCount})` },
          { key: 'read', label: 'Read' },
        ].map(f => (
          <button
            key={f.key}
            className={`admin-filter-tab${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-empty">Loading enquiries from Supabase...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          {enquiries.length === 0
            ? 'No enquiries yet. They appear here when visitors submit the contact or enquire form.'
            : 'No enquiries match this filter.'}
        </div>
      ) : (
        <div className="enquiry-layout">
          {/* List */}
          <div className="enquiry-list">
            {filtered.map(e => (
              <button
                key={e.id}
                className={`enquiry-item${!e.read ? ' enquiry-item--unread' : ''}${selected?.id === e.id ? ' enquiry-item--active' : ''}`}
                onClick={() => handleSelect(e)}
              >
                <div className="enquiry-item__avatar">{e.name?.charAt(0) || '?'}</div>
                <div className="enquiry-item__body">
                  <div className="enquiry-item__top">
                    <span className="enquiry-item__name">{e.name || 'Unknown'}</span>
                    <span className="enquiry-item__date">{formatDate(e.created_at)}</span>
                  </div>
                  <p className="enquiry-item__preview">{e.interest || 'General Enquiry'} · {e.phone}</p>
                </div>
                {!e.read && <span className="enquiry-item__dot" />}
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="enquiry-detail">
            {selected ? (
              <>
                <div className="enquiry-detail__header">
                  <div className="enquiry-detail__avatar">{selected.name?.charAt(0) || '?'}</div>
                  <div>
                    <h3 className="enquiry-detail__name">{selected.name}</h3>
                    <p className="enquiry-detail__date">
                      {new Date(selected.created_at).toLocaleString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    className="admin-action-btn admin-action-btn--delete"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => handleDelete(selected.id)}
                  >
                    Delete
                  </button>
                </div>

                <div className="enquiry-detail__fields">
                  {[
                    { label: 'Phone', value: selected.phone },
                    { label: 'Email', value: selected.email || '—' },
                    { label: 'Interested In', value: selected.interest || '—' },
                    { label: 'Source', value: selected.source === 'hero-modal' ? 'Hero Enquire Button' : 'Contact Form' },
                  ].map(f => (
                    <div key={f.label} className="enquiry-detail__field">
                      <span className="enquiry-detail__field-label">{f.label}</span>
                      <span className="enquiry-detail__field-value">{f.value}</span>
                    </div>
                  ))}
                </div>

                {selected.message && (
                  <div className="enquiry-detail__message">
                    <p className="enquiry-detail__field-label">Message</p>
                    <p className="enquiry-detail__message-text">{selected.message}</p>
                  </div>
                )}

                <div className="enquiry-detail__actions">
                  <a href={`tel:${selected.phone}`} className="admin-btn admin-btn--primary">
                    📞 Call Now
                  </a>
                  {selected.email && (
                    <a href={`mailto:${selected.email}`} className="admin-btn admin-btn--ghost">
                      ✉️ Send Email
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${selected.phone?.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(selected.name || '')}%2C%20thank%20you%20for%20your%20interest%20in%20Winstone%20Projects.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn admin-btn--ghost"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </>
            ) : (
              <div className="enquiry-detail__empty">
                <p>Select an enquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
