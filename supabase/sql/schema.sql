-- Tablas

create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  image_url text,
  business_outcome text,
  created_at timestamp with time zone default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text,
  prompt text not null,
  quote_json jsonb not null,
  status text not null check (status in ('review','accepted')),
  created_at timestamp with time zone default now()
);

create table if not exists public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  date date not null,
  count int not null default 0,
  created_at timestamp with time zone default now(),
  unique (ip, date)
);

-- RLS
alter table public.portfolio enable row level security;
alter table public.leads enable row level security;
alter table public.rate_limits enable row level security;

-- Policies básicas
-- Portfolio: lectura pública
create policy if not exists "portfolio_select_public" on public.portfolio
for select using (true);

-- Leads: inserción pública (para que el funnel pueda guardar lead)
create policy if not exists "leads_insert_public" on public.leads
for insert with check (true);

-- Leads: lectura/actualización solo autenticados (admin via app)
create policy if not exists "leads_select_auth" on public.leads
for select using (auth.role() = 'authenticated');

create policy if not exists "leads_update_auth" on public.leads
for update using (auth.role() = 'authenticated');

-- Rate limits: solo función (service role). Sin policies de público.


