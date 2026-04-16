/**
 * dataService — Supabase-first with localStorage fallback.
 * Admin writes here. Website reads from here.
 * Both use the same source so changes are always reflected.
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

// ── localStorage helpers ──────────────────────────────
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
      .select('data')
      .order('data->year', { ascending: false });
    if (error) throw error;
    if (data && data.length > 0) {
      const projects = data.map(r => r.data);
      lsSetProjects(projects); // cache locally
      return projects;
    }
    // Supabase empty — return localStorage (may have been seeded)
    return lsGetProjects();
  } catch {
    return lsGetProjects();
  }
}

export async function saveProject(project) {
  // Always save to localStorage immediately
  const current = lsGetProjects();
  const exists = current.find(p => p.id === project.id);
  const updated = exists
    ? current.map(p => p.id === project.id ? project : p)
    : [...current, project];
  lsSetProjects(updated);

  // Try Supabase
  try {
    await supabase.from('projects').upsert({
      id: project.id,
      slug: project.slug,
      data: project,
      updated_at: new Date().toISOString(),
    });
  } catch { /* localStorage already updated */ }

  return updated;
}

export async function deleteProjectById(id) {
  const current = lsGetProjects();
  const updated = current.filter(p => p.id !== id);
  lsSetProjects(updated);

  try { await supabase.from('projects').delete().eq('id', id); }
  catch { /* localStorage already updated */ }

  return updated;
}

export async function seedProjectsToSupabase(projects) {
  // Push default projects to Supabase if table is empty
  try {
    const { data } = await supabase.from('projects').select('id').limit(1);
    if (data && data.length === 0) {
      const rows = projects.map(p => ({ id: p.id, slug: p.slug, data: p }));
      await supabase.from('projects').insert(rows);
    }
  } catch { /* ignore */ }
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

  try {
    await supabase.from('site_config').upsert({
      key: 'siteInfo',
      value: info,
      updated_at: new Date().toISOString(),
    });
  } catch { /* localStorage already updated */ }

  return info;
}
