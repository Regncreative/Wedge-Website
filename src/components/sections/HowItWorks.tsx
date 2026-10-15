'use client'

import { ArrowRight, Hand, MousePointer2 } from 'lucide-react'
import { FadeIn } from '@/components/motion/FadeIn'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

// The three steps really are a sequence, so they are numbered.
const ICONS = [MousePointer2, Hand, ArrowRight]
const COLORS = ['var(--iris)', 'var(--rose)', 'var(--saffron)']

export function HowItWorks() {
  const { t } = useLang()

  return (
    <Section id="how" eyebrow={t.how.eyebrow} title={t.how.title} description={t.how.description}>
      <ol className="grid gap-4 md:grid-cols-3">
        {t.how.steps.map((step, i) => {
          const Icon = ICONS[i]
          return (
            <li key={step.title}>
              <FadeIn
                delay={i * 0.06}
                className="flex h-full flex-col gap-4 rounded-[20px] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-11 place-items-center rounded-[13px] text-[var(--ink)]"
                    style={{ background: COLORS[i] }}
                  >
                    <Icon className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--muted)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[21px] font-bold tracking-tight">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--muted)]">{step.body}</p>
              </FadeIn>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
