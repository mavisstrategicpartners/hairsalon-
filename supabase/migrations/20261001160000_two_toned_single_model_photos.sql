-- Malaysian Curls Two Toned: use the single-model photos from the client PDF instead of the group shots.

update public.products
set
  image = '/images/products/malaysian-curls-two-toned-32.jpg',
  specs = jsonb_set(
    specs,
    '{gallery}',
    '["/images/products/malaysian-curls-two-toned-32.jpg", "/images/products/malaysian-curls-two-toned-32-smile.jpg"]'::jsonb
  )
where slug = 'malaysian-curls-two-toned-32';
