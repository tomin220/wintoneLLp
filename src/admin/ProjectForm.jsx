import { useState } from 'react';
import { useAdmin } from './AdminContext';
import PdfUploader from './PdfUploader';
import './Admin.css';

const CATEGORIES = ['Villa', 'Residential', 'Township', 'Commercial', 'Layout'];
const STATUSES = ['COMPLETED', 'ONGOING'];
const TYPES = ['LUXURY VILLAS', 'RESIDENTIAL PROJECTS', 'TOWNSHIP DEVELOPMENTS', 'COMMERCIAL', 'LAYOUT', 'VILLA'];

const empty = {
  name: '', shortName: '', type: 'LUXURY VILLAS', category: 'Villa',
  location: '', locationShort: '', status: 'ONGOING', year: new Date().getFullYear().toString(),
  image: '', tagline: '', description: '', fullDescription: '',
  highlights: ['', '', ''],
  specs: { 'Configuration': '', 'Price Range': '', 'Possession': '' },
  featured: false,
};

export default function ProjectForm({ project, onBack }) {
  const { addProject, updateProject } = useAdmin();
  const isEdit = !!project;

  const [form, setForm] = useState(() => {
    if (!project) return empty;
    return {
      ...project,
      highlights: project.highlights?.length ? project.highlights : ['', '', ''],
    };
  });

  const [saved, setSaved] = useState(false);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const setCheck = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.checked }));

  const setHighlight = (i, val) => {
    const h = [...form.highlights];
    h[i] = val;
    setForm(f => ({ ...f, highlights: h }));
  };

  const addHighlight = () => setForm(f => ({ ...f, highlights: [...f.highlights, ''] }));
  const removeHighlight = (i) => setForm(f => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }));

  const addSpec = () => {
    if (!specKey.trim()) return;
    setForm(f => ({ ...f, specs: { ...f.specs, [specKey]: specVal } }));
    setSpecKey(''); setSpecVal('');
  };

  const removeSpec = (key) => {
    const s = { ...form.specs };
    delete s[key];
    setForm(f => ({ ...f, specs: s }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = {
      ...form,
      highlights: form.highlights.filter(h => h.trim()),
    };
    if (isEdit) {
      updateProject(project.id, cleaned);
    } else {
      addProject(cleaned);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 800);
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-header">
        <button className="admin-back-btn" onClick={onBack}>← Back to Projects</button>
        <h2>{isEdit ? `Edit: ${project.name}` : 'Add New Project'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Basic Info */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Basic Information</h3>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label>Project Name *</label>
              <input type="text" required value={form.name} onChange={set('name')} placeholder="Winstone Arcadia Villas" />
            </div>
            <div className="admin-field">
              <label>Short Name</label>
              <input type="text" value={form.shortName} onChange={set('shortName')} placeholder="Arcadia Villas" />
            </div>
            <div className="admin-field">
              <label>Category *</label>
              <select value={form.category} onChange={set('category')}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label>Type Badge</label>
              <select value={form.type} onChange={set('type')}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label>Status *</label>
              <select value={form.status} onChange={set('status')}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label>Year</label>
              <input type="text" value={form.year} onChange={set('year')} placeholder="2024" />
            </div>
            <div className="admin-field">
              <label>Location (full)</label>
              <input type="text" value={form.location} onChange={set('location')} placeholder="Whitefield, Bangalore" />
            </div>
            <div className="admin-field">
              <label>Location (short)</label>
              <input type="text" value={form.locationShort} onChange={set('locationShort')} placeholder="Whitefield" />
            </div>
          </div>
          <div className="admin-field admin-field--checkbox">
            <label>
              <input type="checkbox" checked={form.featured} onChange={setCheck('featured')} />
              Featured on homepage
            </label>
          </div>
        </div>

        {/* Media */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Media</h3>
          <div className="admin-field">
            <label>Main Image URL *</label>
            <input type="text" value={form.image} onChange={set('image')} placeholder="https://... or /filename.jpg" />
          </div>
          {form.image && (
            <img src={form.image} alt="preview" className="admin-img-preview"
              onError={e => { e.currentTarget.style.display = 'none'; }} />
          )}
          <div className="admin-field">
            <label>Tagline</label>
            <input type="text" value={form.tagline} onChange={set('tagline')} placeholder="Where Architecture Meets Nature" />
          </div>

          {/* Gallery */}
          <div className="admin-field">
            <label>Gallery Images</label>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: '0 0 10px' }}>
              Add image URLs for the gallery slideshow on the project page. The main image is always included.
            </p>
            {(form.gallery || []).map((url, i) => (
              <div key={i} className="admin-highlight-row" style={{ marginBottom: 8 }}>
                <input
                  type="text"
                  value={url}
                  onChange={e => {
                    const g = [...(form.gallery || [])];
                    g[i] = e.target.value;
                    setForm(f => ({ ...f, gallery: g }));
                  }}
                  placeholder="https://... image URL"
                />
                {url && (
                  <img src={url} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 3, flexShrink: 0 }}
                    onError={e => { e.currentTarget.style.display = 'none'; }} />
                )}
                <button type="button" className="admin-remove-btn" onClick={() => {
                  setForm(f => ({ ...f, gallery: (f.gallery || []).filter((_, idx) => idx !== i) }));
                }}>✕</button>
              </div>
            ))}
            <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => {
              setForm(f => ({ ...f, gallery: [...(f.gallery || []), ''] }));
            }}>
              + Add Gallery Image
            </button>
          </div>

          <div className="admin-field">
            <label>Brochure PDF</label>
            <PdfUploader
              currentUrl={form.brochureUrl || ''}
              projectId={form.name?.toLowerCase().replace(/\s+/g, '-') || 'project'}
              onUpload={(url) => setForm(f => ({ ...f, brochureUrl: url }))}
            />
            <small style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: 4 }}>
              Drag & drop a PDF or click to browse. A "Download Brochure" button will appear on the project page.
            </small>
          </div>
        </div>

        {/* Descriptions */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Descriptions</h3>
          <div className="admin-field">
            <label>Short Description *</label>
            <textarea rows={3} required value={form.description} onChange={set('description')}
              placeholder="Brief description shown on cards..." />
          </div>
          <div className="admin-field">
            <label>Full Description</label>
            <textarea rows={6} value={form.fullDescription} onChange={set('fullDescription')}
              placeholder="Detailed description shown on project detail page..." />
          </div>
        </div>

        {/* Highlights */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Highlights</h3>
          {form.highlights.map((h, i) => (
            <div key={i} className="admin-highlight-row">
              <input
                type="text"
                value={h}
                onChange={e => setHighlight(i, e.target.value)}
                placeholder={`Highlight ${i + 1}`}
              />
              <button type="button" className="admin-remove-btn" onClick={() => removeHighlight(i)}>✕</button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addHighlight}>
            + Add Highlight
          </button>
        </div>

        {/* Specs */}
        <div className="admin-form-section">
          <h3 className="admin-form-section__title">Specifications</h3>
          {Object.entries(form.specs).map(([key, val]) => (
            <div key={key} className="admin-spec-row">
              <span className="admin-spec-row__key">{key}</span>
              <input
                type="text"
                value={val}
                onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, [key]: e.target.value } }))}
              />
              <button type="button" className="admin-remove-btn" onClick={() => removeSpec(key)}>✕</button>
            </div>
          ))}
          <div className="admin-spec-add">
            <input type="text" placeholder="Key (e.g. Configuration)" value={specKey} onChange={e => setSpecKey(e.target.value)} />
            <input type="text" placeholder="Value (e.g. 4 & 5 BHK)" value={specVal} onChange={e => setSpecVal(e.target.value)} />
            <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addSpec}>Add</button>
          </div>
        </div>

        {/* Submit */}
        <div className="admin-form-footer">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onBack}>Cancel</button>
          <button type="submit" className={`admin-btn admin-btn--primary${saved ? ' admin-btn--saved' : ''}`}>
            {saved ? '✓ Saved! Redirecting...' : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
        {saved && (
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(201,168,76,0.8)', marginTop: 8 }}>
            Changes saved to storage. Navigate to the website to see updates.
          </p>
        )}
      </form>
    </div>
  );
}
