import { useState } from 'react';
import './Admin.css';

const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    quote: 'RERA compliance and legal clarity were our top priorities — Winstone Projects excelled on both fronts. The handover of our Indiranagar commercial unit was smooth and on schedule. A partner you can truly trust.',
    client: 'Meera Subramaniam',
    location: 'BANGALORE',
    property: 'Winston Square, Indiranagar',
  },
  {
    id: '2',
    quote: 'Winstone Projects delivered beyond our expectations. The Arcadia villa we purchased in Whitefield is an absolute masterpiece — the attention to detail, Vastu compliance, and the smart home features are truly world-class. Best decision we ever made.',
    client: 'Rajesh Nair',
    location: 'BANGALORE',
    property: 'Arcadia Villas, Whitefield',
  },
  {
    id: '3',
    quote: 'We purchased a plot in Devanahalli as an investment. The location near the airport and the BMRDA approval gave us confidence. In just two years the value has appreciated significantly. Winstone Projects truly delivers on its promises.',
    client: 'Vikram Rao',
    location: 'MUMBAI',
    property: 'Aero Valley, Devanahalli',
  },
];

const STORAGE_KEY = 'wp_testimonials';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_TESTIMONIALS; }
  catch { return DEFAULT_TESTIMONIALS; }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const empty = { quote: '', client: '', location: '', property: '' };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState(load);
  const [editing, setEditing] = useState(null); // null | 'new' | testimonial object
  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const startAdd = () => { setForm(empty); setEditing('new'); };
  const startEdit = (t) => { setForm({ ...t }); setEditing(t); };
  const cancel = () => { setEditing(null); setForm(empty); };

  const handleSave = (e) => {
    e.preventDefault();
    let updated;
    if (editing === 'new') {
      updated = [...testimonials, { ...form, id: Date.now().toString() }];
    } else {
      updated = testimonials.map(t => t.id === editing.id ? { ...t, ...form } : t);
    }
    setTestimonials(updated);
    save(updated);
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditing(null); setForm(empty); }, 1000);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    save(updated);
    if (editing?.id === id) cancel();
  };

  const resetToDefault = () => {
    if (!window.confirm('Reset to default testimonials?')) return;
    setTestimonials(DEFAULT_TESTIMONIALS);
    save(DEFAULT_TESTIMONIALS);
  };

  return (
    <div className="admin-testimonials">
      <div className="admin-section-header">
        <p className="admin-section-count">{testimonials.length} testimonials · hidden from homepage</p>
        <div className="admin-section-actions">
          <button className="admin-btn admin-btn--ghost" onClick={resetToDefault}>Reset to Default</button>
          <button className="admin-btn admin-btn--primary" onClick={startAdd}>+ Add Testimonial</button>
        </div>
      </div>

      <div className="admin-info-banner">
        ℹ️ Testimonials are currently <strong>hidden from the homepage</strong>. Once you have real client reviews, you can enable them by updating the homepage.
      </div>

      {/* List */}
      <div className="testimonial-admin-list">
        {testimonials.map(t => (
          <div key={t.id} className="testimonial-admin-card">
            <div className="testimonial-admin-card__quote">"{t.quote}"</div>
            <div className="testimonial-admin-card__footer">
              <div className="testimonial-admin-card__author">
                <span className="testimonial-admin-card__avatar">{t.client.charAt(0)}</span>
                <div>
                  <p className="testimonial-admin-card__name">{t.client}</p>
                  <p className="testimonial-admin-card__meta">{t.location} · {t.property}</p>
                </div>
              </div>
              <div className="admin-table__actions">
                <button className="admin-action-btn admin-action-btn--edit" onClick={() => startEdit(t)}>Edit</button>
                <button className="admin-action-btn admin-action-btn--delete" onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {editing !== null && (
        <div className="admin-modal-backdrop" onClick={cancel}>
          <div className="admin-modal admin-modal--wide" onClick={e => e.stopPropagation()}>
            <h3>{editing === 'new' ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
              <div className="admin-field">
                <label>Quote *</label>
                <textarea rows={4} required value={form.quote} onChange={set('quote')} placeholder="Client's testimonial..." />
              </div>
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label>Client Name *</label>
                  <input type="text" required value={form.client} onChange={set('client')} placeholder="Rajesh Nair" />
                </div>
                <div className="admin-field">
                  <label>Location</label>
                  <input type="text" value={form.location} onChange={set('location')} placeholder="BANGALORE" />
                </div>
                <div className="admin-field admin-field--full">
                  <label>Property</label>
                  <input type="text" value={form.property} onChange={set('property')} placeholder="Arcadia Villas, Whitefield" />
                </div>
              </div>
              <div className="admin-modal__actions">
                <button type="button" className="admin-btn admin-btn--ghost" onClick={cancel}>Cancel</button>
                <button type="submit" className={`admin-btn admin-btn--primary${saved ? ' admin-btn--saved' : ''}`}>
                  {saved ? '✓ Saved!' : editing === 'new' ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
