/**
 * Studio/mannequin WebPs that used to be Shop product photos. They are not
 * from the 11 September catalogue ZIP/WhatsApp set. The files were removed;
 * Shop still hides any product whose image path matches these names.
 */
export const AI_GENERATED_SHOP_IMAGES = new Set([
  '/images/products/wine-red-bob.webp',
  '/images/products/ombre-glueless.webp',
  '/images/products/waterwave-unit.webp',
  '/images/products/straight-full-frontal.webp',
  '/images/products/body-wave-bundle.webp',
])

function shopImageBasename(src: string): string {
  const path = src.split('?')[0]
  const file = path.split('/').pop() ?? ''
  return file.toLowerCase()
}

const AI_GENERATED_SHOP_IMAGE_FILES = new Set(
  [...AI_GENERATED_SHOP_IMAGES].map((src) => shopImageBasename(src)),
)

export function isAiGeneratedShopImage(src?: string | null): boolean {
  if (!src) return false
  if (AI_GENERATED_SHOP_IMAGES.has(src)) return true
  return AI_GENERATED_SHOP_IMAGE_FILES.has(shopImageBasename(src))
}
