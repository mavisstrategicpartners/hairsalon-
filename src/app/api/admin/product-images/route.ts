import { recordAuditLog } from '@/lib/audit/log'
import { jsonError, jsonErrorFrom, jsonOk } from '@/lib/api/respond'
import { requireAdmin } from '@/lib/auth/require-admin'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

const BUCKET = 'product-images'
const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

/**
 * Reads the real image type from the file header. The browser-declared
 * Content-Type is attacker-controlled, and the bucket is public, so an HTML
 * payload labelled `image/png` would otherwise be served from the Supabase
 * domain. Only files whose bytes match a supported format are accepted.
 */
async function sniffImageType(file: File): Promise<string | null> {
  const header = new Uint8Array(await file.slice(0, 16).arrayBuffer())
  if (header.length < 12) return null

  const ascii = (start: number, end: number) =>
    String.fromCharCode(...Array.from(header.slice(start, end)))

  if (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) return 'image/jpeg'
  if (header[0] === 0x89 && ascii(1, 4) === 'PNG') return 'image/png'
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp'
  if (ascii(4, 8) === 'ftyp' && ['avif', 'avis'].includes(ascii(8, 12))) return 'image/avif'

  return null
}

function safeObjectPath(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_/]+/g, '-')
    .replace(/\.{2,}/g, '.')
    .replace(/^[-/.]+/, '')
  if (!cleaned) {
    throw new Error('empty path')
  }
  return cleaned
}

/**
 * Admin-only upload. The bucket is publicly readable but only reachable for
 * writes through the service-role key, which never leaves the server.
 */
export async function POST(request: Request) {
  try {
    const actor = await requireAdmin()

    const form = await request.formData().catch(() => null)
    if (!form) {
      return jsonError('Send the image as multipart/form-data.', 415)
    }

    const file = form.get('file')
    if (!(file instanceof File)) {
      return jsonError('A "file" field is required.', 422)
    }
    if (file.size > MAX_BYTES) {
      return jsonError('Image must be 5 MB or smaller.', 413)
    }

    const contentType = await sniffImageType(file)
    if (!contentType || !ALLOWED_TYPES.includes(contentType)) {
      return jsonError(`Unsupported image type. Allowed: ${ALLOWED_TYPES.join(', ')}.`, 415)
    }

    const requestedPath = form.get('path')
    const basePath =
      typeof requestedPath === 'string' && requestedPath.trim() ? requestedPath : file.name

    let objectPath: string
    try {
      objectPath = safeObjectPath(basePath)
    } catch {
      return jsonError('Invalid image path.', 422)
    }

    const upsert = form.get('upsert') === 'true'

    const admin = createSupabaseAdminClient()
    const { error } = await admin.storage
      .from(BUCKET)
      .upload(objectPath, file, { contentType, upsert })

    if (error) {
      return jsonError('Image could not be uploaded.', 502, error.message)
    }

    const {
      data: { publicUrl },
    } = admin.storage.from(BUCKET).getPublicUrl(objectPath)

    await recordAuditLog({
      actor,
      action: upsert ? 'product_image.replaced' : 'product_image.uploaded',
      entity: 'storage.product-images',
      entityId: objectPath,
      details: { size: file.size, content_type: contentType },
    })

    return jsonOk({ path: objectPath, publicUrl }, 201)
  } catch (error) {
    return jsonErrorFrom(error, 'Image could not be uploaded.')
  }
}

/** Admin-only delete, e.g. DELETE /api/admin/product-images?path=bundles/body-wave.webp */
export async function DELETE(request: Request) {
  try {
    const actor = await requireAdmin()

    const path = new URL(request.url).searchParams.get('path')
    if (!path) {
      return jsonError('A "path" query parameter is required.', 422)
    }

    let objectPath: string
    try {
      objectPath = safeObjectPath(path)
    } catch {
      return jsonError('Invalid image path.', 422)
    }

    const admin = createSupabaseAdminClient()
    const { error } = await admin.storage.from(BUCKET).remove([objectPath])

    if (error) {
      return jsonError('Image could not be deleted.', 502, error.message)
    }

    await recordAuditLog({
      actor,
      action: 'product_image.deleted',
      entity: 'storage.product-images',
      entityId: objectPath,
    })

    return jsonOk({ path: objectPath, deleted: true })
  } catch (error) {
    return jsonErrorFrom(error, 'Image could not be deleted.')
  }
}
