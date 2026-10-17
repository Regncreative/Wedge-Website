'use client'

import { useEffect, useId } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StoreBadge } from '@/components/ui/StoreBadge'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

type InstallModalProps = {
  open: boolean
  onClose: () => void
  downloadUrl: string
}

export function InstallModal({ open, onClose, downloadUrl }: InstallModalProps) {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()
  const titleId = useId()
  const copy = t.install

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-label={copy.close}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(720px,calc(100vh-2rem))] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl bg-[#1c1c1e] text-[#f5f5f7] shadow-[0_28px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5">
              <h2 id={titleId} className="text-[15px] font-semibold tracking-tight">
                {copy.title}
              </h2>
              <button
                type="button"
                className="rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/8 hover:text-white"
                aria-label={copy.close}
                onClick={onClose}
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            <div className="min-h-0 flex-1 [scrollbar-width:none] overflow-y-auto px-5 py-4 text-[13.5px] leading-relaxed text-white/75 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <p className="text-pretty">{copy.intro}</p>

              <ol className="mt-4 list-decimal space-y-2.5 pl-5 marker:text-white/40">
                {copy.steps.map((step, i) => (
                  <li key={i}>
                    <StepText text={step} />
                  </li>
                ))}
              </ol>

              <p className="mt-5 font-semibold text-white/90">{copy.blockedTitle}</p>
              <p className="mt-1.5 text-pretty">
                <StepText text={copy.blockedBody} />
              </p>

              <p className="mt-5 font-semibold text-white/90">{copy.whyTitle}</p>
              <p className="mt-1.5 text-pretty">{copy.whyBody}</p>

              <p className="mt-5 text-pretty text-white/90">{copy.storeTip}</p>
              <StoreBadge tone="light" className="mt-3" />
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-white/8 px-5 py-3.5">
              <Button
                href={SITE.github}
                external
                variant="secondary"
                size="md"
                className="h-9 rounded-full bg-white/8 px-4 text-[12.5px] text-white ring-white/10 hover:bg-white/12"
              >
                {copy.source}
              </Button>
              <Button
                href={downloadUrl}
                external
                variant="secondary"
                size="md"
                className="h-9 rounded-full bg-white/8 px-4 text-[12.5px] text-white ring-white/10 hover:bg-white/12"
              >
                {copy.release}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/** Renders `**bold**` and `` `code` `` markers from translation strings. */
function StepText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white/90"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export function InstallInfoButton({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) {
  const { t } = useLang()

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.install.open}
      className={cn(
        'inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] leading-none font-semibold text-[var(--foreground)]/70 ring-1 ring-black/20 transition-colors hover:bg-black/[0.05] hover:text-[var(--foreground)] hover:ring-black/30',
        className,
      )}
    >
      i
    </button>
  )
}
