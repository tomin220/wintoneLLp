-- ═══════════════════════════════════════════════════════
-- Run this ENTIRE script in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/jzmgrpbkbxuroeoktwbw/sql
-- ═══════════════════════════════════════════════════════

-- 1. ENQUIRIES TABLE
create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  phone       text,
  email       text,
  interest    text,
  message     text,
  source      text default 'contact-form',
  read        boolean default false,
  created_at  timestamptz default now()
);
alter table public.enquiries enable row level security;
drop policy if exists "Allow public insert" on public.enquiries;
drop policy if exists "Allow public select" on public.enquiries;
drop policy if exists "Allow public update" on public.enquiries;
drop policy if exists "Allow public delete" on public.enquiries;
create policy "Allow public insert" on public.enquiries for insert to anon with check (true);
create policy "Allow public select" on public.enquiries for select to anon using (true);
create policy "Allow public update" on public.enquiries for update to anon using (true);
create policy "Allow public delete" on public.enquiries for delete to anon using (true);

-- 2. PROJECTS TABLE
create table if not exists public.projects (
  id          text primary key,
  slug        text unique not null,
  data        jsonb not null,
  updated_at  timestamptz default now()
);
alter table public.projects enable row level security;
drop policy if exists "Allow public insert projects" on public.projects;
drop policy if exists "Allow public select projects" on public.projects;
drop policy if exists "Allow public update projects" on public.projects;
drop policy if exists "Allow public delete projects" on public.projects;
create policy "Allow public insert projects" on public.projects for insert to anon with check (true);
create policy "Allow public select projects" on public.projects for select to anon using (true);
create policy "Allow public update projects" on public.projects for update to anon using (true);
create policy "Allow public delete projects" on public.projects for delete to anon using (true);

-- 3. SITE CONFIG TABLE
create table if not exists public.site_config (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz default now()
);
alter table public.site_config enable row level security;
drop policy if exists "Allow public insert config" on public.site_config;
drop policy if exists "Allow public select config" on public.site_config;
drop policy if exists "Allow public update config" on public.site_config;
drop policy if exists "Allow public delete config" on public.site_config;
create policy "Allow public insert config" on public.site_config for insert to anon with check (true);
create policy "Allow public select config" on public.site_config for select to anon using (true);
create policy "Allow public update config" on public.site_config for update to anon using (true);
create policy "Allow public delete config" on public.site_config for delete to anon using (true);
