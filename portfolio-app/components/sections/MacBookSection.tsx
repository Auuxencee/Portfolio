'use client'
import { useEffect, useRef } from 'react'

type Key = { flex: number; label: string }

const KEY_ROWS: Key[][] = [
  // Esc · F1–F12 · Touch ID / power
  [
    { flex: 1.1,  label: 'esc' },
    { flex: 0.82, label: 'F1' },
    { flex: 0.82, label: 'F2' },
    { flex: 0.82, label: 'F3' },
    { flex: 0.82, label: 'F4' },
    { flex: 0.82, label: 'F5' },
    { flex: 0.82, label: 'F6' },
    { flex: 0.82, label: 'F7' },
    { flex: 0.82, label: 'F8' },
    { flex: 0.82, label: 'F9' },
    { flex: 0.82, label: 'F10' },
    { flex: 0.82, label: 'F11' },
    { flex: 0.82, label: 'F12' },
    { flex: 1.1,  label: '⏻' },
  ],
  // ` 1–0 - = delete
  [
    { flex: 1,   label: '`' },
    { flex: 1,   label: '1' },
    { flex: 1,   label: '2' },
    { flex: 1,   label: '3' },
    { flex: 1,   label: '4' },
    { flex: 1,   label: '5' },
    { flex: 1,   label: '6' },
    { flex: 1,   label: '7' },
    { flex: 1,   label: '8' },
    { flex: 1,   label: '9' },
    { flex: 1,   label: '0' },
    { flex: 1,   label: '-' },
    { flex: 1,   label: '=' },
    { flex: 1.5, label: 'del' },
  ],
  // tab Q–P [ ] \
  [
    { flex: 1.4, label: 'tab' },
    { flex: 1,   label: 'Q' },
    { flex: 1,   label: 'W' },
    { flex: 1,   label: 'E' },
    { flex: 1,   label: 'R' },
    { flex: 1,   label: 'T' },
    { flex: 1,   label: 'Y' },
    { flex: 1,   label: 'U' },
    { flex: 1,   label: 'I' },
    { flex: 1,   label: 'O' },
    { flex: 1,   label: 'P' },
    { flex: 1,   label: '[' },
    { flex: 1,   label: ']' },
    { flex: 1,   label: '\\' },
  ],
  // caps A–' return
  [
    { flex: 1.65, label: 'caps' },
    { flex: 1,    label: 'A' },
    { flex: 1,    label: 'S' },
    { flex: 1,    label: 'D' },
    { flex: 1,    label: 'F' },
    { flex: 1,    label: 'G' },
    { flex: 1,    label: 'H' },
    { flex: 1,    label: 'J' },
    { flex: 1,    label: 'K' },
    { flex: 1,    label: 'L' },
    { flex: 1,    label: ';' },
    { flex: 1,    label: "'" },
    { flex: 2.1,  label: 'return' },
  ],
  // shift Z–/ shift
  [
    { flex: 2.2, label: '⇧' },
    { flex: 1,   label: 'Z' },
    { flex: 1,   label: 'X' },
    { flex: 1,   label: 'C' },
    { flex: 1,   label: 'V' },
    { flex: 1,   label: 'B' },
    { flex: 1,   label: 'N' },
    { flex: 1,   label: 'M' },
    { flex: 1,   label: ',' },
    { flex: 1,   label: '.' },
    { flex: 1,   label: '/' },
    { flex: 2.4, label: '⇧' },
  ],
  // fn ctrl opt cmd ──space── cmd opt ← →
  [
    { flex: 0.82, label: 'fn' },
    { flex: 0.82, label: '⌃' },
    { flex: 0.92, label: '⌥' },
    { flex: 1.1,  label: '⌘' },
    { flex: 5.2,  label: '' },
    { flex: 1.1,  label: '⌘' },
    { flex: 0.92, label: '⌥' },
    { flex: 0.68, label: '←' },
    { flex: 0.68, label: '→' },
  ],
]

const DOTS = Array.from({ length: 8 })

// Ease-in-out cubic
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
// Ease-out cubic
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function MacBookSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef   = useRef<HTMLDivElement>(null)
  const lidRef     = useRef<HTMLDivElement>(null)
  const loginRef   = useRef<HTMLDivElement>(null)
  const dotsRef    = useRef<HTMLDivElement>(null)
  const bodyRef    = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let rafId = 0

    const update = () => {
      const rect        = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      const raw         = Math.max(0, Math.min(1, -rect.top / totalScroll))

      /* ── Phase 1 · 0→0.50  Lid opens + scene tips forward ── */
      const p1e         = easeInOut(Math.min(1, raw / 0.5))
      const lidRX       = -168 + p1e * 146          // -168° → -22°
      const sceneRXBase = 58 - p1e * 46             // 58° → 12°

      /* ── Phase 2 · 0.52→0.75  Login fades in + dots ── */
      const p2  = Math.max(0, Math.min(1, (raw - 0.52) / 0.23))
      const p2e = easeOut(p2)

      /* ── Phase 3 · 0.78→1.00  Zoom into screen ── */
      const p3  = Math.max(0, Math.min(1, (raw - 0.78) / 0.22))
      const p3e = easeOut(p3)                               // fast start, smooth landing

      const sceneRX   = sceneRXBase * (1 - p3e)            // 12° → 0° (face-on)
      const zoomScale = 1 + p3e * 3.2                       // 1× → 4.2×
      const bodyOp    = Math.max(0, 1 - p3e * 3)           // keyboard fades out fast
      const ovP       = Math.max(0, Math.min(1, (raw - 0.82) / 0.18)) // longer, gentler fade

      /* Apply transforms */
      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(${sceneRX}deg) scale(${zoomScale})`
        sceneRef.current.style.opacity   = '1'
      }
      if (lidRef.current) {
        lidRef.current.style.transform = `rotateX(${lidRX}deg)`
      }
      if (loginRef.current) {
        loginRef.current.style.opacity = String(p2e)
      }
      if (dotsRef.current) {
        ;(Array.from(dotsRef.current.children) as HTMLElement[]).forEach((dot, i) => {
          const t = Math.max(0, Math.min(1, (p2 - i * 0.08) / 0.18))
          // Bounce ease-out (no mutation of t)
          let te: number
          if (t < 0.36)      te = 7.5625 * t * t
          else if (t < 0.73) te = 7.5625 * (t - 0.545) * (t - 0.545) + 0.75
          else               te = 7.5625 * (t - 0.9)   * (t - 0.9)   + 0.9375
          dot.style.transform = `scale(${Math.min(1, te)})`
        })
      }
      if (bodyRef.current) {
        bodyRef.current.style.opacity = String(bodyOp)
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(ovP)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Set initial state on mount
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="mb-section" aria-hidden="true">
      <div className="mb-sticky">
        <div ref={sceneRef} className="mb-scene-wrap">
          <div className="mb-shell">

            {/* ──────────── LID ──────────── */}
            <div className="mb-lid-wrap">
              <div ref={lidRef} className="mb-lid">

                {/* Back: Apple logo — visible when lid is closed / top-down */}
                <div className="mb-lid-back">
                  <svg className="mb-apple-logo" viewBox="0 0 56 68" fill="currentColor" aria-hidden="true">
                    <path d="M46.8 36c-.1-7.4 6-11 6.3-11.2-3.4-5-8.8-5.7-10.7-5.8-4.6-.5-9 2.7-11.3
                      2.7-2.3 0-5.9-2.6-9.7-2.6C15.7 19.2 9 24 9 34c0 6 2.3 12.3 5.2 16.5
                      2.8 4 5.9 8.3 10.1 8.1 4-.2 5.5-2.6 10.4-2.6s6.2 2.6 10.4 2.5
                      c4.3-.1 7.1-4.1 9.9-8.1 3.1-4.6 4.4-9.1 4.4-9.3-.1 0-8.5-3.3-8.6-13.1z
                      M39.3 13c2.3-2.8 3.9-6.7 3.5-10.6-3.4.1-7.4 2.2-9.8 5-2.1 2.5-4 6.5-3.5
                      10.3 3.8.3 7.5-1.9 9.8-4.7z" />
                  </svg>
                </div>

                {/* Front: screen — visible when lid opens */}
                <div className="mb-lid-front">
                  <div className="mb-camera-dot" />
                  <div className="mb-display">
                    <div className="mb-wallpaper" />
                    <div ref={loginRef} className="mb-login">
                      <div className="mb-avatar-ring">
                        <div className="mb-avatar-inner" />
                      </div>
                      <div className="mb-user">Auxence</div>
                      <div ref={dotsRef} className="mb-dots">
                        {DOTS.map((_, i) => <span key={i} className="mb-dot" />)}
                      </div>
                      <div className="mb-prompt">Enter password</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* ──────────── /LID ──────────── */}

            {/* ──────────── HINGE ──────────── */}
            <div className="mb-hinge" />

            {/* ──────────── BODY / KEYBOARD ──────────── */}
            <div ref={bodyRef} className="mb-body">
              {/* Touch Bar */}
              <div className="mb-touchbar">
                <div className="mb-tb-esc" />
                <div className="mb-tb-area" />
                <div className="mb-tb-power" />
              </div>

              {/* Key rows */}
              <div className="mb-keyboard">
                {KEY_ROWS.map((row, ri) => (
                  <div key={ri} className="mb-key-row">
                    {row.map((key, ki) => (
                      <div key={ki} className="mb-key" style={{ flex: key.flex }}>
                        {key.label && <span className="mb-key-lbl">{key.label}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Trackpad */}
              <div className="mb-trackpad" />
            </div>
            {/* ──────────── /BODY ──────────── */}

          </div>
        </div>

        {/* Transition overlay → fades to portfolio background */}
        <div ref={overlayRef} className="mb-overlay" style={{ opacity: 0 }} />
      </div>
    </section>
  )
}
