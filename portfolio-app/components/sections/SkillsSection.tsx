'use client'
import { useState, useRef } from 'react'
import SectionTag from '@/components/ui/SectionTag'
import { skills } from '@/data/skills'

function buildLinks(nodes: typeof skills): [number, number, number][] {
  const links: [number, number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j]
      const dx = a.x - b.x, dy = a.y - b.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 28) links.push([i, j, d])
    }
  }
  return links
}

const LINKS = buildLinks(skills)

export default function SkillsSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="skills" className="section" data-section="skills">
      <div className="shell">
        <SectionTag num="06" label="Skills" />

        <div className="reveal" style={{ marginBottom: 56, maxWidth: 740 }}>
          <h2 className="display display-l" style={{ margin: 0 }}>
            A living technical<br />
            <span style={{ color: 'var(--silver-2)' }}>ecosystem.</span>
          </h2>
          <p className="body-l" style={{ marginTop: 24, maxWidth: 540 }}>
            Languages, recon tools, exploitation frameworks and cryptographic primitives —
            interconnected the way they are used in practice.
          </p>
        </div>

        <div className="skills-stage reveal">
          <div className="skills-overlay">
            <span className="dot" />
            NETWORK MAP · {skills.length} NODES
          </div>

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {LINKS.map(([i, j, d], idx) => {
              const a = skills[i], b = skills[j]
              const dim =
                active != null && active !== i && active !== j
                  ? 0.04
                  : Math.max(0.08, 0.4 - d / 100)
              return (
                <line key={idx}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={`rgba(77,139,255,${dim})`}
                  strokeWidth="0.12"
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
            {skills.map((s, i) => {
              const isActive = active === i
              return (
                <g key={s.id}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={s.x} cy={s.y} r="2.6" fill="rgba(77,139,255,0.12)" />
                  <circle
                    cx={s.x} cy={s.y}
                    r={isActive ? 1.6 : 1.1}
                    fill={isActive ? '#fff' : 'rgba(220,230,250,0.85)'}
                    style={{ transition: 'r 0.4s, fill 0.4s' }}
                  />
                  {isActive && (
                    <circle cx={s.x} cy={s.y} r="4" fill="none"
                      stroke="rgba(77,139,255,0.6)" strokeWidth="0.18"
                      vectorEffect="non-scaling-stroke">
                      <animate attributeName="r" from="2" to="6" dur="1.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="1.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              )
            })}
          </svg>

          {skills.map((s, i) => (
            <div
              key={s.id}
              className={`skill-node-label ${active === i ? 'active' : ''}`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                opacity: active == null ? 0.7 : active === i ? 1 : 0.25,
                transition: 'opacity 0.3s, color 0.3s',
              }}
            >
              {s.label}
              <span className="sub">{s.group}</span>
            </div>
          ))}

          <div className="skills-readout">
            <span><b>{active != null ? skills[active].label : '—'}</b> · selected</span>
            <span><b>{active != null ? skills[active].group : '—'}</b> · group</span>
            <span>HOVER · TO · INSPECT</span>
          </div>
        </div>
      </div>
    </section>
  )
}
