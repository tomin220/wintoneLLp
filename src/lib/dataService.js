/**
 * dataService — Supabase as primary store, localStorage as cache.
 */
import { supabase } from './supabase';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

const LS_KEYS = {
  projects: 'wp_admin_projects',
  siteInfo: 'wp_admin_siteinfo',
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
  founderBio: "A visionary entrepreneur with a passion for transforming Bangalore's urban landscape. Since founding Winstone Projects in 2018, Nayaz has led the development of premium residential and commercial properties across Bangalore.",
};

function lsGetProjects() {
  try { const s = localStorage.getItem(LS_KEYS.projects); return s ? JSON.parse(s) : DEFAULT_PROJECTS; }
  catch { return DEFAULT_PROJECTS; }
}

function lsSetProjects(data) {
  localStorage.setItem(LS_KEYS.projects, JSON.stringify(data));
}

function lsGetSiteInfo() {
  try { const s = localStorage.getItem(LS_KEYS.siteInfo); return s ? { ...DEFAULT_SITE_INFO, ...JSON.parse(s) } : DEFAULT_SITE_INFO; }
  catch { return DEFAULT_SITE_INFO; }
}

function lsSetSiteInfo(data) {
  localStorage.setItem(LS_KEYS.siteInfo, JSON.stringify(data));
}

// ── Projects ──────────────────────────────────────────

export async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, data, updated_at')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      // Supabase is the source of truth — use it directly
      const projects = data.map(r => r.data);
      lsSetProjects(projects); // update cache
      return projects;
    }

    // Supabase empty — fall back to localStorage
    return lsGetProjects();
  } catch {
    // Network error — use localStorage cache
    return lsGetProjects();
  }
}

export async function saveProject(project) {
  // 1. Save to Supabase first (source of truth)
  const { error } = await supabase.from('projects').upsert({
    id: project.id,
    slug: project.slug,
    data: project,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Supabase saveProject error:', error.message);
  }

  // 2. Update localStorage cache
  const current = lsGetProjects();
  const exists = current.find(p => p.id === project.id);
  const updated = exists
    ? current.map(p => p.id === project.id ? project : p)
    : [...current, project];
  lsSetProjects(updated);

  return updated;
}

export async function deleteProjectById(id) {
  const current = lsGetProjects();
  const updated = current.filter(p => p.id !== id);
  lsSetProjects(updated);

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) console.error('Supabase deleteProject error:', error.message);

  return updated;
}

// ── Site Config ───────────────────────────────────────

export async function fetchSiteInfo() {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'siteInfo')
      .single();

    if (error) throw error;

    if (data?.value) {
      const info = { ...DEFAULT_SITE_INFO, ...data.value };
      lsSetSiteInfo(info);
      return info;
    }
    return lsGetSiteInfo();
  } catch {
    return lsGetSiteInfo();
  }
}

export async function saveSiteInfo(info) {
  lsSetSiteInfo(info);

  const { error } = await supabase.from('site_config').upsert({
    key: 'siteInfo',
    value: info,
    updated_at: new Date().toISOString(),
  });

  if (error) console.error('Supabase saveSiteInfo error:', error.message);

  return info;
}
