import Link from 'next/link'
import { buttonClass } from '@/components/site/Button'

export function HomeFloatCtas() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Link href="/shop" className={buttonClass('solid', 'min-w-[9.5rem]')}>
        Shop Hair
      </Link>
      <Link href="/contact" className={buttonClass('outline', 'min-w-[9.5rem]')}>
        Book a Service
      </Link>
    </div>
  )
}
