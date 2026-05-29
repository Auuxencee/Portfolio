'use client'
import SectionTag from '@/components/ui/SectionTag'
import { certifications } from '@/data/certifications'

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  )
}

const ICONS: Record<string, () => React.ReactElement> = {
  'isc2-cc': ShieldIcon,
  'aws-saa': CloudIcon,
  'aws-scs': CloudIcon,
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section" data-section="certifications">
      <div className="shell">
        <SectionTag num="05" label="Certifications" />

        <div className="reveal" style={{ marginBottom: 64, maxWidth: 720 }}>
          <h2 className="display display-l" style={{ margin: 0 }}>
            Credentials in<br />
            <span style={{ color: 'var(--silver-2)' }}>cloud &amp; security.</span>
          </h2>
          <p className="body-l" style={{ marginTop: 24, maxWidth: 540 }}>
            Industry certifications mapping to my focus on cloud security, infrastructure protection, and
            security architecture — both earned and actively in progress.
          </p>
        </div>

        <div className="certs-grid reveal-stagger">
          {certifications.map((cert) => {
            const Icon = ICONS[cert.id] ?? ShieldIcon
            return (
              <div key={cert.id} className={`cert-card${cert.status === 'earned' ? ' earned' : ''}`}>
                <div className={`cert-card-icon ${cert.colorClass}`}>
                  <Icon />
                </div>
                <div className="cert-card-body">
                  <div className="cert-card-issuer">{cert.issuer}</div>
                  <div className="cert-card-name">{cert.name}</div>
                  <div className="cert-card-desc">{cert.desc}</div>
                </div>
                <div className={`cert-status ${cert.status === 'earned' ? 'active' : 'progress'}`}>
                  <span className="cert-status-dot" />
                  {cert.status === 'earned' ? `Certified · ${cert.year}` : `In Progress · ${cert.year}`}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
