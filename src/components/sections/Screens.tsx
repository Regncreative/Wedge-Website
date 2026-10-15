'use client'

import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

export function Screens() {
  const { t } = useLang()

  return (
    <Section
      id="screens"
      eyebrow={t.screens.eyebrow}
      title={t.screens.title}
      description={t.screens.description}
    >
      {/* Screenshots are tall; on narrow screens they scroll sideways in their own row. */}
      <div className="-mx-5 [scrollbar-width:thin] overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
        <ul className="flex w-max gap-5">
          {t.screens.items.map((item) => (
            <li key={item.src} className="w-[min(72vw,260px)] shrink-0">
              <figure>
                <div className="overflow-hidden rounded-[18px] bg-[var(--ink)] ring-1 ring-[var(--border)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={512}
                    height={684}
                    className="h-auto w-full"
                    sizes="(max-width: 640px) 72vw, 260px"
                  />
                </div>
                <figcaption className="mt-3 text-[13.5px] font-medium text-[var(--muted)]">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
