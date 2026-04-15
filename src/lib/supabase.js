import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jzmgrpbkbxuroeoktwbw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bWdycGJrYnh1cm9lb2t0d2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMjgzMTgsImV4cCI6MjA5MTgwNDMxOH0.FacYBHRSAvzB4LqS6101inOIbDJoFWGFszjGj8pKW_k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
