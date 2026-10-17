'use client'

import Image from 'next/image'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

// Microsoft's own "Get it from Microsoft" badges (public/badges), 44px tall,
// drawn at the height of a large button.
const WIDTH = { en: 161, tr: 180 } as const
const HEIGHT = 48

/** A link to Wedge Shelf in the Microsoft Store. */
export function StoreBadge({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  const { lang, t } = useLang()
  return (
    <a
      href={SITE.msStore}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex rounded-[9px] transition-[opacity,transform] duration-200 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-[0.98]',
        className,
      )}
    >
      <Image
        src={`/badges/ms-store-${lang}-${tone}.svg`}
        alt={t.store.badgeAlt}
        width={Math.round((WIDTH[lang] * HEIGHT) / 44)}
        height={HEIGHT}
      />
    </a>
  )
}
