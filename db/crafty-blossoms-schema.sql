-- Proposed schema: review and apply to a NEW Crafty Blossoms Supabase project.
-- This file has not been applied to any remote database.
begin;
create table public.admin_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
create table public.products (
 id uuid primary key default gen_random_uuid(), slug text unique not null,
 name text not null, description text not null, category text not null,
 price integer check(price >= 0), stock integer not null default 0 check(stock >= 0),
 published boolean not null default false, featured boolean not null default false,
 images jsonb not null default '[]' check(jsonb_typeof(images) = 'array'),
 materials text, care text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 constraint publication_requires_photo check(not published or jsonb_array_length(images)>0)
);
create table public.custom_order_requests (
 id uuid primary key default gen_random_uuid(), name text not null, email text not null,
 phone text not null, product_type text not null, colours text, measurements text,
 quantity integer not null check(quantity between 1 and 20), budget text, date_needed date,
 description text not null, lines jsonb, consent_at timestamptz not null,
 status text not null default 'New' check(status in ('New','Reviewing','Quoted','Awaiting Approval','Approved','In Production','Completed','Cancelled')),
 notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.newsletter_subscribers (
 id uuid primary key default gen_random_uuid(), email text unique not null check(email=lower(email)),
 consent_at timestamptz not null, created_at timestamptz not null default now()
);
create index products_category_idx on public.products(category) where published;
create index enquiries_created_idx on public.custom_order_requests(created_at desc);
create index enquiries_status_idx on public.custom_order_requests(status);
alter table public.admin_profiles enable row level security;
alter table public.products enable row level security;
alter table public.custom_order_requests enable row level security;
alter table public.newsletter_subscribers enable row level security;
-- All access currently goes through validated server routes with a server-only key.
-- No direct public or authenticated access; admin membership cannot be self-assigned.
revoke all on public.admin_profiles,public.products,public.custom_order_requests,public.newsletter_subscribers from anon,authenticated;
grant all on public.admin_profiles,public.products,public.custom_order_requests,public.newsletter_subscribers to service_role;
commit;
