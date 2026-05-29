'use client'
import { useEffect, useRef, useState } from 'react'

/*
  Path design — ViewBox "0 0 100 100"
  4 oblique horizontal segments connected by short vertical drops + rounded corners.

  Segment 1 →  (50,5)  → (93,17)          MPSI dot at (90,16)
  Drop          97,17–97,27
  Segment 2 ←  (93,27) → (7,37)           Mines dot at (10,35)
  Drop          3,37–3,47
  Segment 3 →  (3,47)  → (93,57)          Alten dot at (90,55)
  Drop          97,57–97,67
  Segment 4 ←  (93,67) → (7,77)           Headmind dot at (10,75)
  Drop + end    3,77 → (50,95)
*/
const PATH_D = [
  'M 50 5',
  'L 93 17',            'Q 97 17 97 21',   // → MPSI corner ↓
  'L 97 27',            'Q 97 31 93 31',   // ↓ corner ←
  'L 7 43',             'Q 3 43 3 47',     // ← Mines corner ↓
  'L 3 53',             'Q 3 57 7 57',     // ↓ corner →
  'L 93 69',            'Q 97 69 97 73',   // → Alten corner ↓
  'L 97 79',            'Q 97 83 93 83',   // ↓ corner ←
  'L 7 95',             'Q 3 95 3 97',     // ← Headmind end corner
  'Q 3 100 50 100',                        // sweep to center bottom
].join(' ')

const SVG_H = 100   // viewBox height

type AvatarType = 'pi' | 'plane' | 'virus' | 'dead'

interface Stop {
  year: string; org: string; loc: string; role: string; desc: string
  side: 'left' | 'right'; svgX: number; svgY: number
  rawFade: number   // scroll raw value when card fades in
  avatarAfter: AvatarType | null   // avatar type FROM this stop onward
}

const STOPS: Stop[] = [
  {
    year: '2021 – 2023', org: 'Institut Stanislas', loc: 'Cannes',
    role: 'MPSI — Mathématiques & Physique',
    desc: 'Classes préparatoires aux Grandes Écoles. Fondations analytiques et rigueur mathématique.',
    side: 'right', svgX: 90, svgY: 17, rawFade: 0.14, avatarAfter: null,
  },
  {
    year: '2023 – 2026', org: 'Mines Saint-Étienne', loc: '',
    role: 'Ingénieur Généraliste — Cybersécurité',
    desc: 'Sécu applicative, cryptographie PQC, architectures sécurisées. Projet messenger PQC. ISC2 CC.',
    side: 'left', svgX: 10, svgY: 43, rawFade: 0.34, avatarAfter: 'plane',
  },
  {
    year: 'Avr – Août 2025', org: 'ALTEN / Airbus', loc: 'Vitrolles',
    role: 'Stagiaire Ingénieur CS & Data',
    desc: 'Développement AppSheet, MySQL, Power BI. Pilotage projet de bout en bout.',
    side: 'right', svgX: 90, svgY: 69, rawFade: 0.56, avatarAfter: 'virus',
  },
  {
    year: 'Avr – Oct 2026', org: 'HeadMind Partners × Dior', loc: 'Paris',
    role: 'Consultant Junior Cybersécurité',
    desc: 'Analyse de risques ISP, Secure by Design sur les projets IT Christian Dior.',
    side: 'left', svgX: 10, svgY: 95, rawFade: 0.78, avatarAfter: null,
  },
]

/* ── Avatar icon components ─────────────────────────────────────── */
function IconPi() {
  return (
    <text x="12" y="14" textAnchor="middle" dominantBaseline="middle"
      fontSize="13" fontFamily="Georgia,serif" fill="white">π</text>
  )
}
function IconPlane() {
  return (
    <g transform="translate(4,3) scale(0.65)">
      <path d="M12 3L4 20l8-3.8L20 20z" fill="white" opacity="0.9"/>
      <path d="M12 3L4 20l8-3.8L20 20z" fill="none" stroke="white"
        strokeWidth="1.2" strokeLinejoin="round"/>
    </g>
  )
}
function IconVirus({ dying = false }: { dying?: boolean }) {
  const c = dying ? '#fca5a5' : 'white'
  const angles = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <g>
      <circle cx="12" cy="12" r="4" fill={c}/>
      {angles.map(a => {
        const r = a * Math.PI / 180
        return <line key={a}
          x1={12 + 4.2 * Math.cos(r)} y1={12 + 4.2 * Math.sin(r)}
          x2={12 + 7.4 * Math.cos(r)} y2={12 + 7.4 * Math.sin(r)}
          stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
      })}
      {dying && <>
        <line x1="8.5" y1="8.5" x2="15.5" y2="15.5"
          stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="15.5" y1="8.5" x2="8.5" y2="15.5"
          stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      </>}
    </g>
  )
}

/* ── Section component ──────────────────────────────────────────── */
export default function JourneySection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const pathRef     = useRef<SVGPathElement>(null)
  const avatarRef   = useRef<SVGGElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const deathRef    = useRef<HTMLDivElement>(null)
  const prevType    = useRef<AvatarType>('pi')

  const [avatarType, setAvatarType] = useState<AvatarType>('pi')

  useEffect(() => {
    const section = sectionRef.current
    const pathEl  = pathRef.current
    if (!section || !pathEl) return

    let raf = 0
    const len = pathEl.getTotalLength()
    pathEl.style.strokeDasharray  = `${len}`
    pathEl.style.strokeDashoffset = `${len}`

    const update = () => {
      const rect        = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      const raw         = Math.max(0, Math.min(1, -rect.top / totalScroll))

      // Draw path
      const drawn = Math.min(1, raw / 0.95 + 0.01)
      pathEl.style.strokeDashoffset = String(len * (1 - drawn))

      // Avatar position
      const pt = pathEl.getPointAtLength(Math.min(drawn, 1) * len)
      avatarRef.current?.setAttribute('transform', `translate(${pt.x - 12},${pt.y - 12})`)

      // Avatar type
      let type: AvatarType = 'pi'
      if (raw >= 0.93)      type = 'dead'
      else if (raw >= STOPS[2].rawFade + 0.06) type = 'virus'
      else if (raw >= STOPS[1].rawFade + 0.06) type = 'plane'
      if (type !== prevType.current) { prevType.current = type; setAvatarType(type) }

      // Cards
      STOPS.forEach((stop, i) => {
        const el = cardRefs.current[i]
        if (!el) return
        const f  = Math.max(0, Math.min(1, (raw - stop.rawFade) / 0.08))
        const dx = stop.side === 'right' ? (1 - f) * 18 : -(1 - f) * 18
        el.style.opacity   = String(f)
        el.style.transform = `translateY(-50%) translateX(${dx}px)`
      })

      // Death
      if (deathRef.current) {
        const d = Math.max(0, Math.min(1, (raw - 0.91) / 0.09))
        deathRef.current.style.opacity   = String(d)
        deathRef.current.style.transform = `translateX(-50%) scale(${0.5 + d * 0.5})`
      }
    }

    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const topPct = (y: number) => `${(y / SVG_H) * 100}%`

  return (
    <section ref={sectionRef} id="journey" className="jn-section">
      <div className="jn-sticky">

        <div className="shell jn-header-row">
          <span className="section-tag"><span className="num">05</span> · ROADMAP</span>
          <h2 className="jn-title">Un chemin en<br /><em>sécurité.</em></h2>
        </div>

        <div className="jn-layout shell">

          {/* ── Left column ── */}
          <div className="jn-col jn-col--left">
            {STOPS.filter(s => s.side === 'left').map(stop => {
              const gi = STOPS.indexOf(stop)
              return (
                <div key={stop.org} ref={el => { cardRefs.current[gi] = el }}
                  className="jn-card jn-card--left"
                  style={{ top: topPct(stop.svgY), opacity: 0, transform: 'translateY(-50%) translateX(-18px)' }}>
                  <div className="jn-card-year">{stop.year}</div>
                  <div className="jn-card-org">
                    {stop.org}
                    {stop.loc && <span className="jn-card-loc"> · {stop.loc}</span>}
                  </div>
                  <div className="jn-card-role">{stop.role}</div>
                  <p className="jn-card-desc">{stop.desc}</p>
                </div>
              )
            })}
          </div>

          {/* ── Central SVG path ── */}
          <div className="jn-path-col">
            <svg className="jn-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d={PATH_D} className="jn-path-bg"/>
              <path ref={pathRef} d={PATH_D} className="jn-path-fg"/>

              {/* Waypoint dots */}
              {STOPS.map((s, i) => (
                <circle key={i} cx={s.svgX} cy={s.svgY} r="2.2" className="jn-dot"/>
              ))}
              {/* End dot */}
              <circle cx="50" cy="100" r="2.5" className="jn-dot jn-dot--end"/>

              {/* Traveling avatar */}
              <g ref={avatarRef}>
                <circle cx="12" cy="12" r="13" className="jn-avatar-halo"/>
                <circle cx="12" cy="12" r="10.5" className="jn-avatar-bg"/>
                {avatarType === 'pi'    && <IconPi/>}
                {avatarType === 'plane' && <IconPlane/>}
                {avatarType === 'virus' && <IconVirus/>}
                {avatarType === 'dead'  && <IconVirus dying/>}
              </g>
            </svg>

            {/* Death label */}
            <div ref={deathRef} className="jn-death"
              style={{ opacity: 0, transform: 'translateX(-50%) scale(0.5)' }}>
              <span role="img" aria-label="neutralisé">💀</span>
              <span className="jn-death-label">Neutralisé.</span>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="jn-col jn-col--right">
            {STOPS.filter(s => s.side === 'right').map(stop => {
              const gi = STOPS.indexOf(stop)
              return (
                <div key={stop.org} ref={el => { cardRefs.current[gi] = el }}
                  className="jn-card jn-card--right"
                  style={{ top: topPct(stop.svgY), opacity: 0, transform: 'translateY(-50%) translateX(18px)' }}>
                  <div className="jn-card-year">{stop.year}</div>
                  <div className="jn-card-org">
                    {stop.org}
                    {stop.loc && <span className="jn-card-loc"> · {stop.loc}</span>}
                  </div>
                  <div className="jn-card-role">{stop.role}</div>
                  <p className="jn-card-desc">{stop.desc}</p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
