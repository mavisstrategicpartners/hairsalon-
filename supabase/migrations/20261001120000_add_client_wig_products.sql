-- Add the 11 priced client wig products. Unpriced DSC00529/DSC00530 are not inserted.

insert into public.products (slug, name, price, category, tag, image, description, length, lengths, specs, active)
values
  (
    'brown-straight-raw-hair-wig-18',
    'Brown Straight Raw Hair',
    7200,
    'Wigs',
    'Straight',
    '/images/products/dsc00364.jpg',
    'Brown Straight Raw Hair. 18 inch. Kim K closure.',
    '18"',
    array['18"'],
    '{
      "closure": "Kim K closure",
      "length": "18\"",
      "gallery": [
        "/images/products/dsc00364.jpg",
        "/images/products/dsc00356.jpg",
        "/images/products/dsc00354.jpg"
      ],
      "length_prices": {"18\"": 7200}
    }'::jsonb,
    true
  ),
  (
    'donor-hair-wig-26',
    'Donor Hair',
    15000,
    'Wigs',
    'Donor',
    '/images/products/dsc00372.jpg',
    'Donor Hair. 26 inch. 5×5 HD closure.',
    '26"',
    array['26"'],
    '{
      "closure": "5×5 HD closure",
      "length": "26\"",
      "gallery": [
        "/images/products/dsc00372.jpg",
        "/images/products/dsc00382.jpg",
        "/images/products/dsc00367.jpg",
        "/images/products/dsc00389.jpg"
      ],
      "length_prices": {"26\"": 15000}
    }'::jsonb,
    true
  ),
  (
    'donor-bob-wig-6',
    'Donor Bob',
    5500,
    'Wigs',
    'Bob',
    '/images/products/dsc00393.jpg',
    'Donor Bob. 6 inch. 5×5 HD closure.',
    '6"',
    array['6"'],
    '{
      "closure": "5×5 HD closure",
      "length": "6\"",
      "gallery": [
        "/images/products/dsc00393.jpg",
        "/images/products/dsc00397.jpg"
      ],
      "length_prices": {"6\"": 5500}
    }'::jsonb,
    true
  ),
  (
    'kaepira-curly-hair-wig-26',
    'Kaepira Curly Hair',
    12000,
    'Wigs',
    'Curly',
    '/images/products/dsc00448.jpg',
    'Kaepira Curly Hair. 26 inch. 13×4 full frontal with HD closure.',
    '26"',
    array['26"'],
    '{
      "closure": "13×4 full frontal with HD closure",
      "length": "26\"",
      "gallery": [
        "/images/products/dsc00448.jpg",
        "/images/products/dsc00442.jpg",
        "/images/products/dsc00451.jpg"
      ],
      "length_prices": {"26\"": 12000}
    }'::jsonb,
    true
  ),
  (
    'raw-hair-wig-32',
    'RAW Hair',
    11300,
    'Wigs',
    'RAW',
    '/images/products/dsc00429.jpg',
    'RAW Hair. 32 inch. 13×4 full frontal with 26 inch HD closure.',
    '32"',
    array['32"'],
    '{
      "closure": "13×4 full frontal with 26 inch HD closure",
      "length": "32\"",
      "gallery": [
        "/images/products/dsc00429.jpg",
        "/images/products/dsc00433.jpg",
        "/images/products/dsc00441.jpg"
      ],
      "length_prices": {"32\"": 11300}
    }'::jsonb,
    true
  ),
  (
    'donor-hair-loose-wave-wig-30',
    'Donor Hair Loose Wave',
    19000,
    'Wigs',
    'Loose wave',
    '/images/products/dsc00459.jpg',
    'Donor Hair Loose Wave. 30 inch. 13×4 full frontal with 28 inch HD closure.',
    '30"',
    array['30"'],
    '{
      "closure": "13×4 full frontal with 28 inch HD closure",
      "length": "30\"",
      "gallery": [
        "/images/products/dsc00459.jpg",
        "/images/products/dsc00457.jpg",
        "/images/products/dsc00453.jpg",
        "/images/products/dsc00455.jpg"
      ],
      "length_prices": {"30\"": 19000}
    }'::jsonb,
    true
  ),
  (
    'piano-raw-hair-wig-18',
    'Piano RAW Hair',
    7200,
    'Wigs',
    'Piano',
    '/images/products/dsc00462.jpg',
    'Piano RAW Hair. 18 inch. Kim K closure (2×6).',
    '18"',
    array['18"'],
    '{
      "closure": "Kim K closure (2×6)",
      "length": "18\"",
      "gallery": [
        "/images/products/dsc00462.jpg",
        "/images/products/dsc00469.jpg",
        "/images/products/dsc00470.jpg"
      ],
      "length_prices": {"18\"": 7200}
    }'::jsonb,
    true
  ),
  (
    'malaysian-deep-curl-wig-16',
    'Malaysian Deep Curl',
    6500,
    'Wigs',
    'Deep curl',
    '/images/products/dsc00484.jpg',
    'Malaysian Deep Curl. 16 inch. 13×4 full frontal with 14 inch HD closure. Glueless.',
    '16"',
    array['16"'],
    '{
      "closure": "13×4 full frontal with 14 inch HD closure",
      "glueless": "Glueless",
      "length": "16\"",
      "gallery": [
        "/images/products/dsc00484.jpg",
        "/images/products/dsc00485.jpg",
        "/images/products/dsc00481.jpg"
      ],
      "length_prices": {"16\"": 6500}
    }'::jsonb,
    true
  ),
  (
    'jerry-curl-wig-20',
    'Jerry Curl',
    7200,
    'Wigs',
    'Jerry curl',
    '/images/products/dsc00493.jpg',
    'Jerry Curl. 20 inch. 13×4 full frontal with 16 inch HD closure. Glueless. A different colour costs an additional R500.',
    '20"',
    array['20"'],
    '{
      "closure": "13×4 full frontal with 16 inch HD closure",
      "glueless": "Glueless",
      "colour": "A different colour costs an additional R500.",
      "length": "20\"",
      "gallery": [
        "/images/products/dsc00493.jpg",
        "/images/products/dsc00494.jpg",
        "/images/products/dsc00492.jpg"
      ],
      "length_prices": {"20\"": 7200}
    }'::jsonb,
    true
  ),
  (
    'donor-hair-straight-bob-wig-14',
    'Donor Hair Straight Bob',
    8500,
    'Wigs',
    'Bob',
    '/images/products/dsc00500.jpg',
    'Donor Hair Straight Bob. 14 inch. 5×5 HD closure. Glueless.',
    '14"',
    array['14"'],
    '{
      "closure": "5×5 HD closure",
      "glueless": "Glueless",
      "length": "14\"",
      "gallery": [
        "/images/products/dsc00500.jpg",
        "/images/products/dsc00503.jpg",
        "/images/products/dsc00504.jpg"
      ],
      "length_prices": {"14\"": 8500}
    }'::jsonb,
    true
  ),
  (
    'raw-hair-fringe-wig-12',
    'RAW Hair Fringe',
    3500,
    'Wigs',
    'Fringe',
    '/images/products/dsc00509.jpg',
    'RAW Hair Fringe. 12 inch. Transparent closure.',
    '12"',
    array['12"'],
    '{
      "closure": "Transparent closure",
      "length": "12\"",
      "gallery": ["/images/products/dsc00509.jpg"],
      "length_prices": {"12\"": 3500}
    }'::jsonb,
    true
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
  active = excluded.active;
