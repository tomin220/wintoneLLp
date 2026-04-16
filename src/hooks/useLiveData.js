/**
 * useLiveData — reads from localStorage instantly, then syncs with Supabase.
 * This guarantees the website always shows the latest admin changes.
 */
import { useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';
import { fetchProjects, fetchSiteInfo, DEFAULT_SITE_INFO } from '../lib/dataService';

function lsGetProjects() {
  try { const s = localStorage.getItem('wp_admin_projects'); return s ? JSON.parse(s) : DEFAULT_PROJECTS; }
  catch { return DEFAULT_PROJECTS; }
}

function lsGetSiteInfo() {
  try { const s = localStorage.getItem('wp_admin_siteinfo'); return s ? { ...DEFAULT_SITE_INFO, ...JSON.parse(s) } : DEFAULT_SITE_INFO; }
  catch { return DEFAULT_SITE_INFO; }
}

export function useLiveProjects() {
  const [data, setData] = useState(lsGetProjects);

  useEffect(() => {
    // Fetch from Supabase (or localStorage fallback)
    fetchProjects().then(projects => {
      if (projects?.length) setData(projects);
    });

    // Re-sync when localStorage changes (same-tab admin edits)
    const onStorage = () => {
      fetchProjects().then(projects => {
        if (projects?.length) setData(projects);
      });
    };

    window.addEventListener('wp-data-changed', onStorage);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) onStorage();
    });

    return () => {
      window.removeEventListener('wp-data-changed', onStorage);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return data;
}

export function useLiveSiteInfo() {
  const [data, setData] = useState(lsGetSiteInfo);

  useEffect(() => {
    fetchSiteInfo().then(info => {
      if (info) setData(info);
    });

    const onStorage = () => {
      fetchSiteInfo().then(info => {
        if (info) setData(info);
      });
    };

    window.addEventListener('wp-data-changed', onStorage);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) onStorage();
    });

    return () => {
      window.removeEventListener('wp-data-changed', onStorage);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return data;
}
