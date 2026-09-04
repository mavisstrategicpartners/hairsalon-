import Link from 'next/link'
import { buttonClass } from '@/components/site/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl italic tracking-tight">404</h1>
        <h2 className="mt-4 font-display text-xl italic">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link href="/" className={buttonClass('solid')}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
