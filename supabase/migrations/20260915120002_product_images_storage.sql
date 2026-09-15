-- Public-read storage bucket for product photography.
-- Uploads, replacements and deletions are server-only (service-role key).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- storage.objects already has RLS enabled by Supabase.
drop policy if exists "Product images are publicly readable" on storage.objects;
create policy "Product images are publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- Deliberately no INSERT/UPDATE/DELETE policies for anon or authenticated:
-- the service-role key bypasses RLS, so only trusted server code can write.
