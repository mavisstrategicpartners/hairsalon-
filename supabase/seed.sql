-- Biana Hair — catalogue seed
--
-- Products are created by the migrations in supabase/migrations. Studio
-- service vouchers stay static frontend content and are never rows in
-- `products`.
--
-- Safe to re-run: keeps the retired catalogue inactive. Rows are not deleted so
-- past orders keep their product references.

update public.products
set active = false
where slug in (
  'pondo-bundles-closure',
  'straight-bundle',
  'full-frontal-bob-8',
  'double-drawn-bob-12',
  'vietnamese-bob-14',
  'goldie-unit-14',
  'wine-red-bob-10',
  'ombre-glueless-18',
  'waterwave-unit-30',
  'straight-full-frontal-20',
  'body-wave-bundle',
  'malesian-curly-water-wave',
  'malaysian-deep-curl',
  'malaysian-loose-curl-micro-24'
);
