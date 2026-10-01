/**
 * Product Detail uses cleaned copies when they exist.
 * Shop cards and catalogue data keep the original photographs.
 */
const CLEANED_PRODUCT_FILES = new Set([
  'brazilian-body-wave-1.jpg',
  'malaysian-deep-curl-32.jpg',
  'italian-curls-18.jpg',
  'bounce-curls-16.jpg',
  'malaysian-loose-curl-wig-30.jpg',
])

const PRODUCT_DIR = '/images/products/'
const CLEAN_DIR = `${PRODUCT_DIR}clean/`

export function isCleanedProductImage(src?: string | null): boolean {
  return Boolean(src?.startsWith(CLEAN_DIR))
}

export function toProductDetailImage(src: string): string {
  const path = src.split('?')[0]
  if (!path.startsWith(PRODUCT_DIR) || path.startsWith(CLEAN_DIR)) return src
  const file = path.slice(PRODUCT_DIR.length)
  if (file.includes('/') || !CLEANED_PRODUCT_FILES.has(file)) return src
  return `${CLEAN_DIR}${file}`
}
