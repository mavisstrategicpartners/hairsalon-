/**
 * Shop hides these slugs. Supabase rows are not deleted.
 * Includes SKUs with no matching real ZIP/catalogue photograph.
 */
export const REMOVED_FROM_SHOP = new Set([
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
  'bouncy-body-wave-colour',
  'crochet-hair-colour',
  'raw-water-wave-micro-bonding',
])
