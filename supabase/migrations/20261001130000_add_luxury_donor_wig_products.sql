-- Add the Luxury Donor wigs and Malaysian Curls Two Toned from the October client PDF.

insert into public.products (slug, name, price, category, tag, image, description, length, lengths, specs, active)
values
  (
    'luxury-donor-body-wave-22',
    'Luxury Donor Body Wave',
    19000,
    'Wigs',
    'Body wave',
    '/images/products/B1.jpeg',
    'Luxury Donor Body Wave. 22 inch. 6x6 HD closure.',
    '22"',
    array['22"'],
    '{
      "closure": "6x6 HD closure",
      "length": "22\"",
      "gallery": ["/images/products/B1.jpeg"],
      "length_prices": {"22\"": 19000}
    }'::jsonb,
    true
  ),
  (
    'luxury-donor-body-wave-24',
    'Luxury Donor Body Wave',
    21000,
    'Wigs',
    'Body wave',
    '/images/products/B2.jpeg',
    'Luxury Donor Body Wave. 24 inch. 6x6 HD closure.',
    '24"',
    array['24"'],
    '{
      "closure": "6x6 HD closure",
      "length": "24\"",
      "gallery": [
        "/images/products/B2.jpeg",
        "/images/products/B3.jpeg",
        "/images/products/B11.mp4"
      ],
      "length_prices": {"24\"": 21000}
    }'::jsonb,
    true
  ),
  (
    'luxury-donor-bob-10',
    'Luxury Donor Bob',
    8900,
    'Wigs',
    'Bob',
    '/images/products/B4.jpeg',
    'Luxury Donor Bob. 10 inch. 6x6 HD closure.',
    '10"',
    array['10"'],
    '{
      "closure": "6x6 HD closure",
      "length": "10\"",
      "gallery": [
        "/images/products/B4.jpeg",
        "/images/products/B5.png"
      ],
      "length_prices": {"10\"": 8900}
    }'::jsonb,
    true
  ),
  (
    'luxury-donor-613-body-wave-20',
    'Luxury Donor 613 Body Wave',
    18000,
    'Wigs',
    '613',
    '/images/products/B7.jpeg',
    'Luxury Donor 613 Body Wave. 20 inch. HD closure.',
    '20"',
    array['20"'],
    '{
      "closure": "HD closure",
      "length": "20\"",
      "gallery": [
        "/images/products/B7.jpeg",
        "/images/products/B12.mp4",
        "/images/products/B13.mp4"
      ],
      "length_prices": {"20\"": 18000}
    }'::jsonb,
    true
  ),
  (
    'luxury-donor-highlighted-body-wave-24',
    'Luxury Donor Highlighted Body Wave',
    23000,
    'Wigs',
    'Highlighted',
    '/images/products/B8.jpeg',
    'Luxury Donor Highlighted Body Wave. 24 inch. HD closure.',
    '24"',
    array['24"'],
    '{
      "closure": "HD closure",
      "length": "24\"",
      "gallery": ["/images/products/B8.jpeg"],
      "length_prices": {"24\"": 23000}
    }'::jsonb,
    true
  ),
  (
    'luxury-donor-brown-body-wave-24',
    'Luxury Donor Brown Body Wave',
    23000,
    'Wigs',
    'Brown',
    '/images/products/B10.jpeg',
    'Luxury Donor Brown Body Wave. 24 inch. HD closure.',
    '24"',
    array['24"'],
    '{
      "closure": "HD closure",
      "length": "24\"",
      "gallery": [
        "/images/products/B10.jpeg",
        "/images/products/B14.mp4",
        "/images/products/B9.jpeg"
      ],
      "length_prices": {"24\"": 23000}
    }'::jsonb,
    true
  ),
  (
    'luxury-donor-cinnamon-body-wave-26',
    'Luxury Donor Cinnamon Body Wave',
    23000,
    'Wigs',
    'Cinnamon',
    '/images/products/B15.png',
    'Luxury Donor Cinnamon Body Wave. 26 inch. HD closure.',
    '26"',
    array['26"'],
    '{
      "closure": "HD closure",
      "length": "26\"",
      "gallery": ["/images/products/B15.png"],
      "length_prices": {"26\"": 23000}
    }'::jsonb,
    true
  ),
  (
    'malaysian-curls-two-toned-32',
    'Malaysian Curls Two Toned',
    12800,
    'Wigs',
    'Two toned',
    '/images/products/pending/dsc00529.jpg',
    'Malaysian Curls Two Toned. 32 inch. 13x4 frontal with 26 inch HD closure. Glueless.',
    '32"',
    array['32"'],
    '{
      "closure": "13x4 frontal with 26 inch HD closure",
      "glueless": "Glueless",
      "length": "32\"",
      "gallery": [
        "/images/products/pending/dsc00529.jpg",
        "/images/products/pending/dsc00530.jpg"
      ],
      "length_prices": {"32\"": 12800}
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
