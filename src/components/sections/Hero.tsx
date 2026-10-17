'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { StoreBadge } from '@/components/ui/StoreBadge'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { HeroVideo } from '@/components/sections/HeroVideo'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

type HeroProps = {
  version: string
  downloadUrl: string
}

export function Hero({ version, downloadUrl }: HeroProps) {
  const { t } = useLang()

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] py-1 pr-3 pl-1 text-[12.5px] font-medium text-[var(--muted)] ring-1 ring-[var(--border)]">
            <span className="rounded-full bg-[var(--ink)] px-2 py-0.5 text-[11px] font-semibold text-white">
              2.0
            </span>
            {t.hero.renamed}
          </p>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.98] font-extrabold tracking-[-0.035em] text-[var(--foreground)]">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-pretty text-[var(--muted)]">
            {t.hero.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={downloadUrl}
              external
              size="lg"
              aria-label={`${t.hero.downloadBtn} ${version}`}
            >
              <Download className="size-[18px]" aria-hidden />
              {t.hero.downloadBtn}
            </Button>
            <StoreBadge />
            <Button href={SITE.github} external size="lg" variant="secondary">
              <GitHubIcon />
              {t.hero.githubBtn}
            </Button>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[var(--muted)]">
            <li className="font-[family-name:var(--font-mono)] text-[12px]">v{version}</li>
            {t.hero.meta.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--iris)]" aria-hidden />
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <HeroVideo />
        </div>
      </Container>
    </section>
  )
}
