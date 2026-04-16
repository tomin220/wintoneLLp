import { createContext, useContext, useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';
import {
  fetchProjects, saveProject, deleteProjectById,
  fetchSiteInfo, saveSiteInfo,
  DEFAULT_SITE_INFO,
} from '../lib/dataService';

const AdminContext = createContext(null);

const ADMIN_CREDENTIALS = { username: 'admin', password: 'winstone2024' };

// localStorage helpers for instant reads
function lsGetProjects() {
  try { const s = localStorage.getItem('wp_admin_projects'); return s ? JSON.parse(s) : DEFAULT_PROJECTS; }
  catch { return DEFAULT_PROJECTS; }
}
function lsGetSiteInfo() {
  try { const s = localStorage.getItem('wp_admin_siteinfo'); return s ? { ...DEFAULT_SITE_INFO, ...JSON.parse(s) } : DEFAULT_SITE_INFO; }
  catch { return DEFAULT_SITE_INFO; }
}

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('wp_admin_auth') === 'true'
  );
  // Initialize from localStorage immediately (no flicker)
  const [projects, setProjects] = useState(lsGetProjects);
  const [siteInfo, setSiteInfo] = useState(lsGetSiteInfo);

  // On mount: fetch from Supabase
  useEffect(() => {
    fetchProjects().then(data => { if (data?.length) setProjects(data); });
    fetchSiteInfo().then(data => { if (data) setSiteInfo(data); });
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('wp_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wp_admin_auth');
  };

  const addProject = async (project) => {
    const slug = project.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProject = {
      ...project,
      id: slug + '-' + Date.now(),
      slug,
      gallery: project.image ? [project.image] : [],
    };
    const updated = await saveProject(newProject);
    setProjects(updated);
    window.dispatchEvent(new CustomEvent('wp-data-changed'));
    return newProject;
  };

  const updateProject = async (id, updates) => {
    const current = lsGetProjects();
    const project = current.find(p => p.id === id);
    if (!project) return;
    const updated = await saveProject({ ...project, ...updates });
    setProjects(updated);
    window.dispatchEvent(new CustomEvent('wp-data-changed'));
  };

  const deleteProject = async (id) => {
    const updated = await deleteProjectById(id);
    setProjects(updated);
    window.dispatchEvent(new CustomEvent('wp-data-changed'));
  };

  const updateSiteInfo = async (updates) => {
    const updated = { ...siteInfo, ...updates };
    await saveSiteInfo(updated);
    setSiteInfo(updated);
    window.dispatchEvent(new CustomEvent('wp-data-changed'));
  };

  const resetProjects = async () => {
    localStorage.setItem('wp_admin_projects', JSON.stringify(DEFAULT_PROJECTS));
    setProjects(DEFAULT_PROJECTS);
    // Re-seed Supabase
    try {
      const rows = DEFAULT_PROJECTS.map(p => ({ id: p.id, slug: p.slug, data: p }));
      await import('../lib/supabase').then(({ supabase }) =>
        supabase.from('projects').upsert(rows)
      );
    } catch { /* ignore */ }
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      projects, addProject, updateProject, deleteProject, resetProjects,
      siteInfo, updateSiteInfo,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
