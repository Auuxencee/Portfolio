'use client'
import SectionTag from '@/components/ui/SectionTag'

const LINKS = [
  { type: 'Email',    value: 'auxence.massieux@gmail.com', href: 'mailto:auxence.massieux@gmail.com', arrow: '↗' },
  { type: 'GitHub',   value: 'github.com/Auuxencee',       href: 'https://github.com/Auuxencee',      arrow: '↗' },
  { type: 'LinkedIn', value: '/in/auxence-massieux',        href: 'https://linkedin.com/in/auxence-massieux', arrow: '↗' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="contact" data-section="contact">
      <div className="shell">
        <SectionTag num="07" label="Contact" />

        <h2 className="contact-headline reveal">
          Let&rsquo;s build{' '}
          <span className="accent">secure systems</span>
          <br />
          for the future.
        </h2>

        <div className="contact-links reveal">
          {LINKS.map((link) => (
            <a
              key={link.type}
              className="contact-link"
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <div>
                <div className="ltype">{link.type}</div>
                <div className="lvalue">{link.value}</div>
              </div>
              <span className="arr">{link.arrow}</span>
            </a>
          ))}
        </div>

        <div className="foot">
          <span>© MMXXVI · Auxence Massieux</span>
          <span>Designed &amp; engineered · Paris</span>
          <span>ISC2 CC · AWS SAA-C03 · v 2.0</span>
        </div>
      </div>
    </section>
  )
}
