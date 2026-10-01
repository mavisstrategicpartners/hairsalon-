-- Restore the 11 September price-list options that have no other product:
-- bouncy body wave colour, crochet hair colour, raw water wave micro bonding,
-- and add the 2 toned Malesian curly water wave. White studio photographs only.

update public.products as p
set
  active = true,
  price = v.price,
  length = v.length,
  image = v.image,
  specs = jsonb_set(coalesce(p.specs, '{}'::jsonb) - 'price', '{gallery}', jsonb_build_array(v.image))
from (
  values
    ('bouncy-body-wave-colour', 4500, '8"', '/images/products/bouncy-body-wave.jpg'),
    ('crochet-hair-colour', 2300, '6"', '/images/products/crochet-hair-colour.jpg'),
    ('raw-water-wave-micro-bonding', 6900, null, '/images/products/raw-water-wave-platinum-28.jpg')
) as v(slug, price, length, image)
where p.slug = v.slug;

insert into public.products (slug, name, price, category, tag, image, description, length, lengths, specs, active)
values (
  'malesian-curly-water-wave-2tone',
  '2 toned Malesian curly water wave',
  2800,
  'Bundles',
  '2 tone',
  '/images/products/malaysian-curly-water-wave.jpg',
  'Malesian curly water wave. Add an additional R300 to price for 2 toned.',
  '6"',
  array['6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"', '34"', '36"', '38"'],
  '{
    "origin": "Malaysian",
    "texture": "Curly water wave",
    "colour": "2 toned",
    "gallery": ["/images/products/malaysian-curly-water-wave.jpg"],
    "length_prices": {
      "6\"": 2800, "8\"": 3300, "10\"": 3650, "12\"": 3900, "14\"": 4100,
      "16\"": 4500, "18\"": 4800, "20\"": 5000, "22\"": 5400, "24\"": 5700,
      "26\"": 6200, "28\"": 6900, "30\"": 7300, "32\"": 7600, "34\"": 7900,
      "36\"": 8700, "38\"": 8900
    }
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
