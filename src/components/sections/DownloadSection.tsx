'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { InstallModal } from '@/components/sections/InstallModal'
import { StoreBadge } from '@/components/ui/StoreBadge'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

type DownloadSectionProps = {
  version: string
  downloadUrl: string
  releaseUrl: string
}

export function DownloadSection({ version, downloadUrl, releaseUrl }: DownloadSectionProps) {
  const { t } = useLang()
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <section id="download" className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--ink)] px-6 py-12 text-white sm:px-12 sm:py-14">
          {/* The tabs, coming out of the band's right edge. */}
          <div
            className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 gap-3 lg:grid"
            aria-hidden
          >
            {[
              ['var(--iris)', 210],
              ['var(--rose)', 270],
              ['var(--saffron)', 180],
            ].map(([color, w]) => (
              <span
                key={color as string}
                className="ml-auto block h-12 rounded-l-[18px] opacity-90"
                style={{ background: color as string, width: w as number }}
              />
            ))}
          </div>

          <div className="relative max-w-xl">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt=""
                width={44}
                height={44}
                className="rounded-[11px]"
              />
              <p className="eyebrow text-white/50">{t.download.eyebrow}</p>
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
              {t.download.title}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-pretty text-white/65">
              {t.download.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={downloadUrl}
                external
                size="lg"
                aria-label={`${t.download.downloadBtn} ${version}`}
              >
                <Download className="size-[18px]" aria-hidden />
                {t.download.downloadBtn}
                <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium opacity-75">
                  v{version}
                </span>
              </Button>
              <StoreBadge tone="light" />
              <Button
                href={releaseUrl || SITE.releases}
                external
                size="lg"
                variant="secondary"
                className="bg-white/8 text-white ring-white/12 hover:bg-white/12"
              >
                {t.download.releasesBtn}
              </Button>
            </div>

            <ul className="mt-7 grid gap-2 text-[14px] text-white/70 sm:grid-cols-3">
              {t.download.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <Check
                    className="size-4 shrink-0 text-[var(--mint)]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-1.5 border-t border-white/10 pt-6 text-[14px] text-white/60">
              <p>{t.download.renamed}</p>
              <p>
                <button
                  type="button"
                  onClick={() => setHelpOpen(true)}
                  className="text-left underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  {t.download.smartscreen}
                </button>
              </p>
              <p>{t.download.store}</p>
            </div>
          </div>
        </div>
      </Container>
      <InstallModal open={helpOpen} onClose={() => setHelpOpen(false)} downloadUrl={downloadUrl} />
    </section>
  )
}
