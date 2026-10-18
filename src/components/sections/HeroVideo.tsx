'use client'

import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLang, type Lang } from '@/lib/i18n'

/**
 * The hero shows the silent motion loop; "Watch the film" swaps in the
 * 56-second film with voice, and "What's new" the 45-second 2.1 video, in
 * the reader's language. Each loads only then. For people who prefer less
 * motion the loop stays on its poster.
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
        news={t.film.news}
        newsLabel={t.film.newsLabel}
      />
    </div>
  )
}

function Player({
  lang,
  loopLabel,
  filmLabel,
  play,
  news,
  newsLabel,
}: {
  lang: Lang
  loopLabel: string
  filmLabel: string
  play: string
  news: string
  newsLabel: string
}) {
  const loop = useRef<HTMLVideoElement>(null)
  const [film, setFilm] = useState<'film' | 'news' | null>(null)

  useEffect(() => {
    const video = loop.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {
      // Autoplay refused (power saving): the poster stays.
    })
  }, [])

  if (film) {
    const name = film === 'film' ? `wedge-film-${lang}` : `wedge-21-${lang}`
    return (
      <video
        className="size-full bg-black object-contain"
        src={`/video/${name}.mp4${film === 'film' ? '?v=720' : ''}`}
        poster={`/video/${name}.jpg`}
        autoPlay
        controls
        playsInline
        aria-label={film === 'film' ? filmLabel : newsLabel}
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
      <div className="absolute right-[5%] bottom-[6%] left-[5%] flex flex-wrap-reverse items-center gap-2.5">
        <button
          type="button"
          onClick={() => setFilm('film')}
          className="group flex items-center gap-3 rounded-full bg-white/95 py-2.5 pr-5 pl-2.5 text-[15px] font-semibold text-[var(--ink)] shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform hover:scale-[1.04] focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
        >
          <span className="grid size-10 place-items-center rounded-full bg-[var(--accent)] text-white">
            <Play className="size-[18px] translate-x-[1px] fill-current" aria-hidden />
          </span>
          {play}
          <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--muted)]">
            0:56
          </span>
        </button>
        <button
          type="button"
          onClick={() => setFilm('news')}
          aria-label={newsLabel}
          className="flex items-center gap-2.5 rounded-full bg-white/85 py-2 pr-4 pl-2 text-[14px] font-semibold text-[var(--ink)] shadow-[0_18px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5 transition-transform hover:scale-[1.04] focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
        >
          <span className="rounded-full bg-[var(--ink)] px-2 py-0.5 text-[11px] font-bold text-white">
            2.1
          </span>
          {news}
          <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--muted)]">
            0:45
          </span>
        </button>
      </div>
    </>
  )
}
