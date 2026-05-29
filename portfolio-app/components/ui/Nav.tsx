'use client'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { id: 'about',           label: 'About',   num: '01' },
  { id: 'expertise',       label: 'Expertise',num: '02' },
  { id: 'projects',        label: 'Work',    num: '03' },
  { id: 'experience',      label: 'Path',    num: '04' },
  { id: 'journey',         label: 'Journey', num: '05' },
  { id: 'certifications',  label: 'Certs',   num: '06' },
  { id: 'skills',          label: 'Skills',  num: '07' },
  { id: 'contact',         label: 'Contact', num: '08' },
]

interface NavProps {
  activeSection: string
}

export default function Nav({ activeSection }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as Window & { __lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } }).__lenis
    if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-mark" onClick={scrollTo('hero')}>
        <span className="mark-glyph" />
        <span>Auxence Massieux</span>
      </a>

      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={scrollTo(item.id)}
            className={activeSection === item.id ? 'active' : ''}
          >
            <span className="dot" />
            {item.label}
          </a>
        ))}
      </div>

      <div className="nav-meta">
        <span className="nav-status">
          <span className="pulse" />
          Available · 2026
        </span>
      </div>
    </nav>
  )
}

export { NAV_ITEMS }
