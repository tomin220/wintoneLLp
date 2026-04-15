import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

const AdminContext = createContext(null);

export const STORAGE_KEYS = {
  projects: 'wp_admin_projects',
  siteInfo: 'wp_admin_siteinfo',
  auth: 'wp_admin_auth',
};

export const DEFAULT_SITE_INFO = {
  companyName: 'Winstone Projects',
  tagline: 'Redefining luxury living in Bangalore since 2018.',
  phone: '+91 98450 12345',
  email: 'info@winstoneprojects.in',
  address: 'Prestige Tech Park, Outer Ring Road, Bangalore – 560 103',
  whatsapp: '+919845012345',
  instagram: 'https://instagram.com/winstoneprojects',
  twitter: 'https://twitter.com/winstoneprojects',
  linkedin: 'https://linkedin.com/company/winstoneprojects',
  heroHeading: 'Where Homes Become Legacies',
  heroSubtext: 'Premium villas and developments crafted for modern Indian lifestyles — built with trust, delivered with excellence.',
  founderName: 'Nayaz Faiyaz Ahmed',
  founderTitle: 'Founder & Chairman · Winstone Group',
  founderBio: 'A visionary entrepreneur with a passion for transforming Bangalore\'s urban landscape. Since founding Winstone Projects in 2018, Nayaz has led the development of premium residential and commercial properties across Bangalore. His relentless pursuit of excellence, combined with deep respect for Indian architectural heritage, has positioned Winstone Projects as a trusted name in Bangalore\'s luxury real estate sector.',
};

const ADMIN_CREDENTIALS = { username: 'admin', password: 'winstone2024' };

function readProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.projects);
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
  } catch { return DEFAULT_PROJECTS; }
}

function readSiteInfo() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.siteInfo);
    return stored ? { ...DEFAULT_SITE_INFO, ...JSON.parse(stored) } : DEFAULT_SITE_INFO;
  } catch { return DEFAULT_SITE_INFO; }
}

// Dispatch a custom event so same-tab listeners pick up changes
function notifyChange(key) {
  window.dispatchEvent(new StorageEvent('storage', { key }));
}

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(STORAGE_KEYS.auth) === 'true'
  );
  const [projects, setProjects] = useState(readProjects);
  const [siteInfo, setSiteInfo] = useState(readSiteInfo);

  // Re-read from localStorage on every focus (handles tab switching and navigation)
  useEffect(() => {
    const onFocus = () => {
      setProjects(readProjects());
      setSiteInfo(readSiteInfo());
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  // Listen for storage changes (cross-tab AND same-tab via notifyChange)
  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key || e.key === STORAGE_KEYS.projects) setProjects(readProjects());
      if (!e.key || e.key === STORAGE_KEYS.siteInfo) setSiteInfo(readSiteInfo());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Persist projects and notify
  const persistProjects = useCallback((updated) => {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(updated));
    notifyChange(STORAGE_KEYS.projects);
  }, []);

  // Persist siteInfo and notify
  const persistSiteInfo = useCallback((updated) => {
    localStorage.setItem(STORAGE_KEYS.siteInfo, JSON.stringify(updated));
    notifyChange(STORAGE_KEYS.siteInfo);
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.auth, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.auth);
  };

  const addProject = (project) => {
    const slug = project.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProject = {
      ...project,
      id: slug + '-' + Date.now(),
      slug,
      gallery: project.image ? [project.image] : [],
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    persistProjects(updated);
    return newProject;
  };

  const updateProject = (id, updates) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p);
    setProjects(updated);
    persistProjects(updated);
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    persistProjects(updated);
  };

  const updateSiteInfo = (updates) => {
    const updated = { ...siteInfo, ...updates };
    setSiteInfo(updated);
    persistSiteInfo(updated);
  };

  const resetProjects = () => {
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.projects);
    notifyChange(STORAGE_KEYS.projects);
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
