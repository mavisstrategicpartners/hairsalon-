-- Biana Hair — catalogue seed
--
-- 11 September 2026 WhatsApp section only. Studio service vouchers stay
-- static frontend content and are never rows in `products`.
--
-- Safe to re-run: old demo slugs are removed, then the 11 Sep products are
-- upserted. Images point at files in `public/images/products`.

delete from public.products
where slug not in (
  'brazilian-body-wave',
  'brazilian-body-wave-2tone',
  'brazilian-body-wave-micro-22',
  'brazilian-straight-micro-26',
  'malaysian-loose-curl-water-wig-30',
  'malaysian-deep-curl',
  'malaysian-loose-curl-26',
  'malaysian-loose-curl-micro-24',
  'italian-curls',
  'italian-curls-micro-28',
  'raw-hair-20',
  'raw-colour-maroon-20',
  'raw-water-wave-platinum-28',
  'bouncy-body-wave-30',
  'bounce-curls-16',
  'raw-kinky-straight-14',
  'kinky-straight-micro-22',
  'brazilian-water-wave-crochet-24',
  'brazilian-kinky-deep-22'
);

insert into public.products
  (slug, name, price, category, tag, image, description, length, lengths, specs, created_at)
values
  (
    'brazilian-body-wave',
    'Brazilian Body Wave',
    6700,
    'Bundles',
    'Body Wave',
    '/images/products/brazilian-body-wave-1.jpg',
    'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k',
    '32"',
    array['22"', '28"', '32"'],
    '{
      "origin": "Brazilian",
      "texture": "Body wave",
      "set": "3 bundles",
      "gallery": [
        "/images/products/brazilian-body-wave-1.jpg",
        "/images/products/brazilian-body-wave-2.jpg",
        "/images/products/brazilian-body-wave-3.jpg"
      ],
      "length_prices": {"22\"": 4600, "28\"": 6100, "32\"": 6700}
    }'::jsonb,
    now()
  ),
  (
    'brazilian-body-wave-2tone',
    '2 tone Brazilian Body Wave',
    3150,
    'Bundles',
    '2 tone',
    '/images/products/brazilian-body-wave-2tone.jpg',
    '2 tone Brazilian Body Wave',
    null,
    '{}',
    '{
      "origin": "Brazilian",
      "texture": "Body wave",
      "colour": "2 tone",
      "gallery": ["/images/products/brazilian-body-wave-2tone.jpg"]
    }'::jsonb,
    now() - interval '1 minute'
  ),
  (
    'brazilian-body-wave-micro-22',
    'Brazilian Body Wave Microbonding Microlink 22inch',
    4600,
    'Bundles',
    'Microbonding',
    '/images/products/brazilian-body-wave-micro-22.jpg',
    'Brazilian Body Wave Microbonding Microlink 22inch',
    '22"',
    '{}',
    '{
      "origin": "Brazilian",
      "texture": "Body wave",
      "finish": "Microbonding / microlink",
      "length": "22\"",
      "gallery": ["/images/products/brazilian-body-wave-micro-22.jpg"]
    }'::jsonb,
    now() - interval '2 minutes'
  ),
  (
    'brazilian-straight-micro-26',
    'Brazilian straight microbonding microlink 26 inch',
    5400,
    'Bundles',
    'Straight',
    '/images/products/brazilian-straight-micro-26.jpg',
    'Brazilian straight microbonding microlink 26 inch',
    '26"',
    '{}',
    '{
      "origin": "Brazilian",
      "texture": "Straight",
      "finish": "Microbonding / microlink",
      "length": "26\"",
      "gallery": ["/images/products/brazilian-straight-micro-26.jpg"]
    }'::jsonb,
    now() - interval '3 minutes'
  ),
  (
    'malaysian-loose-curl-water-wig-30',
    'Malaysian loose curl water wig 30 inches',
    7000,
    'Wigs',
    'Loose curl',
    '/images/products/malaysian-loose-curl-wig-30.jpg',
    'Malaysian loose curl water wig 30 inches',
    '30"',
    '{}',
    '{
      "origin": "Malaysian",
      "texture": "Loose curl water",
      "length": "30\"",
      "gallery": ["/images/products/malaysian-loose-curl-wig-30.jpg"]
    }'::jsonb,
    now() - interval '4 minutes'
  ),
  (
    'malaysian-deep-curl',
    'Malaysian Deep Curl',
    7300,
    'Bundles',
    'Deep curl',
    '/images/products/malaysian-deep-curl-32.jpg',
    'Malaysian Deep Curl 32 inch',
    '32"',
    array['30"', '32"'],
    '{
      "origin": "Malaysian",
      "texture": "Deep curl",
      "gallery": [
        "/images/products/malaysian-deep-curl-32.jpg",
        "/images/products/malaysian-deep-curl-30.jpg"
      ],
      "length_prices": {"30\"": 7000, "32\"": 7300}
    }'::jsonb,
    now() - interval '5 minutes'
  ),
  (
    'malaysian-loose-curl-26',
    'Malaysian Loose Curl 26 inches',
    5900,
    'Bundles',
    'Loose curl',
    '/images/products/malaysian-loose-curl-26.jpg',
    'Malaysian Loose Curl 26 inches',
    '26"',
    '{}',
    '{
      "origin": "Malaysian",
      "texture": "Loose curl",
      "length": "26\"",
      "gallery": ["/images/products/malaysian-loose-curl-26.jpg"]
    }'::jsonb,
    now() - interval '6 minutes'
  ),
  (
    'malaysian-loose-curl-micro-24',
    'Malaysian Loose Curl Microlink 24 inch',
    5400,
    'Bundles',
    'Microlink',
    '/images/products/malaysian-loose-curl-micro-24.jpg',
    'Malaysian Loose Curl Microlink 24 inch',
    '24"',
    '{}',
    '{
      "origin": "Malaysian",
      "texture": "Loose curl",
      "finish": "Microlink",
      "length": "24\"",
      "gallery": ["/images/products/malaysian-loose-curl-micro-24.jpg"]
    }'::jsonb,
    now() - interval '7 minutes'
  ),
  (
    'italian-curls',
    'Italian Curls',
    4500,
    'Bundles',
    'Italian curl',
    '/images/products/italian-curls-18.jpg',
    'Italian Curls 18 inch',
    '18"',
    array['10"', '18"', '24"', '30"'],
    '{
      "origin": "Italian",
      "texture": "Curl",
      "gallery": [
        "/images/products/italian-curls-18.jpg",
        "/images/products/italian-curls-10.jpg",
        "/images/products/italian-curls-24.jpg"
      ],
      "length_prices": {"10\"": 3350, "18\"": 4500, "24\"": 7700, "30\"": 12000}
    }'::jsonb,
    now() - interval '8 minutes'
  ),
  (
    'italian-curls-micro-28',
    'Italian Curls Microlink Microbonding 28 inches',
    6400,
    'Bundles',
    'Microlink',
    '/images/products/italian-curls-micro-28.jpg',
    'Italian Curls Microlink Microbonding 28 inches',
    '28"',
    '{}',
    '{
      "origin": "Italian",
      "texture": "Curl",
      "finish": "Microlink / microbonding",
      "length": "28\"",
      "gallery": ["/images/products/italian-curls-micro-28.jpg"]
    }'::jsonb,
    now() - interval '9 minutes'
  ),
  (
    'raw-hair-20',
    'Raw hair 20 inches',
    4200,
    'Bundles',
    'Raw',
    '/images/products/raw-hair-20.jpg',
    'Raw hair 20 inches',
    '20"',
    '{}',
    '{
      "hair": "Raw",
      "length": "20\"",
      "gallery": ["/images/products/raw-hair-20.jpg"]
    }'::jsonb,
    now() - interval '10 minutes'
  ),
  (
    'raw-colour-maroon-20',
    'Raw Colour Meroon 20inch',
    4700,
    'Bundles',
    'Raw',
    '/images/products/raw-colour-maroon-20.jpg',
    'Raw Colour Meroon 20inch',
    '20"',
    '{}',
    '{
      "hair": "Raw",
      "colour": "Meroon",
      "length": "20\"",
      "gallery": ["/images/products/raw-colour-maroon-20.jpg"]
    }'::jsonb,
    now() - interval '11 minutes'
  ),
  (
    'raw-water-wave-platinum-28',
    'Raw Water Wave Microbonding Colour Platinum 28 inches',
    7400,
    'Bundles',
    'Raw',
    '/images/products/raw-water-wave-platinum-28.jpg',
    'Raw Water Wave Microbonding Colour Platinum 28 inches',
    '28"',
    '{}',
    '{
      "hair": "Raw",
      "texture": "Water wave",
      "finish": "Microbonding",
      "colour": "Platinum",
      "length": "28\"",
      "gallery": ["/images/products/raw-water-wave-platinum-28.jpg"]
    }'::jsonb,
    now() - interval '12 minutes'
  ),
  (
    'bouncy-body-wave-30',
    'Bouncy Body Wave 30 inches',
    19000,
    'Bundles',
    'Bouncy',
    '/images/products/bouncy-body-wave-30.jpg',
    'Bouncy Body Wave 30 inches',
    '30"',
    '{}',
    '{
      "texture": "Bouncy body wave",
      "length": "30\"",
      "gallery": ["/images/products/bouncy-body-wave-30.jpg"]
    }'::jsonb,
    now() - interval '13 minutes'
  ),
  (
    'bounce-curls-16',
    'Bounce Curls 16 inch',
    5900,
    'Bundles',
    'Bounce curls',
    '/images/products/bounce-curls-16.jpg',
    'Bounce Curls 16 inch',
    '16"',
    '{}',
    '{
      "texture": "Bounce curls",
      "length": "16\"",
      "gallery": ["/images/products/bounce-curls-16.jpg"]
    }'::jsonb,
    now() - interval '14 minutes'
  ),
  (
    'raw-kinky-straight-14',
    'Raw Kinky Straight 14 inches',
    3300,
    'Bundles',
    'Kinky straight',
    '/images/products/raw-kinky-straight-14.jpg',
    'Raw Kinky Straight 14 inches',
    '14"',
    '{}',
    '{
      "hair": "Raw",
      "texture": "Kinky straight",
      "length": "14\"",
      "gallery": ["/images/products/raw-kinky-straight-14.jpg"]
    }'::jsonb,
    now() - interval '15 minutes'
  ),
  (
    'kinky-straight-micro-22',
    'Kinky Straight Microbonding and Microlink 22inch',
    4600,
    'Bundles',
    'Kinky straight',
    '/images/products/kinky-straight-micro-22.jpg',
    'Kinky Straight Microbonding and Microlink 22inch',
    '22"',
    '{}',
    '{
      "texture": "Kinky straight",
      "finish": "Microbonding / microlink",
      "length": "22\"",
      "gallery": ["/images/products/kinky-straight-micro-22.jpg"]
    }'::jsonb,
    now() - interval '16 minutes'
  ),
  (
    'brazilian-water-wave-crochet-24',
    'Brazilian Water Wave Crochet 24 inches',
    4900,
    'Bundles',
    'Crochet',
    '/images/products/brazilian-water-wave-crochet-24.jpg',
    'Brazilian Water Wave Crochet 24 inches',
    '24"',
    '{}',
    '{
      "origin": "Brazilian",
      "texture": "Water wave",
      "finish": "Crochet",
      "length": "24\"",
      "gallery": ["/images/products/brazilian-water-wave-crochet-24.jpg"]
    }'::jsonb,
    now() - interval '17 minutes'
  ),
  (
    'brazilian-kinky-deep-22',
    'Brazilian Kinky Deep 22 inches',
    4600,
    'Bundles',
    'Kinky deep',
    '/images/products/brazilian-kinky-deep-22.jpg',
    'Brazilian Kinky Deep 22 inches',
    '22"',
    '{}',
    '{
      "origin": "Brazilian",
      "texture": "Kinky deep",
      "length": "22\"",
      "gallery": ["/images/products/brazilian-kinky-deep-22.jpg"]
    }'::jsonb,
    now() - interval '18 minutes'
  )
on conflict (slug) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  tag = excluded.tag,
  image = excluded.image,
  description = excluded.description,
  length = excluded.length,
  lengths = excluded.lengths,
  specs = excluded.specs,
  active = true,
  created_at = excluded.created_at;
