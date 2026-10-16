'use client'

import Image from 'next/image'
import { FadeIn } from '@/components/motion/FadeIn'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

/** Screenshots taken from the app itself (tests/e2e/screens.spec.ts), in the reader's language. */
export function Screens() {
  const { t } = useLang()

  return (
    <Section
      id="screens"
      eyebrow={t.screens.eyebrow}
      title={t.screens.title}
      description={t.screens.description}
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-10">
        {t.screens.items.map((item, i) => (
          <li key={item.src}>
            <FadeIn delay={(i % 3) * 0.06}>
              <figure>
                <div className="overflow-hidden rounded-[22px] bg-[var(--ink)] shadow-[var(--shadow-md)] ring-1 ring-[var(--border)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={1500}
                    className="h-auto w-full"
                    sizes="(max-width: 1024px) 46vw, 380px"
                  />
                </div>
                <figcaption className="mt-3.5 px-1">
                  <span className="block text-[15px] font-semibold tracking-tight text-[var(--foreground)]">
                    {item.caption}
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-snug text-[var(--muted)]">
                    {item.body}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          </li>
        ))}
      </ul>
    </Section>
  )
}
