-- Retire the old catalogue: the original demo products and the brown-background
-- desk-photo duplicates. Rows are deactivated, not deleted, so past orders keep
-- their product references.

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
  'malaysian-loose-curl-micro-24',
  'bouncy-body-wave-colour',
  'crochet-hair-colour',
  'raw-water-wave-micro-bonding'
);

-- Remaining 11 September products use their white studio photograph only.
update public.products as p
set
  image = v.image,
  specs = jsonb_set(coalesce(p.specs, '{}'::jsonb), '{gallery}', jsonb_build_array(v.image))
from (
  values
    ('brazilian-body-wave', '/images/products/brazilian-body-wave-1.jpg'),
    ('brazilian-body-wave-2tone', '/images/products/brazilian-body-wave-2tone.jpg'),
    ('brazilian-body-wave-micro-22', '/images/products/brazilian-body-wave-micro-22.jpg'),
    ('brazilian-straight-micro-26', '/images/products/brazilian-straight-micro-26.jpg'),
    ('malaysian-loose-curl-water-wig-30', '/images/products/malaysian-loose-curl-wig-30.jpg'),
    ('malaysian-loose-curl-26', '/images/products/malaysian-loose-curl-26.jpg'),
    ('italian-curls', '/images/products/italian-curls-18.jpg'),
    ('italian-curls-micro-28', '/images/products/italian-curls-micro-28.jpg'),
    ('raw-kinky-straight-14', '/images/products/raw-kinky-straight-14.jpg'),
    ('kinky-straight-micro-22', '/images/products/kinky-straight-micro-22.jpg'),
    ('bouncy-body-wave-30', '/images/products/bouncy-body-wave.jpg'),
    ('bounce-curls-16', '/images/products/bounce-curls-16.jpg'),
    ('raw-hair-20', '/images/products/raw-hair-20.jpg'),
    ('raw-colour-maroon-20', '/images/products/raw-colour-maroon-20.jpg'),
    ('raw-water-wave-platinum-28', '/images/products/raw-water-wave-platinum-28.jpg'),
    ('brazilian-water-wave-crochet-24', '/images/products/brazilian-water-wave-crochet-24.jpg'),
    ('brazilian-kinky-deep-22', '/images/products/brazilian-kinky-deep-22.jpg')
) as v(slug, image)
where p.slug = v.slug;
