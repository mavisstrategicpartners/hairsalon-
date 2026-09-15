-- Biana HAIR backend foundation: catalogue, orders, admin roles, audit trail.
-- Services are deliberately absent: they are not part of the ecommerce catalogue.

-- ---------------------------------------------------------------------------
-- Shared helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Trigger function that stamps updated_at on every UPDATE.';

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null,
  name        text not null,
  price       numeric(10, 2) not null,
  category    text not null,
  tag         text,
  image       text,
  description text,
  length      text,
  lengths     text[] not null default '{}',
  specs       jsonb  not null default '{}'::jsonb,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint products_slug_key unique (slug),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint products_name_not_blank check (length(btrim(name)) > 0),
  constraint products_price_non_negative check (price >= 0),
  constraint products_category_allowed
    check (category in ('Bundles', 'Closures', 'Frontals', 'Wigs', 'Bobs')),
  -- specs is a free-form bag of hair attributes (texture, colour, density,
  -- lace, origin...). Enforce shape only, never the individual keys.
  constraint products_specs_is_object check (jsonb_typeof(specs) = 'object')
);

comment on table public.products is
  'Ecommerce hair catalogue. Studio services are not stored here.';
comment on column public.products.specs is
  'Hair specifications as jsonb, e.g. {"texture":"Body wave","origin":"Vietnamese","lace":"HD 5x5"}.';
comment on column public.products.lengths is
  'Selectable lengths for this product, e.g. {"12\"","14\""}.';

create index if not exists products_active_idx on public.products (active);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_active_category_idx on public.products (active, category);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------

-- Human-readable order numbers: BH000001, BH000002, ...
create sequence if not exists public.order_number_seq as bigint start with 1 increment by 1;

create or replace function public.next_order_number()
returns text
language sql
volatile
security definer
set search_path = ''
as $$
  select 'BH' || lpad(nextval('public.order_number_seq')::text, 6, '0');
$$;

comment on function public.next_order_number() is
  'Returns the next unique human-readable order number (BH######).';

create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  order_number        text not null default public.next_order_number(),
  customer_name       text not null,
  customer_email      text not null,
  customer_phone      text,
  customer_address    text,
  customer_city       text,
  customer_postal_code text,
  items               jsonb not null,
  subtotal            numeric(10, 2) not null,
  shipping            numeric(10, 2) not null default 0,
  total               numeric(10, 2) not null,
  status              text not null default 'pending',
  payment_method      text not null default 'eft',
  payment_status      text not null default 'pending',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  constraint orders_order_number_key unique (order_number),
  constraint orders_customer_name_not_blank check (length(btrim(customer_name)) > 0),
  constraint orders_customer_email_format check (customer_email ~* '^[^@%\s]+@[^@%\s]+\.[^@%\s]+$'),
  constraint orders_items_is_array check (jsonb_typeof(items) = 'array'),
  constraint orders_items_not_empty check (jsonb_array_length(items) > 0),
  constraint orders_subtotal_non_negative check (subtotal >= 0),
  constraint orders_shipping_non_negative check (shipping >= 0),
  constraint orders_total_non_negative check (total >= 0),
  constraint orders_total_matches_lines check (total = subtotal + shipping),
  constraint orders_status_allowed
    check (status in ('pending', 'processing', 'paid', 'shipped', 'delivered')),
  -- EFT only. Stripe/card is intentionally not supported yet.
  constraint orders_payment_method_allowed check (payment_method in ('eft')),
  constraint orders_payment_status_allowed check (payment_status in ('pending', 'completed'))
);

comment on table public.orders is
  'Guest-checkout orders. Written only by trusted server code; totals are recomputed server-side.';
comment on column public.orders.items is
  'Immutable snapshot of purchased lines: [{product_id, slug, name, unit_price, quantity, line_total, length}].';

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_customer_email_idx on public.orders (lower(customer_email));

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- user_roles  (Biana staff only; customers use guest checkout)
-- ---------------------------------------------------------------------------

create table if not exists public.user_roles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  role       text not null default 'admin',
  created_at timestamptz not null default now(),

  constraint user_roles_user_id_role_key unique (user_id, role),
  constraint user_roles_role_allowed check (role in ('admin'))
);

comment on table public.user_roles is
  'Staff role grants. Never read from the browser; checked server-side by requireAdmin().';

create index if not exists user_roles_user_id_idx on public.user_roles (user_id);

-- ---------------------------------------------------------------------------
-- audit_logs
-- ---------------------------------------------------------------------------

create table if not exists public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users (id) on delete set null,
  actor_email text,
  action      text not null,
  entity      text not null,
  entity_id   text,
  details     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),

  constraint audit_logs_action_not_blank check (length(btrim(action)) > 0),
  constraint audit_logs_entity_not_blank check (length(btrim(entity)) > 0),
  constraint audit_logs_details_is_object check (jsonb_typeof(details) = 'object')
);

comment on table public.audit_logs is
  'Append-only record of admin actions. Not readable or writable by customers.';

create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);
create index if not exists audit_logs_actor_id_idx on public.audit_logs (actor_id);
create index if not exists audit_logs_entity_idx on public.audit_logs (entity, entity_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- RLS is default-deny: with RLS enabled and no matching policy, the request is
-- refused. The service-role key bypasses RLS, so all privileged access must go
-- through server-side API routes.
-- ---------------------------------------------------------------------------

alter table public.products   enable row level security;
alter table public.orders     enable row level security;
alter table public.user_roles enable row level security;
alter table public.audit_logs enable row level security;

-- products: the storefront may read live products, nothing else.
drop policy if exists "Active products are publicly readable" on public.products;
create policy "Active products are publicly readable"
  on public.products
  for select
  to anon, authenticated
  using (active = true);

-- No INSERT/UPDATE/DELETE policies on products: writes are server-only.
revoke insert, update, delete on public.products from anon, authenticated;

-- orders, user_roles, audit_logs: no policies at all, plus privileges revoked
-- so the intent is explicit rather than relying on default-deny alone.
revoke all on public.orders     from anon, authenticated;
revoke all on public.user_roles from anon, authenticated;
revoke all on public.audit_logs from anon, authenticated;

-- The order-number sequence must not be drivable from the browser.
revoke all on sequence public.order_number_seq from anon, authenticated;
revoke all on function public.next_order_number() from anon, authenticated;
