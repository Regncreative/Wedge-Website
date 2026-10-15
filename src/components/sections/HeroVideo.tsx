'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/i18n'

/**
 * The motion piece: files wedged into shelf tabs on the screen edge, a
 * drawer, the logo. Silent and looping. For people who prefer less motion
 * it stays on its poster frame.
 */
export function HeroVideo() {
  const { t } = useLang()
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {
      // Autoplay refused (power saving): the poster stays.
    })
  }, [])

  return (
    <video
      ref={ref}
      className="aspect-[16/10] w-full rounded-[22px] bg-[var(--ink)] object-cover shadow-[var(--shadow-lg)] ring-1 ring-black/5"
      src="/video/wedge.mp4"
      poster="/video/wedge-poster.jpg"
      muted
      loop
      playsInline
      preload="auto"
      aria-label={t.hero.videoLabel}
    />
  )
}
