'use client'

const ITEMS = [
  { id: 'hero',            label: 'Index',   num: '00' },
  { id: 'about',           label: 'About',   num: '01' },
  { id: 'expertise',       label: 'Expertise',num: '02' },
  { id: 'projects',        label: 'Work',    num: '03' },
  { id: 'experience',      label: 'Path',    num: '04' },
  { id: 'certifications',  label: 'Certs',   num: '05' },
  { id: 'skills',          label: 'Skills',  num: '06' },
  { id: 'contact',         label: 'Contact', num: '07' },
]

interface SectionProgressProps {
  activeSection: string
}

export default function SectionProgress({ activeSection }: SectionProgressProps) {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as Window & { __lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } }).__lenis
    if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="sec-progress" aria-hidden="true">
      {ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={scrollTo(item.id)}
          className={`sp-item ${activeSection === item.id ? 'active' : ''}`}
          title={item.label}
        >
          <span className="sp-num">{item.num}</span>
          <span className="sp-dot" />
          <span className="sp-label">{item.label}</span>
        </a>
      ))}
    </div>
  )
}
