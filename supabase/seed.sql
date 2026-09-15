-- Biana Hair — catalogue seed
--
-- Loads the hair products the storefront already ships with into Supabase, so
-- the shop looks identical once the frontend reads from the database.
--
-- Studio services (installation, cut, colour, revamp vouchers) are deliberately
-- absent: they are static frontend content and never rows in `products`.
--
-- Safe to re-run: existing slugs are left untouched, so admin edits survive.
--
-- Images point at the files already in `public/images/products`. Replace a value
-- with an object path inside the `product-images` bucket (or an absolute URL)
-- once a product photo is uploaded to Storage.
--
-- `created_at` is staggered so `order by created_at desc` reproduces the
-- original shop ordering.

insert into public.products
  (slug, name, price, category, tag, image, description, length, lengths, specs, created_at)
values
  (
    'wine-red-bob-10',
    '10" Wine Red Double Drawn Frontal Bob',
    2800,
    'Bobs',
    'Bob',
    '/images/products/wine-red-bob.webp',
    'Double drawn frontal bob in wine red, 10 inches. Bold colour, dense ends.',
    '10"',
    '{}',
    jsonb_build_object('length', '10"', 'cap', 'Frontal', 'hair', 'Double drawn'),
    now()
  ),
  (
    'ombre-glueless-18',
    '18" Ombre Glueless Unit',
    4200,
    'Wigs',
    'Ombre',
    '/images/products/ombre-glueless.webp',
    '18 inch glueless ombre unit. Dark root into honey — no glue required.',
    '18"',
    '{}',
    jsonb_build_object('length', '18"', 'cap', 'Glueless', 'colour', 'Ombre'),
    now() - interval '1 minute'
  ),
  (
    'pondo-bundles-closure',
    '12" - 30" Bundles + Closure for Pondo',
    3500,
    'Bundles',
    'Pondo',
    '/images/products/pondo-bundles.webp',
    'Complete pondo set: bundles plus matching closure. Lengths from 12 to 30 inches.',
    '12"-30"',
    array['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
    jsonb_build_object('set', 'Bundles + closure', 'length', '12" – 30"', 'style', 'Pondo'),
    now() - interval '2 minutes'
  ),
  (
    'full-frontal-bob-8',
    '8" Full-frontal Bob',
    2200,
    'Bobs',
    'Bob',
    '/images/products/full-frontal-bob-8.webp',
    'Short full-frontal bob, 8 inches. Clean line, easy wear.',
    '8"',
    '{}',
    jsonb_build_object('length', '8"', 'cap', 'Full frontal'),
    now() - interval '3 minutes'
  ),
  (
    'goldie-unit-14',
    '14" Goldie Unit',
    3600,
    'Wigs',
    'Goldie',
    '/images/products/goldie-unit.webp',
    '14 inch Goldie unit. Warm tone, premium density.',
    '14"',
    '{}',
    jsonb_build_object('length', '14"', 'finish', 'Goldie'),
    now() - interval '4 minutes'
  ),
  (
    'double-drawn-bob-12',
    '12" Double Drawn Frontal Bob',
    2500,
    'Bobs',
    'Bob',
    '/images/products/double-drawn-bob-12.webp',
    '12 inch double drawn frontal bob. 100% human hair, even ends.',
    '12"',
    '{}',
    jsonb_build_object('length', '12"', 'hair', 'Double drawn', 'cap', 'Frontal'),
    now() - interval '5 minutes'
  ),
  (
    'vietnamese-bob-14',
    '14" Vietnamese 5X5 Bob',
    3200,
    'Bobs',
    'Bob',
    '/images/products/vietnamese-bob.webp',
    'Vietnamese 5x5 closure bob, 14 inches. Natural swing, low weight.',
    '14"',
    '{}',
    jsonb_build_object('length', '14"', 'cap', '5x5', 'origin', 'Vietnamese'),
    now() - interval '6 minutes'
  ),
  (
    'waterwave-unit-30',
    '30" Waterwave Frontal Unit',
    4500,
    'Wigs',
    'Waterwave',
    '/images/products/waterwave-unit.webp',
    '30 inch waterwave frontal unit. Long wave with a glass finish.',
    '30"',
    '{}',
    jsonb_build_object('length', '30"', 'texture', 'Waterwave', 'cap', 'Frontal'),
    now() - interval '7 minutes'
  ),
  (
    'straight-full-frontal-20',
    '20" Straight Full-frontal Unit',
    3800,
    'Wigs',
    'Straight',
    '/images/products/straight-full-frontal.webp',
    '20 inch straight full-frontal unit. Sleek, pulled-back ready.',
    '20"',
    '{}',
    jsonb_build_object('length', '20"', 'cap', 'Full frontal', 'texture', 'Straight'),
    now() - interval '8 minutes'
  ),
  (
    'straight-bundle',
    'Straight Hair Bundle',
    1200,
    'Bundles',
    'Straight',
    '/images/products/straight-bundle.webp',
    'Single-donor straight bundle, 100g. Three make a full install.',
    '18"',
    array['14"', '16"', '18"', '20"', '22"'],
    jsonb_build_object('weight', '100g', 'texture', 'Straight', 'weft', 'Double weft'),
    now() - interval '9 minutes'
  ),
  (
    'body-wave-bundle',
    'Body Wave Bundle',
    1300,
    'Bundles',
    'Body Wave',
    '/images/products/body-wave-bundle.webp',
    'Body wave bundle with natural bounce. Sold as a single weft.',
    '20"',
    array['16"', '18"', '20"', '22"'],
    jsonb_build_object('weight', '100g', 'texture', 'Body wave', 'weft', 'Double weft'),
    now() - interval '10 minutes'
  )
on conflict (slug) do nothing;
