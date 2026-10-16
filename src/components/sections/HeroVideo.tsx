'use client'

import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLang, type Lang } from '@/lib/i18n'

/**
 * The hero shows the silent motion loop; "Watch the film" swaps in the
 * 56-second film with voice, in the reader's language. The film loads only
 * then. For people who prefer less motion the loop stays on its poster.
 */
export function HeroVideo() {
  const { t, lang } = useLang()

  return (
    <div
      id="film"
      className="relative aspect-video scroll-mt-24 overflow-hidden rounded-[22px] bg-[var(--ink)] shadow-[var(--shadow-lg)] ring-1 ring-black/5"
    >
      {/* A new language starts over with that language's film. */}
      <Player
        key={lang}
        lang={lang}
        loopLabel={t.hero.videoLabel}
        filmLabel={t.film.label}
        play={t.film.play}
      />
    </div>
  )
}

function Player({
  lang,
  loopLabel,
  filmLabel,
  play,
}: {
  lang: Lang
  loopLabel: string
  filmLabel: string
  play: string
}) {
  const loop = useRef<HTMLVideoElement>(null)
  const [film, setFilm] = useState(false)

  useEffect(() => {
    const video = loop.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {
      // Autoplay refused (power saving): the poster stays.
    })
  }, [])

  if (film) {
    return (
      <video
        className="size-full bg-black object-contain"
        src={`/video/wedge-film-${lang}.mp4?v=720`}
        poster={`/video/wedge-film-${lang}.jpg`}
        autoPlay
        controls
        playsInline
        aria-label={filmLabel}
      />
    )
  }

  return (
    <>
      <video
        ref={loop}
        className="size-full object-cover"
        src="/video/wedge.mp4"
        poster="/video/wedge-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-label={loopLabel}
      />
      <button
        type="button"
        onClick={() => setFilm(true)}
        className="group absolute bottom-[6%] left-[5%] flex items-center gap-3 rounded-full bg-white/95 py-2.5 pr-5 pl-2.5 text-[15px] font-semibold text-[var(--ink)] shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform hover:scale-[1.04] focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
      >
        <span className="grid size-10 place-items-center rounded-full bg-[var(--accent)] text-white">
          <Play className="size-[18px] translate-x-[1px] fill-current" aria-hidden />
        </span>
        {play}
        <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--muted)]">
          0:56
        </span>
      </button>
    </>
  )
}
