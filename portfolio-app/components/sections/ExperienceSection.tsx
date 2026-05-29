'use client'
import SectionTag from '@/components/ui/SectionTag'
import Chip from '@/components/ui/Chip'
import { experiences } from '@/data/experience'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section" data-section="experience">
      <div className="shell">
        <SectionTag num="04" label="Path" />

        <div className="reveal" style={{ marginBottom: 72, maxWidth: 720 }}>
          <h2 className="display display-l" style={{ margin: 0 }}>
            Five institutions.<br />
            <span style={{ color: 'var(--silver-2)' }}>
              One trajectory toward<br />
              secure systems engineering.
            </span>
          </h2>
        </div>

        <div className="timeline">
          {experiences.map((item, i) => (
            <div className="tl-item reveal" key={i}>
              <div className="tl-period">
                {item.period}
                <span className="dur">{item.duration}</span>
              </div>
              <div className="tl-body">
                <h3 className="tl-org">{item.org}</h3>
                {item.mission && <div className="tl-mission">{item.mission}</div>}
                <div className="tl-role">{item.role}</div>
                <p className="tl-desc">{item.desc}</p>
                <div className="tl-tags">
                  {item.tags.map((tag) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
