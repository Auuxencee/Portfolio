'use client'
import SectionTag from '@/components/ui/SectionTag'

export default function AboutSection() {
  return (
    <section id="about" className="section" data-section="about">
      <div className="shell">
        <SectionTag num="01" label="About" />

        <div className="about-grid">
          <div className="about-narrative">
            <p className="reveal">
              I am an <span className="accent">engineering student</span> who became fascinated by
              the invisible architectures that keep modern systems alive — the protocols, the
              boundaries, the cryptographic primitives quietly working underneath every interaction.
            </p>
            <p className="reveal">
              That curiosity led me into <span className="accent">cybersecurity</span>: learning
              how systems fail, how they are attacked, and how to engineer the constraints that
              prevent failure from cascading.
            </p>
            <p className="reveal">
              I am drawn to <span className="accent">cloud security</span> in particular — the
              challenge of securing infrastructure that is inherently distributed, ephemeral, and
              shared. And more broadly, I care about embedding security into every IT project from
              the start: not as a gate at the end, but as a design principle throughout.
            </p>
            <p className="reveal">
              Today I focus on <span className="accent">application security</span>,{' '}
              <span className="accent">cloud architecture</span>, and{' '}
              <span className="accent">post-quantum cryptography</span> — building the kind of
              resilient infrastructure that disappears into the background because it simply works.
            </p>
          </div>

          <aside className="about-side">
            <div className="about-card">
              <div className="mono label">Currently</div>
              <div className="value">Junior Cybersecurity Consultant — HeadMind Partners</div>
              <div className="sub">Christian Dior Couture mission · Apr – Oct 2026</div>
            </div>
            <div className="about-card">
              <div className="mono label">Investigating</div>
              <div className="value">Post-quantum key exchange in legacy PKI</div>
              <div className="sub">ML-KEM · ML-DSA · Double Ratchet · liboqs/WASM</div>
            </div>
            <div className="about-card">
              <div className="mono label">Available for</div>
              <div className="value">Security Engineering · Pentesting · SOC roles</div>
              <div className="sub">Paris · Remote · Oct 2026+</div>
              <div className="cert-badge">
                <span className="cert-dot" />
                ISC2 Certified in Cybersecurity (CC)
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
