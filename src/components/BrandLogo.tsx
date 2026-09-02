import Image from 'next/image'

export const LOGO_SRC = '/biana-logo.png'
export const LOGO_ALT = 'Biana Hair Salon Logo'

type BrandLogoProps = {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export default function BrandLogo({
  className = 'h-16 w-auto object-contain md:h-20',
  width = 220,
  height = 120,
  priority = false,
  sizes = '(max-width: 768px) 150px, 220px',
}: BrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={LOGO_ALT}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  )
}
