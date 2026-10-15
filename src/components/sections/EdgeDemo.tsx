'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import {
  Briefcase,
  Clock,
  FileSpreadsheet,
  FileText,
  Heart,
  Image as ImageIcon,
  Inbox,
  Presentation,
  RotateCcw,
  X,
} from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/*
 * A small working copy of Wedge on a pretend desktop: shelf tabs tucked into
 * the right edge come out while a file is dragged, take the drop, and open
 * as a drawer whose cards can be dragged back out. Pointer events (mouse and
 * touch); Enter on a file shelves it, Enter on a card puts it back.
 */

type Kind = 'pdf' | 'image' | 'slides' | 'sheet'
// Names come from the current language (t.demo.desktop), by id.
type DemoFile = { id: string; kind: Kind }
// x in pixels from the left (so files never overlap on a narrow stage), y in percent.
type Placed = DemoFile & { x: number; y: number }
type Mode = 'idle' | 'peek' | 'drag' | 'open'
type Step = 'drag' | 'drop' | 'open' | 'out' | 'done'

const KINDS: Kind[] = ['pdf', 'image', 'slides', 'sheet']
const SPOTS = [
  { x: 18, y: 12 },
  { x: 18, y: 40 },
  { x: 120, y: 12 },
  { x: 120, y: 40 },
]
const SHELF_STYLE: Record<string, { color: string; Icon: typeof Inbox }> = {
  pocket: { color: 'var(--paper)', Icon: Inbox },
  work: { color: 'var(--iris)', Icon: Briefcase },
  personal: { color: 'var(--rose)', Icon: Heart },
  temp: { color: 'var(--saffron)', Icon: Clock },
}
const KIND_STYLE: Record<Kind, { bg: string; Icon: typeof FileText }> = {
  pdf: { bg: '#e5484d', Icon: FileText },
  image: { bg: '#3e9b8f', Icon: ImageIcon },
  slides: { bg: '#e2733a', Icon: Presentation },
  sheet: { bg: '#2f9e5b', Icon: FileSpreadsheet },
}

type Drag = {
  file: DemoFile
  from: string // 'desktop' or a shelf id
  x: number
  y: number
  started: boolean
  startX: number
  startY: number
}

const freshDesktop = (): Placed[] => KINDS.map((kind, i) => ({ id: `f${i}`, kind, ...SPOTS[i] }))

function FileGlyph({ kind, size = 40 }: { kind: Kind; size?: number }) {
  const { bg, Icon } = KIND_STYLE[kind]
  return (
    <span
      className="relative grid shrink-0 place-items-center rounded-[9px] shadow-[0_6px_14px_rgba(0,0,0,.28)]"
      style={{ width: size * 0.82, height: size, background: '#f6f5f1' }}
      aria-hidden
    >
      <span
        className="absolute top-0 right-0 rounded-tr-[9px] rounded-bl-[6px]"
        style={{ width: size * 0.26, height: size * 0.26, background: '#dcd8cf' }}
      />
      <span
        className="grid place-items-center rounded-[6px] text-white"
        style={{ width: size * 0.5, height: size * 0.5, background: bg }}
      >
        <Icon size={size * 0.3} strokeWidth={2.2} />
      </span>
    </span>
  )
}

export function EdgeDemo() {
  const { t } = useLang()
  const stageRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(640)
  const [mode, setMode] = useState<Mode>('idle')
  const [active, setActive] = useState<string | null>(null)
  const [target, setTarget] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [bump, setBump] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('drag')
  const [drag, setDrag] = useState<Drag | null>(null)
  const dragRef = useRef<Drag | null>(null)
  const tuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const nameOf = (f: DemoFile) => t.demo.desktop[Number(f.id.slice(1))]
  const [desktop, setDesktop] = useState<Placed[]>(freshDesktop)
  const [shelves, setShelves] = useState<Record<string, DemoFile[]>>({
    pocket: [],
    work: [],
    personal: [],
    temp: [],
  })

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const tabW = Math.round(Math.min(156, Math.max(112, width * 0.3)))
  const drawerW = Math.round(Math.min(300, Math.max(200, width * 0.48)))
  const tail = 22

  const later = (fn: () => void, ms: number) => {
    if (tuckTimer.current) clearTimeout(tuckTimer.current)
    tuckTimer.current = setTimeout(fn, ms)
  }
  useEffect(() => () => void (tuckTimer.current && clearTimeout(tuckTimer.current)), [])

  const flash = (id: string) => {
    setBump(id)
    setTimeout(() => setBump((b) => (b === id ? null : b)), 650)
  }

  /** Move a file onto a shelf (from the desktop or another shelf). */
  const shelve = (file: DemoFile, from: string, to: string) => {
    if (from === to) return
    if (from === 'desktop') setDesktop((d) => d.filter((f) => f.id !== file.id))
    setShelves((s) => {
      const next = { ...s }
      if (from !== 'desktop') next[from] = next[from].filter((f) => f.id !== file.id)
      next[to] = [...next[to], file]
      return next
    })
    flash(to)
    setStep((st) => (st === 'drag' || st === 'drop' ? 'open' : st))
  }

  /** Put a file from a shelf back on the desktop, at x (pixels) and y (percent). */
  const unshelve = (file: DemoFile, from: string, x: number, y: number) => {
    setShelves((s) => ({ ...s, [from]: s[from].filter((f) => f.id !== file.id) }))
    setDesktop((d) => [
      ...d,
      { ...file, x: Math.min(width - tabW - 110, Math.max(8, x)), y: Math.min(62, Math.max(4, y)) },
    ])
    setStep('done')
  }

  const dropTargetAt = (clientX: number, clientY: number) => {
    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null
    const hit = el?.closest<HTMLElement>('[data-drop]')?.dataset.drop
    if (hit) return hit
    // Near the edge, the closest tab takes it: a quick drag can end before
    // the tabs are out, or between two of them.
    const stage = stageRef.current?.getBoundingClientRect()
    if (!stage || clientX < stage.right - tabW - 24) return null
    let best: { id: string; dist: number } | null = null
    for (const tab of stageRef.current!.querySelectorAll<HTMLElement>('nav [data-drop]')) {
      const r = tab.getBoundingClientRect()
      const dist = Math.abs(clientY - (r.top + r.height / 2))
      if (dist < r.height && (!best || dist < best.dist)) best = { id: tab.dataset.drop!, dist }
    }
    return best?.id ?? null
  }

  const onPointerDown = (e: ReactPointerEvent, file: DemoFile, from: string) => {
    if (e.button !== 0) return
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    const rect = stageRef.current!.getBoundingClientRect()
    const d: Drag = {
      file,
      from,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      started: false,
      startX: e.clientX,
      startY: e.clientY,
    }
    dragRef.current = d
    setDrag(d)
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = dragRef.current
    if (!d) return
    const rect = stageRef.current!.getBoundingClientRect()
    const moved = Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 5
    const next = {
      ...d,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      started: d.started || moved,
    }
    if (next.started && !d.started) {
      if (tuckTimer.current) clearTimeout(tuckTimer.current)
      // The shell's drag picture appears: the tabs come out.
      if (mode !== 'open') setMode('drag')
      setStep((st) => (st === 'drag' ? 'drop' : st))
    }
    dragRef.current = next
    setDrag(next)
    if (next.started) setTarget(dropTargetAt(e.clientX, e.clientY))
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    const d = dragRef.current
    dragRef.current = null
    setDrag(null)
    setTarget(null)
    if (!d || !d.started) return
    const to = dropTargetAt(e.clientX, e.clientY)
    if (to) {
      shelve(d.file, d.from, to)
    } else if (d.from !== 'desktop') {
      const rect = stageRef.current!.getBoundingClientRect()
      unshelve(d.file, d.from, d.x - 48, (d.y / rect.height) * 100 - 10)
    }
    if (mode !== 'open') later(() => setMode((m) => (m === 'drag' ? 'idle' : m)), to ? 800 : 250)
  }

  const toggleShelf = (id: string) => {
    if (mode === 'open' && active === id) {
      setMode('idle')
      return
    }
    setActive(id)
    setMode('open')
    setStep((st) => (st === 'open' ? 'out' : st))
  }

  const reset = () => {
    setDesktop(freshDesktop())
    setShelves({ pocket: [], work: [], personal: [], temp: [] })
    setMode('idle')
    setActive(null)
    setStep('drag')
  }

  const hint = {
    drag: t.demo.hintDrag,
    drop: t.demo.hintDrop,
    open: t.demo.hintOpen,
    out: t.demo.hintOut,
    done: t.demo.hintDone,
  }[step]

  const tabX = (id: string) => {
    if (mode === 'idle') return tabW - 9
    if (mode === 'open') {
      const base = tabW - drawerW - 44
      return id === active || id === target || id === hovered ? base - 8 : base
    }
    return id === target || (mode === 'peek' && id === hovered) ? -14 : 0
  }

  const activeShelf = t.demo.shelves.find((s) => s.id === active)
  const activeFiles = active ? shelves[active] : []
  const dragging = drag?.started ? drag : null

  return (
    <div
      ref={stageRef}
      role="group"
      aria-label={t.demo.label}
      className="relative aspect-[16/11] min-h-[340px] w-full touch-none overflow-hidden rounded-[22px] bg-[var(--ink)] shadow-[var(--shadow-lg)] ring-1 ring-white/10 select-none sm:aspect-[16/10]"
      style={{
        backgroundImage:
          'radial-gradient(90% 80% at 10% 105%, rgba(141,151,255,.32), transparent 60%), radial-gradient(70% 60% at 85% -10%, rgba(255,127,172,.18), transparent 60%), linear-gradient(180deg, #1d1f2c, #121319)',
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerDown={(e) => {
        // A click on the empty desktop closes the drawer, as in the app.
        if (e.target === e.currentTarget && mode === 'open') setMode('idle')
      }}
    >
      {/* Desktop files */}
      {desktop.map((f) => (
        <button
          key={f.id}
          type="button"
          className={cn(
            'absolute flex w-[96px] cursor-grab flex-col items-center gap-1.5 rounded-xl p-2 text-center outline-offset-0 hover:bg-white/8 focus-visible:bg-white/10 active:cursor-grabbing',
            dragging?.file.id === f.id && 'opacity-35',
          )}
          style={{ left: f.x, top: `${f.y}%`, touchAction: 'none' }}
          onPointerDown={(e) => onPointerDown(e, f, 'desktop')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              shelve(f, 'desktop', 'pocket')
            }
          }}
        >
          <FileGlyph kind={f.kind} />
          <span className="max-w-full truncate text-[11.5px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,.6)]">
            {nameOf(f)}
          </span>
        </button>
      ))}

      {/* Drawer */}
      <div
        data-drop={active ?? undefined}
        className="absolute top-[6%] right-0 bottom-[6%] z-20 flex flex-col overflow-hidden rounded-l-[18px] bg-[#16171e] shadow-[-8px_10px_30px_rgba(0,0,0,.45)] ring-1 ring-white/[0.06]"
        style={{
          width: drawerW,
          transform: mode === 'open' ? 'none' : `translateX(${drawerW + 40}px)`,
          visibility: mode === 'open' ? 'visible' : 'hidden',
          transition:
            mode === 'open'
              ? 'transform 440ms var(--spring), visibility 0s'
              : 'transform 380ms ease, visibility 0s linear 380ms',
        }}
        aria-hidden={mode !== 'open'}
      >
        <div className="flex items-start justify-between gap-2 px-4 pt-3.5 pb-2">
          <div className="min-w-0">
            <p className="eyebrow text-[9.5px] text-white/40">{t.demo.files(activeFiles.length)}</p>
            <p
              className="truncate font-[family-name:var(--font-display)] text-[24px] leading-tight font-extrabold"
              style={{
                color: activeShelf
                  ? active === 'pocket'
                    ? '#f3f1ec'
                    : SHELF_STYLE[active!].color
                  : undefined,
              }}
            >
              {activeShelf?.name}
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg p-1.5 text-white/45 hover:bg-white/8 hover:text-white"
            aria-label={t.demo.close}
            tabIndex={mode === 'open' ? 0 : -1}
            onClick={() => setMode('idle')}
          >
            <X size={15} />
          </button>
        </div>
        <div className="grid flex-1 auto-rows-min grid-cols-2 gap-2 overflow-hidden px-3 pb-3">
          {activeFiles.length === 0 ? (
            <p className="col-span-2 mt-6 rounded-xl border border-dashed border-white/12 px-3 py-6 text-center text-[12px] text-white/40">
              {t.demo.empty}
            </p>
          ) : (
            activeFiles.map((f) => (
              <button
                key={f.id}
                type="button"
                tabIndex={mode === 'open' ? 0 : -1}
                className={cn(
                  'flex cursor-grab flex-col gap-2 rounded-xl bg-white/[0.04] p-2 text-left ring-1 ring-white/[0.06] hover:bg-white/[0.07] active:cursor-grabbing',
                  dragging?.file.id === f.id && 'opacity-35',
                )}
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => onPointerDown(e, f, active!)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    unshelve(f, active!, 222, 40)
                  }
                }}
              >
                <span className="grid h-[58px] place-items-center rounded-lg bg-[#f2f1ec]">
                  <FileGlyph kind={f.kind} size={34} />
                </span>
                <span className="truncate px-0.5 text-[11.5px] font-medium text-white/85">
                  {nameOf(f)}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Shelf tabs on the right edge */}
      <nav
        aria-label="Wedge"
        className="absolute top-1/2 z-10 grid -translate-y-1/2 gap-[7px] py-3"
        style={{ right: -tail }}
        onPointerEnter={() => {
          if (tuckTimer.current) clearTimeout(tuckTimer.current)
          if (mode === 'idle') setMode('peek')
        }}
        onPointerLeave={() => {
          setHovered(null)
          if (mode === 'peek') later(() => setMode((m) => (m === 'peek' ? 'idle' : m)), 250)
        }}
      >
        {t.demo.shelves.map((s, i) => {
          const { color, Icon } = SHELF_STYLE[s.id]
          const count = shelves[s.id].length
          return (
            <button
              key={s.id}
              type="button"
              data-drop={s.id}
              aria-label={`${s.name}, ${t.demo.files(count)}`}
              aria-pressed={mode === 'open' && active === s.id}
              onClick={() => toggleShelf(s.id)}
              onPointerEnter={() => setHovered(s.id)}
              className="flex h-[42px] items-center gap-2 rounded-l-[13px] text-left text-[#14151c] shadow-[0_4px_12px_rgba(0,0,0,.28)]"
              style={
                {
                  width: tabW + tail,
                  paddingLeft: 9,
                  paddingRight: tail + 10,
                  background:
                    s.id === 'pocket'
                      ? `repeating-linear-gradient(135deg, rgba(0,0,0,.035) 0 6px, transparent 6px 12px), ${color}`
                      : color,
                  transform: `translateX(${tabX(s.id)}px)`,
                  transition: `transform 420ms var(--spring) ${mode === 'idle' ? 0 : i * 24}ms, filter 140ms`,
                  filter: target === s.id ? 'brightness(1.06)' : undefined,
                } as CSSProperties
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center rounded-[8px] bg-black/[0.12]">
                <Icon size={14} strokeWidth={2} />
              </span>
              <span
                className="grid min-w-0 flex-1 gap-px transition-opacity duration-150"
                style={{ opacity: mode === 'open' ? 0 : 1 }}
              >
                <span className="truncate font-[family-name:var(--font-display)] text-[13px] leading-none font-bold">
                  {s.name}
                </span>
                <span className="eyebrow truncate text-[7.5px] opacity-60">{s.sub}</span>
              </span>
              <span
                className={cn(
                  'rounded-md bg-black/[0.13] px-1.5 py-1 font-[family-name:var(--font-mono)] text-[9.5px] leading-none transition-opacity duration-150',
                  bump === s.id && 'animate-[wedge-bump_520ms_var(--spring)]',
                )}
                style={{ opacity: mode === 'open' ? 0 : 1 }}
              >
                {String(count).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </nav>

      {/* What Windows draws next to the cursor while dragging */}
      {dragging ? (
        <div
          className="pointer-events-none absolute z-30 flex items-center gap-2 rounded-xl bg-white/90 py-1.5 pr-3 pl-1.5 shadow-[0_10px_24px_rgba(0,0,0,.35)]"
          style={{ left: dragging.x + 10, top: dragging.y + 10 }}
          aria-hidden
        >
          <FileGlyph kind={dragging.file.kind} size={26} />
          <span className="text-[11.5px] font-semibold text-[#14151c]">
            {nameOf(dragging.file)}
          </span>
        </div>
      ) : null}

      {/* Hint and reset */}
      <div className="absolute bottom-3 left-3 z-20 flex max-w-[calc(100%-1.5rem)] items-center gap-2">
        <p
          aria-live="polite"
          className="truncate rounded-full bg-black/45 px-3 py-1.5 text-[12px] font-medium text-white/85 ring-1 ring-white/10 backdrop-blur"
        >
          {hint}
        </p>
        {step !== 'drag' ? (
          <button
            type="button"
            onClick={reset}
            className="flex shrink-0 items-center gap-1 rounded-full bg-black/45 px-2.5 py-1.5 text-[12px] text-white/70 ring-1 ring-white/10 backdrop-blur hover:text-white"
          >
            <RotateCcw size={12} />
            {t.demo.reset}
          </button>
        ) : null}
      </div>
    </div>
  )
}
