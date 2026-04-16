import { useState, useEffect } from 'react';
import { saveSiteInfo, fetchSiteInfo } from '../lib/dataService';
import './Admin.css';

const DEFAULT_SERVICES = [
  { num: '01', icon: '🏡', name: 'Luxury Villas', description: 'Private villas with premium finishes, smart-home features, and curated landscaping.', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80' },
  { num: '02', icon: '🏢', name: 'Residential Projects', description: 'High-rise apartments in prime Bangalore locations with world-class amenities.', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { num: '03', icon: '🌳', name: 'Land Development', description: 'BMRDA-approved plotted developments with clear titles in high-growth corridors.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' },
  { num: '04', icon: '🏬', name: 'Commercial Spaces', description: 'Grade-A office and retail spaces designed for modern businesses.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { num: '05', icon: '🏘️', name: 'Township Development', description: 'Integrated self-sufficient townships blending community, nature, and convenience.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
];

export default function AdminServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSiteInfo().then(info => {
      if (info?.services?.length) setServices(info.services);
    });
  }, []);

  const update = (i, field, val) => {
    const updated = services.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setServices(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    const info = await fetchSiteInfo();
    await saveSiteInfo({ ...info, services });
    window.dispatchEvent(new CustomEvent('wp-data-changed'));
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset services to default?')) setServices(DEFAULT_SERVICES);
  };

  return (
    <div className="admin-services">
      <div className="admin-section-header">
        <p className="admin-section-count">5 services · shown in "What We Build" section</p>
        <div className="admin-section-actions">
          <button className="admin-btn admin-btn--ghost" onClick={handleReset}>Reset to Default</button>
          <button
            className={`admin-btn admin-btn--primary${saved ? ' admin-btn--saved' : ''}`}
            onClick={handleSave}
            disabled={saving}
          >
            {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save All Services'}
          </button>
        </div>
      </div>

      <div className="admin-info-banner">
        ℹ️ Changes here update the <strong>"What We Build"</strong> section on the homepage. Image URL is the background shown when a service is selected.
      </div>

      <div className="admin-form" style={{ gap: 16 }}>
        {services.map((s, i) => (
          <div key={s.num} className="admin-form-section" style={{ gap: 14 }}>
            <h3 className="admin-form-section__title">Service {s.num}</h3>
            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Icon (emoji)</label>
                <input type="text" value={s.icon} onChange={e => update(i, 'icon', e.target.value)} placeholder="🏡" style={{ fontSize: '1.2rem' }} />
              </div>
              <div className="admin-field">
                <label>Service Name</label>
                <input type="text" value={s.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Luxury Villas" />
              </div>
              <div className="admin-field admin-field--full">
                <label>Description</label>
                <textarea rows={2} value={s.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Short description..." />
              </div>
              <div className="admin-field admin-field--full">
                <label>Background Image URL</label>
                <input type="url" value={s.image} onChange={e => update(i, 'image', e.target.value)} placeholder="https://images.unsplash.com/..." />
              </div>
            </div>
            {s.image && (
              <img src={s.image} alt={s.name} style={{ height: 80, width: 160, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}
                onError={e => { e.currentTarget.style.display = 'none'; }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
