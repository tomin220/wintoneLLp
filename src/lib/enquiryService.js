import { supabase } from './supabase';

const LOCAL_KEY = 'wp_enquiries';

// ── Save enquiry (Supabase first, localStorage fallback) ──
export async function saveEnquiry(data) {
  const enquiry = {
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    interest: data.interest || '',
    message: data.message || '',
    source: data.source || 'contact-form',
    read: false,
  };

  try {
    const { error } = await supabase.from('enquiries').insert([enquiry]);
    if (error) throw error;
    return { success: true, source: 'supabase' };
  } catch (err) {
    console.warn('Supabase insert failed, falling back to localStorage:', err.message);
    // Fallback to localStorage
    const local = getLocalEnquiries();
    const withId = { ...enquiry, id: Date.now().toString(), created_at: new Date().toISOString() };
    localStorage.setItem(LOCAL_KEY, JSON.stringify([withId, ...local]));
    return { success: true, source: 'local' };
  }
}

// ── Fetch all enquiries ──
export async function fetchEnquiries() {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Supabase fetch failed, using localStorage:', err.message);
    return getLocalEnquiries();
  }
}

// ── Mark as read ──
export async function markEnquiryRead(id) {
  try {
    const { error } = await supabase
      .from('enquiries')
      .update({ read: true })
      .eq('id', id);
    if (error) throw error;
  } catch {
    // Update localStorage fallback
    const local = getLocalEnquiries();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(local.map(e => e.id === id ? { ...e, read: true } : e)));
  }
}

// ── Delete enquiry ──
export async function deleteEnquiry(id) {
  try {
    const { error } = await supabase.from('enquiries').delete().eq('id', id);
    if (error) throw error;
  } catch {
    const local = getLocalEnquiries();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(local.filter(e => e.id !== id)));
  }
}

// ── Mark all read ──
export async function markAllRead() {
  try {
    const { error } = await supabase
      .from('enquiries')
      .update({ read: true })
      .eq('read', false);
    if (error) throw error;
  } catch {
    const local = getLocalEnquiries();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(local.map(e => ({ ...e, read: true }))));
  }
}

// ── Delete all ──
export async function deleteAllEnquiries() {
  try {
    const { error } = await supabase.from('enquiries').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  } catch {
    localStorage.removeItem(LOCAL_KEY);
  }
}

function getLocalEnquiries() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); }
  catch { return []; }
}
