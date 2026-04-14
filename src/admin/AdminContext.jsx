import { createContext, useContext, useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

const AdminContext = createContext(null);

const STORAGE_KEYS = {
  projects: 'wp_admin_projects',
  siteInfo: 'wp_admin_siteinfo',
  auth: 'wp_admin_auth',
};

const DEFAULT_SITE_INFO = {
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
  founderBio: "A visionary entrepreneur with a passion for transforming India's urban landscape. Since founding Winstone Projects in 2018, Nayaz has led the development of iconic residential and commercial properties across Bangalore, Mysore, and Hyderabad.",
};

const ADMIN_CREDENTIALS = { username: 'admin', password: 'winstone2024' };

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.auth) === 'true';
  });

  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.projects);
      return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
    } catch { return DEFAULT_PROJECTS; }
  });

  const [siteInfo, setSiteInfo] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.siteInfo);
      return stored ? { ...DEFAULT_SITE_INFO, ...JSON.parse(stored) } : DEFAULT_SITE_INFO;
    } catch { return DEFAULT_SITE_INFO; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.siteInfo, JSON.stringify(siteInfo));
  }, [siteInfo]);

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
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateSiteInfo = (updates) => {
    setSiteInfo(prev => ({ ...prev, ...updates }));
  };

  const resetProjects = () => {
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.projects);
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
