import { useState } from 'react';
import { useAdmin } from './AdminContext';
import './Admin.css';

export default function AdminSiteInfo() {
  const { siteInfo, updateSiteInfo } = useAdmin();
  const [form, setForm] = useState({ ...siteInfo });
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteInfo(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-siteinfo">
      <form onSubmit={handleSubmit} className="admin-form">

        {/* Company */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Company Details</h3>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label>Company Name</label>
              <input type="text" value={form.companyName} onChange={set('companyName')} />
            </div>
            <div className="admin-field">
              <label>Tagline</label>
              <input type="text" value={form.tagline} onChange={set('tagline')} />
            </div>
            <div className="admin-field">
              <label>Phone</label>
              <input type="text" value={form.phone} onChange={set('phone')} />
            </div>
            <div className="admin-field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={set('email')} />
            </div>
            <div className="admin-field admin-field--full">
              <label>Address</label>
              <input type="text" value={form.address} onChange={set('address')} />
            </div>
            <div className="admin-field">
              <label>WhatsApp Number</label>
              <input type="text" value={form.whatsapp} onChange={set('whatsapp')} placeholder="+919845012345" />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Social Links</h3>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label>Instagram URL</label>
              <input type="url" value={form.instagram} onChange={set('instagram')} />
            </div>
            <div className="admin-field">
              <label>Twitter / X URL</label>
              <input type="url" value={form.twitter} onChange={set('twitter')} />
            </div>
            <div className="admin-field">
              <label>LinkedIn URL</label>
              <input type="url" value={form.linkedin} onChange={set('linkedin')} />
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Hero Section</h3>
          <div className="admin-field">
            <label>Hero Heading</label>
            <input type="text" value={form.heroHeading} onChange={set('heroHeading')} />
          </div>
          <div className="admin-field">
            <label>Hero Subtext</label>
            <textarea rows={3} value={form.heroSubtext} onChange={set('heroSubtext')} />
          </div>
        </div>

        {/* Founder */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Founder / Leadership</h3>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label>Founder Name</label>
              <input type="text" value={form.founderName} onChange={set('founderName')} />
            </div>
            <div className="admin-field">
              <label>Founder Title</label>
              <input type="text" value={form.founderTitle} onChange={set('founderTitle')} />
            </div>
          </div>
          <div className="admin-field">
            <label>Founder Bio</label>
            <textarea rows={5} value={form.founderBio} onChange={set('founderBio')} />
          </div>
        </div>

        <div className="admin-form-footer">
          <button type="submit" className={`admin-btn admin-btn--primary${saved ? ' admin-btn--saved' : ''}`}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
