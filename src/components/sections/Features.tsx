'use client'

import { Check } from 'lucide-react'
import { FadeIn } from '@/components/motion/FadeIn'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

// Each group is headed by a shelf tab in the app's tab colors.
const TAB_COLORS = ['var(--iris)', 'var(--rose)', 'var(--saffron)', 'var(--paper)']

export function Features() {
  const { t } = useLang()

  return (
    <Section
      id="features"
      eyebrow={t.features.eyebrow}
      title={t.features.title}
      description={t.features.description}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {t.features.groups.map((group, i) => (
          <FadeIn
            key={group.title}
            delay={(i % 2) * 0.06}
            className="overflow-hidden rounded-[20px] bg-[var(--surface)] pb-6 ring-1 ring-[var(--border)]"
          >
            <h3
              className="mt-5 ml-auto w-fit rounded-l-[12px] py-2 pr-6 pl-4 text-[15px] font-bold text-[var(--ink)]"
              style={{ background: TAB_COLORS[i] }}
            >
              {group.title}
            </h3>
            <ul className="mt-4 grid gap-3 px-6">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-snug text-[var(--foreground)]"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[var(--accent)]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
