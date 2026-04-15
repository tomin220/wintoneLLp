/**
 * Reads live data from localStorage on every render.
 * This guarantees the website always shows the latest admin changes
 * without depending on React state propagation.
 */
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';
import { DEFAULT_SITE_INFO } from '../admin/AdminContext';

const KEYS = {
  projects: 'wp_admin_projects',
  siteInfo: 'wp_admin_siteinfo',
};

export function useLiveProjects() {
  try {
    const stored = localStorage.getItem(KEYS.projects);
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export function useLiveSiteInfo() {
  try {
    const stored = localStorage.getItem(KEYS.siteInfo);
    return stored ? { ...DEFAULT_SITE_INFO, ...JSON.parse(stored) } : DEFAULT_SITE_INFO;
  } catch {
    return DEFAULT_SITE_INFO;
  }
}
