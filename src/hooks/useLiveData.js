import { useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

const KEYS = {
  projects: 'wp_admin_projects',
  siteInfo: 'wp_admin_siteinfo',
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
  founderBio: "A visionary entrepreneur with a passion for transforming Bangalore's urban landscape. Since founding Winstone Projects in 2018, Nayaz has led the development of premium residential and commercial properties across Bangalore.",
};

function getProjects() {
  try {
    const s = localStorage.getItem(KEYS.projects);
    return s ? JSON.parse(s) : DEFAULT_PROJECTS;
  } catch { return DEFAULT_PROJECTS; }
}

function getSiteInfo() {
  try {
    const s = localStorage.getItem(KEYS.siteInfo);
    return s ? { ...DEFAULT_SITE_INFO, ...JSON.parse(s) } : DEFAULT_SITE_INFO;
  } catch { return DEFAULT_SITE_INFO; }
}

export function useLiveProjects() {
  const [data, setData] = useState(getProjects);

  useEffect(() => {
    // Re-read on mount (handles navigation from admin to website)
    setData(getProjects());

    const handler = (e) => {
      if (!e.key || e.key === KEYS.projects) {
        setData(getProjects());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return data;
}

export function useLiveSiteInfo() {
  const [data, setData] = useState(getSiteInfo);

  useEffect(() => {
    // Re-read on mount (handles navigation from admin to website)
    setData(getSiteInfo());

    const handler = (e) => {
      if (!e.key || e.key === KEYS.siteInfo) {
        setData(getSiteInfo());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return data;
}
