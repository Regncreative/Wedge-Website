'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Volume2, VolumeX, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useLang } from '@/lib/i18n'

// The film greets each visit once; closing it is remembered for the session.
const KEY = 'wedge-intro-dismissed'
const listeners = new Set<() => void>()
let dismissedHere = false // when storage is blocked

function isDismissed() {
  try {
    return dismissedHere || sessionStorage.getItem(KEY) === '1'
  } catch {
    return dismissedHere
  }
}
function dismiss() {
  dismissedHere = true
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    // Remembered for this page only.
  }
  listeners.forEach((l) => l())
}
function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** The 56-second film over the page on arrival, muted, with a way straight to the site. */
export function IntroFilm() {
  const { t, lang } = useLang()
  // Closed on the server; opens after hydration unless already dismissed.
  const open = !useSyncExternalStore(subscribe, isDismissed, () => true)
  const reduceMotion = useReducedMotion()
  const video = useRef<HTMLVideoElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!open) return
    const scroll = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    // Focus moves into the dialog (Tab reaches its buttons) without a ring on a button.
    card.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = scroll
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggleSound = () => {
    const v = video.current
    if (!v) return
    v.muted = !muted
    if (v.paused) v.play().catch(() => undefined)
    setMuted(!muted)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-film-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#0b0c11]/80 backdrop-blur-md"
            onClick={dismiss}
            aria-label={t.intro.close}
            tabIndex={-1}
          />
          <motion.div
            ref={card}
            tabIndex={-1}
            className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-[var(--ink)] shadow-[0_40px_100px_rgba(0,0,0,0.65)] outline-none"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Image
                  src="/brand/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  className="shrink-0 rounded-[7px]"
                />
                <div className="min-w-0">
                  <p id="intro-film-title" className="truncate text-sm font-semibold text-white">
                    {t.intro.title}
                  </p>
                  <p className="truncate text-[11px] text-white/45">{t.intro.note}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/[0.08] hover:text-white"
                aria-label={t.intro.close}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <video
                key={lang}
                ref={video}
                className="size-full object-contain"
                src={`/video/wedge-film-${lang}.mp4`}
                poster={`/video/wedge-film-${lang}.jpg`}
                autoPlay={!reduceMotion}
                muted={muted}
                playsInline
                controls
                preload="metadata"
                aria-label={t.film.label}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3 sm:px-5">
              <p className="text-[12px] text-white/45">{t.intro.hint}</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/5"
                >
                  {muted ? (
                    <VolumeX className="size-4" aria-hidden />
                  ) : (
                    <Volume2 className="size-4" aria-hidden />
                  )}
                  {muted ? t.intro.unmute : t.intro.mute}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="inline-flex items-center rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--accent-glow)] transition hover:brightness-110"
                >
                  {t.intro.continue}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
