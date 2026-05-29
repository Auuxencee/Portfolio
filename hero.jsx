/* hero.jsx — cinematic name reveal + tagline */

function Hero({ revealStyle = "letters" }) {
  const name = ["Auxence", "Massieux"];

  return (
    <section id="hero" className="hero" data-section="hero">
      <div className="shell">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="bar" />
            <span>Portfolio · MMXXVI · v1.0</span>
            <span style={{ marginLeft: "auto", color: "var(--silver-3)" }}>
              48.857°N · 2.352°E
            </span>
          </div>

          <h1 className="hero-name" aria-label="Auxence Massieux">
            {name.map((word, wi) => (
              <span className="word" key={wi}>
                {word.split("").map((ch, ci) => (
                  <span
                    className="letter"
                    key={ci}
                    style={{
                      animationDelay: `${0.3 + (wi * word.length + ci) * 0.035}s`,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-tagline">
            <span className="accent">Cybersecurity Engineer</span> &amp; Secure Software Developer.
            Designing resilient architectures, post-quantum primitives, and the
            quiet infrastructure of trust.
          </p>

          <div className="hero-meta">
            <div className="hero-meta-cell">
              <div className="label">Focus</div>
              <div className="value">Secure systems · PQC</div>
            </div>
            <div className="hero-meta-cell">
              <div className="label">Discipline</div>
              <div className="value">AppSec · Pentesting · PKI</div>
            </div>
            <div className="hero-meta-cell">
              <div className="label">Stack</div>
              <div className="value">Java · Python · TypeScript</div>
            </div>
            <div className="hero-meta-cell">
              <div className="label">Studies</div>
              <div className="value">Mines Saint-Étienne</div>
            </div>
          </div>
        </div>

        <HeroOrbital />
      </div>

      <div className="hero-scroll-hint">
        <span className="line" />
        <span>Scroll to enter</span>
      </div>
    </section>
  );
}

/* Floating concentric orbital diagram on the right of the hero — sized down on mobile */
function HeroOrbital() {
  return (
    <div className="hero-orbital" aria-hidden="true">
      <svg viewBox="0 0 600 600" width="100%" height="100%">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(180,210,255,0.85)" />
            <stop offset="40%" stopColor="rgba(77,139,255,0.35)" />
            <stop offset="100%" stopColor="rgba(77,139,255,0)" />
          </radialGradient>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* concentric rings */}
        {[120, 170, 220, 270].map((r, i) => (
          <g key={i} className="orb-ring" style={{ animationDuration: `${80 + i * 30}s`, animationDirection: i % 2 ? "reverse" : "normal" }}>
            <circle cx="300" cy="300" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx="300" cy="300" r={r} fill="none" stroke="url(#ring)" strokeWidth="1.2" strokeDasharray={`${r * 0.3} ${r * 5}`} />
          </g>
        ))}

        {/* satellite nodes */}
        {[
          { r: 170, a: 30 },
          { r: 220, a: 110 },
          { r: 170, a: 220 },
          { r: 270, a: 290 },
          { r: 120, a: 80 },
        ].map((p, i) => {
          const x = 300 + Math.cos((p.a * Math.PI) / 180) * p.r;
          const y = 300 + Math.sin((p.a * Math.PI) / 180) * p.r;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="rgba(220,230,250,0.9)" />
              <circle cx={x} cy={y} r="10" fill="rgba(77,139,255,0.18)" />
            </g>
          );
        })}

        {/* center core */}
        <circle cx="300" cy="300" r="60" fill="url(#core)" />
        <circle cx="300" cy="300" r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <circle cx="300" cy="300" r="3" fill="rgba(255,255,255,0.9)" />

        {/* annotations */}
        <text x="50" y="40" fill="rgba(180,190,205,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">SYS · TOPOLOGY · 06</text>
        <text x="50" y="570" fill="rgba(180,190,205,0.4)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">NODE INTEGRITY · OK</text>
        <text x="430" y="570" fill="rgba(180,190,205,0.4)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">PQ-CHANNEL · STABLE</text>
      </svg>
      <style>{`
        .hero-orbital {
          position: absolute;
          right: calc(var(--gutter) * -0.4);
          top: 50%;
          transform: translateY(-50%);
          width: clamp(380px, 38vw, 620px);
          height: clamp(380px, 38vw, 620px);
          pointer-events: none;
          opacity: 0;
          animation: heroOrbIn 2s var(--ease-out-expo) 0.6s forwards;
          mix-blend-mode: screen;
        }
        @keyframes heroOrbIn {
          to { opacity: 0.85; }
        }
        .orb-ring {
          transform-origin: 300px 300px;
          animation: orbSpin 90s linear infinite;
        }
        @keyframes orbSpin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1000px) {
          .hero-orbital { opacity: 0; display: none; }
        }
      `}</style>
    </div>
  );
}

window.Hero = Hero;
