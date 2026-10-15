'use client'

import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

export function Footer() {
  const { t } = useLang()

  const links = [
    { href: SITE.github, label: t.footer.github },
    { href: SITE.releases, label: t.footer.releases },
    { href: SITE.privacy, label: t.footer.privacy },
    { href: SITE.license, label: t.footer.license },
  ]

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="" width={28} height={28} className="rounded-[7px]" />
          <div>
            <p className="font-[family-name:var(--font-display)] text-[15px] font-extrabold tracking-tight">
              Wedge
            </p>
            <p className="text-xs text-[var(--muted)]">
              {SITE.author} ·{' '}
              <a
                href={SITE.productHunt}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--foreground)]"
              >
                {t.footer.formerly}
              </a>
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-5" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
