'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { FlagEn, FlagTr } from '@/components/icons/flags'
import { InstallInfoButton, InstallModal } from '@/components/sections/InstallModal'
import { SITE } from '@/lib/constants'
import { useLang, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

type NavbarProps = {
  downloadUrl: string
}

export function Navbar({ downloadUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [installOpen, setInstallOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const links = [
    { href: '#how', label: t.nav.how },
    { href: '#features', label: t.nav.features },
    { href: '#screens', label: t.nav.screens },
    { href: '#download', label: t.nav.download },
    { href: '#faq', label: t.nav.faq },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <header
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled
            ? 'border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Wedge home">
            <Image src="/brand/logo.png" alt="" width={30} height={30} className="rounded-[8px]" />
            <span className="font-[family-name:var(--font-display)] text-[19px] font-extrabold tracking-[-0.02em] text-[var(--foreground)]">
              Wedge
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-black/[0.04] hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <div
              className="flex items-center gap-0.5 rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.06]"
              role="group"
              aria-label="Language"
            >
              {(
                [
                  { code: 'en', label: 'English', Flag: FlagEn },
                  { code: 'tr', label: 'Türkçe', Flag: FlagTr },
                ] as Array<{ code: Lang; label: string; Flag: typeof FlagEn }>
              ).map(({ code, label, Flag }) => (
                <button
                  key={code}
                  type="button"
                  aria-label={label}
                  aria-pressed={lang === code}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11px] font-semibold uppercase transition-all',
                    lang === code
                      ? 'bg-white text-[var(--foreground)] shadow-sm ring-1 ring-black/[0.06]'
                      : 'text-[var(--muted)] opacity-60 hover:opacity-100',
                  )}
                  onClick={() => setLang(code)}
                >
                  <Flag className="rounded-[3px]" />
                  <span className="hidden lg:inline">{code}</span>
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-1 sm:flex">
              <InstallInfoButton onClick={() => setInstallOpen(true)} />
              <Button
                href={SITE.github}
                external
                variant="ghost"
                className="hidden h-9 px-2.5 sm:inline-flex"
                aria-label="View Wedge on GitHub"
              >
                <GitHubIcon />
                GitHub
              </Button>
            </div>

            <Button
              href={downloadUrl}
              external
              size="md"
              className="px-3.5 sm:px-5"
              aria-label="Download the latest Wedge release"
            >
              <Download className="size-4" aria-hidden />
              <span className="hidden sm:inline">{t.nav.downloadBtn}</span>
            </Button>
          </div>
        </Container>
      </header>

      <InstallModal
        open={installOpen}
        onClose={() => setInstallOpen(false)}
        downloadUrl={downloadUrl}
      />
    </div>
  )
}
