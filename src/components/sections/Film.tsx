'use client'

import { Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { FadeIn } from '@/components/motion/FadeIn'
import { Section } from '@/components/ui/Section'
import { useLang, type Lang } from '@/lib/i18n'

/** The 56-second film, with voice, in the reader's language. Nothing loads until it is played. */
export function Film() {
  const { t, lang } = useLang()

  return (
    <Section
      id="film"
      eyebrow={t.film.eyebrow}
      title={t.film.title}
      description={t.film.description}
    >
      <FadeIn className="mx-auto max-w-5xl">
        {/* A new language starts over with that language's film. */}
        <Player key={lang} lang={lang} label={t.film.label} play={t.film.play} />
      </FadeIn>
    </Section>
  )
}

function Player({ lang, label, play }: { lang: Lang; label: string; play: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const start = () => {
    setStarted(true)
    ref.current?.play().catch(() => {
      // Playback refused: the controls are there now.
    })
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-[24px] bg-[var(--ink)] shadow-[var(--shadow-lg)] ring-1 ring-black/5">
      <video
        ref={ref}
        className="size-full"
        src={`/video/wedge-film-${lang}.mp4`}
        poster={`/video/wedge-film-${lang}.jpg`}
        preload="none"
        playsInline
        controls={started}
        aria-label={label}
      />
      {started ? null : (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 flex items-end justify-start p-[5.5%] focus-visible:outline-none"
          aria-label={`${play}: ${label}`}
        >
          {/* Bottom left, where the poster has room for it. */}
          <span className="flex items-center gap-3 rounded-full bg-white/95 py-3 pr-6 pl-3 text-[15px] font-semibold text-[var(--ink)] shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform group-hover:scale-[1.04] group-focus-visible:ring-4 group-focus-visible:ring-[var(--accent)]">
            <span className="grid size-11 place-items-center rounded-full bg-[var(--accent)] text-white">
              <Play className="size-5 translate-x-[1px] fill-current" aria-hidden />
            </span>
            {play}
            <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--muted)]">
              0:56
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
