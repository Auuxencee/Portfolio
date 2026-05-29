'use client'
import SectionTag from '@/components/ui/SectionTag'
import Chip from '@/components/ui/Chip'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section" data-section="projects">
      <div className="shell">
        <SectionTag num="03" label="Work" />

        <div className="reveal" style={{ marginBottom: 72 }}>
          <h2 className="display display-l" style={{ margin: 0 }}>
            Selected<br />
            <span style={{ color: 'var(--silver-2)' }}>work.</span>
          </h2>
          <p className="body-l" style={{ marginTop: 24, maxWidth: 520 }}>
            Engineering projects built during my studies and internships — documented, reproducible, and built to real-world standards.
          </p>
        </div>

        <FeaturedProject project={featured} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, marginTop: 0 }}>
          {rest.map((p, i) => (
            <SecondaryProject key={p.id} project={p} index={i} total={rest.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProject({ project }: { project: typeof projects[number] }) {
  return (
    <article className="project reveal" style={{ borderTop: 0 }}>
      <div className="project-head">
        <span className="project-index">{project.index} ·&nbsp;</span>
        <span className="project-kind">{project.kind}</span>
      </div>

      <div className="project-layout">
        <div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-lede">{project.subtitle}</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--silver-3)', marginBottom: 8,
            }}>Problem</div>
            <p style={{ fontSize: 15, color: 'var(--silver-2)', lineHeight: 1.6, maxWidth: '52ch' }}>
              {project.problem}
            </p>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--silver-3)', marginBottom: 8,
            }}>Approach</div>
            <p style={{ fontSize: 15, color: 'var(--silver-2)', lineHeight: 1.6, maxWidth: '52ch' }}>
              {project.approach}
            </p>
          </div>

          <div className="project-stack">
            {project.stack.map((s) => <Chip key={s} label={s} />)}
          </div>

          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
              View on GitHub <span className="arrow">→</span>
            </a>
          )}
        </div>

        <div className="project-canvas">
          <div className="corner tl" /><div className="corner tr" />
          <div className="corner bl" /><div className="corner br" />
          <div className="canvas-label">AegisQuantum · {project.period}</div>
          <div className="canvas-readout">PQC · FIPS 203/204</div>
          <PQCDiagram />
        </div>
      </div>
    </article>
  )
}

function SecondaryProject({ project, index, total }: {
  project: typeof projects[number]
  index: number
  total: number
}) {
  return (
    <article
      className="project reveal"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="project-head">
        <span className="project-index">{project.index} ·&nbsp;</span>
        <span className="project-kind">{project.kind}</span>
      </div>

      <div className="project-layout">
        <div>
          <h3 className="project-title" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
            {project.title}
          </h3>
          <p className="project-lede">{project.subtitle}</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--silver-3)', marginBottom: 8,
            }}>Approach</div>
            <p style={{ fontSize: 15, color: 'var(--silver-2)', lineHeight: 1.6, maxWidth: '52ch' }}>
              {project.approach}
            </p>
          </div>

          <div className="project-stack">
            {project.stack.map((s) => <Chip key={s} label={s} />)}
          </div>
        </div>

        <div className="project-canvas">
          <div className="corner tl" /><div className="corner tr" />
          <div className="corner bl" /><div className="corner br" />
          <div className="canvas-label">{project.id === 'pentest-lab' ? 'Pentest Lab' : 'Risk Analysis'} · {project.period}</div>
          {project.id === 'pentest-lab' ? <PentestDiagram /> : <RiskDiagram />}
        </div>
      </div>
    </article>
  )
}

function PQCDiagram() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 260" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        </pattern>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        </marker>
      </defs>
      <rect width="360" height="260" fill="url(#grid)" />

      <rect x="20" y="100" width="80" height="60" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="60" y="128" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="0.5">CLIENT</text>
      <text x="60" y="145" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.25)">pk / sk</text>

      <rect x="260" y="100" width="80" height="60" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="300" y="128" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="0.5">SERVER</text>
      <text x="300" y="145" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.25)">enc / dec</text>

      <rect x="130" y="110" width="100" height="40" rx="6" fill="rgba(37,99,235,0.2)" stroke="rgba(37,99,235,0.35)" strokeWidth="1" />
      <text x="180" y="127" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(147,197,253,0.9)" letterSpacing="0.5">ML-KEM-768</text>
      <text x="180" y="141" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="rgba(147,197,253,0.45)">KEM · Lattice</text>

      <path d="M100 120 L130 125" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arr)" />
      <path d="M230 125 L260 120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arr)" />
      <path d="M230 140 L100 155" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="4 4" />

      <text x="180" y="60" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="500" fill="rgba(255,255,255,0.7)" letterSpacing="-0.3">Post-Quantum Key Exchange</text>
      <text x="180" y="75" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.2)">NIST FIPS 203 (ML-KEM) · FIPS 204 (ML-DSA)</text>

      {[{ label: 'ML-DSA-65', x: 70 }, { label: 'Double Ratchet', x: 150 }, { label: 'AES-GCM', x: 240 }].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y="195" width="60" height="24" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
          <text x={item.x + 30} y="211" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="rgba(255,255,255,0.3)">{item.label}</text>
        </g>
      ))}
      <text x="180" y="242" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="rgba(255,255,255,0.15)" letterSpacing="0.5">CRYPTOGRAPHIC PRIMITIVES</text>
    </svg>
  )
}

function PentestDiagram() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 260" style={{ position: 'absolute', inset: 0 }}>
      <text x="180" y="60" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="500" fill="rgba(255,255,255,0.7)" letterSpacing="-0.3">OWASP Top 10 · Attack Surface</text>
      {[
        'SQL Injection', 'XSS', 'File Inclusion',
        'Cmd Injection', 'File Upload', 'Auth Bypass',
      ].map((label, i) => {
        const col = i % 3; const row = Math.floor(i / 3)
        const x = 40 + col * 100; const y = 90 + row * 60
        return (
          <g key={label}>
            <rect x={x} y={y} width="80" height="32" rx="4"
              fill="rgba(255,255,255,0.04)" stroke="rgba(77,139,255,0.25)" strokeWidth="0.8" />
            <text x={x + 40} y={y + 20} textAnchor="middle" fontFamily="JetBrains Mono, monospace"
              fontSize="7.5" fill="rgba(180,200,230,0.7)">{label}</text>
          </g>
        )
      })}
      <text x="180" y="230" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.2)" letterSpacing="2">DVWA · PKI / EJBCa · Nmap · Metasploit</text>
    </svg>
  )
}

function RiskDiagram() {
  const matrix = [
    { label: 'Critical', color: 'rgba(239,68,68,0.6)', x: 20, y: 20 },
    { label: 'High',     color: 'rgba(251,146,60,0.6)', x: 130, y: 20 },
    { label: 'Medium',   color: 'rgba(234,179,8,0.5)',  x: 240, y: 20 },
    { label: 'Low',      color: 'rgba(34,197,94,0.4)',  x: 20, y: 80 },
  ]
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 260" style={{ position: 'absolute', inset: 0 }}>
      <text x="180" y="55" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(255,255,255,0.6)" letterSpacing="1">ISP · RISK MATRIX</text>
      {matrix.map((m) => (
        <g key={m.label}>
          <rect x={m.x} y={m.y + 40} width="90" height="50" rx="6" fill={m.color} stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
          <text x={m.x + 45} y={m.y + 72} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.9)">{m.label}</text>
        </g>
      ))}
      <text x="180" y="220" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.2)" letterSpacing="1.5">CHRISTIAN DIOR COUTURE · ISP METHODOLOGY</text>
    </svg>
  )
}
