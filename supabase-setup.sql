-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/jzmgrpbkbxuroeoktwbw/sql)

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

-- Enable Row Level Security
alter table public.enquiries enable row level security;

-- Allow anyone to INSERT (so contact form works without login)
create policy "Allow public insert" on public.enquiries
  for insert to anon with check (true);

-- Allow anyone to SELECT (admin reads via anon key)
create policy "Allow public select" on public.enquiries
  for select to anon using (true);

-- Allow anyone to UPDATE (mark as read)
create policy "Allow public update" on public.enquiries
  for update to anon using (true);

-- Allow anyone to DELETE
create policy "Allow public delete" on public.enquiries
  for delete to anon using (true);
