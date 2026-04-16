import { useState } from 'react';
import { useAdmin } from './AdminContext';
import { saveProject } from '../lib/dataService';
import ProjectForm from './ProjectForm';
import './Admin.css';

const CATEGORIES = ['Villa', 'Residential', 'Township', 'Commercial', 'Layout'];
const STATUSES = ['COMPLETED', 'ONGOING'];

export default function AdminProjects() {
  const { projects, deleteProject, resetProjects } = useAdmin();
  const [view, setView] = useState('list');
  const [editTarget, setEditTarget] = useState(null);
  const [filter, setFilter] = useState('All');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const handleSyncAll = async () => {
    setSyncing(true);
    try {
      for (const p of projects) { await saveProject(p); }
      alert(`✓ ${projects.length} projects synced to cloud!`);
    } catch (e) {
      alert('Sync failed: ' + e.message);
    }
    setSyncing(false);
  };

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const handleEdit = (project) => {
    setEditTarget(project);
    setView('edit');
  };

  const handleDelete = (id) => {
    deleteProject(id);
    setConfirmDelete(null);
  };

  if (view === 'add') return <ProjectForm onBack={() => setView('list')} />;
  if (view === 'edit') return <ProjectForm project={editTarget} onBack={() => { setView('list'); setEditTarget(null); }} />;

  return (
    <div className="admin-projects">
      {/* Header */}
      <div className="admin-section-header">
        <div>
          <p className="admin-section-count">{projects.length} total projects</p>
        </div>
        <div className="admin-section-actions">
          <button className="admin-btn admin-btn--ghost" onClick={handleSyncAll} disabled={syncing}>
            {syncing ? 'Syncing...' : '☁ Sync to Cloud'}
          </button>
          <button className="admin-btn admin-btn--ghost" onClick={() => {
            if (window.confirm('Reset all projects to default data?')) resetProjects();
          }}>
            Reset to Default
          </button>
          <button className="admin-btn admin-btn--primary" onClick={() => setView('add')}>
            + Add Project
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="admin-filter-tabs">
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            className={`admin-filter-tab${filter === cat ? ' active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Year</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(project => (
              <tr key={project.id}>
                <td>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="admin-table__thumb"
                    onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=60'; }}
                  />
                </td>
                <td>
                  <p className="admin-table__name">{project.name}</p>
                  <p className="admin-table__slug">/{project.slug}</p>
                </td>
                <td><span className="admin-badge admin-badge--cat">{project.category}</span></td>
                <td className="admin-table__loc">{project.locationShort || project.location}</td>
                <td>
                  <span className={`admin-badge admin-badge--${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </td>
                <td>{project.year}</td>
                <td>
                  <span className={`admin-badge ${project.featured ? 'admin-badge--yes' : 'admin-badge--no'}`}>
                    {project.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <button className="admin-action-btn admin-action-btn--edit" onClick={() => handleEdit(project)}>
                      Edit
                    </button>
                    <button
                      className="admin-action-btn admin-action-btn--delete"
                      onClick={() => setConfirmDelete(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="admin-empty">No projects found for this category.</div>
        )}
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="admin-modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Project?</h3>
            <p>This action cannot be undone.</p>
            <div className="admin-modal__actions">
              <button className="admin-btn admin-btn--ghost" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(confirmDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
