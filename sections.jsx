/* sections.jsx — About, Cybersecurity, Experience, Skills, Contact */

const { useEffect: useEffectS, useRef: useRefS, useState: useStateS } = React;

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section id="about" className="section" data-section="about">
      <div className="shell">
        <div className="section-tag"><span className="num">01 ·</span> About</div>

        <div className="about-grid">
          <div className="about-narrative">
            <p className="reveal">
              I am an <span className="accent">engineering student</span> who became
              fascinated by the invisible architectures that keep modern systems
              alive — the protocols, the boundaries, the cryptographic primitives
              quietly working underneath every interaction.
            </p>
            <p className="reveal">
              That curiosity led me into <span className="accent">cybersecurity</span>:
              learning how systems fail, how they are attacked, and how to engineer
              the constraints that prevent failure from cascading.
            </p>
            <p className="reveal">
              Today I focus on <span className="accent">application security</span>,
              <span className="accent"> secure software design</span>, and
              <span className="accent"> post-quantum cryptography</span> — building
              the kind of resilient infrastructure that disappears into the
              background because it simply works.
            </p>
          </div>

          <aside className="about-side">
            <div className="about-card">
              <div className="mono label">Currently</div>
              <div className="value">Cybersecurity Engineering — Mines Saint-Étienne</div>
              <div className="sub">M.Eng track · Secure Systems &amp; Cryptography</div>
            </div>
            <div className="about-card">
              <div className="mono label">Investigating</div>
              <div className="value">Post-quantum key exchange in legacy PKI</div>
              <div className="sub">Kyber · Dilithium · hybrid handshakes</div>
            </div>
            <div className="about-card">
              <div className="mono label">Available for</div>
              <div className="value">Internships · Research · Secure backend work</div>
              <div className="sub">Remote · Paris · Saint-Étienne</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CYBERSECURITY CAPABILITIES
   ============================================================ */
function Capabilities() {
  const caps = [
    {
      n: "001",
      title: "Application Security",
      desc: "Threat modeling, secure SDLC integration, code review and static/dynamic analysis across web and backend surfaces.",
      vis: <CapVisShield />,
      span: "span-4",
    },
    {
      n: "002",
      title: "Pentesting & Vulnerability Research",
      desc: "Black-box and white-box assessments — recon, exploitation, post-exploit, and remediation guidance for engineering teams.",
      vis: <CapVisScan />,
      span: "span-4",
    },
    {
      n: "003",
      title: "Network Analysis",
      desc: "Protocol inspection, lateral-movement detection, and traffic forensics across segmented and zero-trust topologies.",
      vis: <CapVisFlow />,
      span: "span-4",
    },
    {
      n: "004",
      title: "Public Key Infrastructure",
      desc: "Certificate authorities, trust hierarchies, key lifecycle and rotation — the cryptographic plumbing of identity at scale.",
      vis: <CapVisPKI />,
      span: "span-6",
    },
    {
      n: "005",
      title: "Post-Quantum Cryptography",
      desc: "Lattice-based primitives, hybrid TLS, and migration paths for protocols built before the quantum threat was credible.",
      vis: <CapVisLattice />,
      span: "span-6",
    },
  ];

  return (
    <section id="expertise" className="section" data-section="expertise">
      <div className="shell">
        <div className="section-tag"><span className="num">02 ·</span> Expertise</div>

        <div className="reveal" style={{ marginBottom: 64 }}>
          <h2 className="display display-l" style={{ maxWidth: "18ch", margin: 0 }}>
            Security is invisible<br /><span style={{ color: "var(--silver-2)" }}>until it fails.</span>
          </h2>
          <p className="body-l" style={{ maxWidth: 560, marginTop: 28 }}>
            Five domains I work in — from the application layer down to the
            cryptographic foundations that make trust possible.
          </p>
        </div>

        <div className="caps-grid reveal-stagger">
          {caps.map((c) => (
            <CapCard key={c.n} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapCard({ n, title, desc, vis, span }) {
  const ref = useRefS(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className={`cap ${span}`} ref={ref} onMouseMove={onMove}>
      <div className="cap-num">{n}</div>
      <h3 className="cap-title">{title}</h3>
      <p className="cap-desc">{desc}</p>
      <div className="cap-vis">{vis}</div>
      <div className="cap-glow" />
    </div>
  );
}

/* ====== Capability visualizations (lightweight SVG) ====== */
function CapVisShield() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="shg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(77,139,255,0.4)" />
          <stop offset="1" stopColor="rgba(77,139,255,0)" />
        </linearGradient>
      </defs>
      {/* layered shields */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${160 - 40 + i * 4} ${20 + i * 6} L${160 + 40 - i * 4} ${20 + i * 6} L${160 + 40 - i * 4} ${60} Q ${160} ${100 + i * 2} ${160 - 40 + i * 4} ${60} Z`}
          fill="none"
          stroke={`rgba(255,255,255,${0.18 - i * 0.05})`}
          strokeWidth="1"
        />
      ))}
      <path
        d="M160 25 L195 25 L195 60 Q160 95 125 60 Z"
        fill="url(#shg)"
        opacity="0.7"
      />
      <text x="160" y="58" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(220,230,250,0.7)" letterSpacing="2">OWASP · A1—A10</text>
    </svg>
  );
}

function CapVisScan() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      {/* port row */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 20 + i * 12;
        const open = [3, 7, 12, 18].includes(i);
        return (
          <g key={i}>
            <rect x={x} y={40} width="6" height="24" rx="1"
              fill={open ? "rgba(77,139,255,0.5)" : "rgba(255,255,255,0.05)"}
              stroke={open ? "rgba(120,170,255,0.8)" : "rgba(255,255,255,0.12)"}
              strokeWidth="0.5" />
            {open && (
              <text x={x + 3} y={32} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(120,170,255,0.8)">
                {[22, 80, 443, 8080][[3, 7, 12, 18].indexOf(i)]}
              </text>
            )}
          </g>
        );
      })}
      <line x1="20" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 4" />
      <text x="20" y="100" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(180,190,205,0.5)" letterSpacing="2">PORT · SWEEP · 0—65535</text>
    </svg>
  );
}

function CapVisFlow() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      {/* network topology */}
      {[
        { x: 30, y: 60 }, { x: 90, y: 30 }, { x: 90, y: 90 },
        { x: 160, y: 30 }, { x: 160, y: 90 }, { x: 230, y: 60 }, { x: 290, y: 60 }
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="10" fill="rgba(20,28,40,0.9)" stroke="rgba(180,200,230,0.4)" strokeWidth="0.8" />
          <circle cx={p.x} cy={p.y} r="3" fill="rgba(220,230,250,0.7)" />
        </g>
      ))}
      {/* lines */}
      <g stroke="rgba(77,139,255,0.4)" strokeWidth="1" fill="none">
        <line x1="30" y1="60" x2="90" y2="30" />
        <line x1="30" y1="60" x2="90" y2="90" />
        <line x1="90" y1="30" x2="160" y2="30" />
        <line x1="90" y1="90" x2="160" y2="90" />
        <line x1="160" y1="30" x2="230" y2="60" />
        <line x1="160" y1="90" x2="230" y2="60" />
        <line x1="230" y1="60" x2="290" y2="60" />
      </g>
      {/* flowing dot */}
      <circle r="2" fill="#a8c8ff">
        <animateMotion dur="4s" repeatCount="indefinite"
          path="M30 60 L90 30 L160 30 L230 60 L290 60" />
      </circle>
    </svg>
  );
}

function CapVisPKI() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      {/* trust tree */}
      <g stroke="rgba(255,255,255,0.15)" fill="none">
        <line x1="160" y1="20" x2="80" y2="60" />
        <line x1="160" y1="20" x2="160" y2="60" />
        <line x1="160" y1="20" x2="240" y2="60" />
        <line x1="80" y1="60" x2="50" y2="100" />
        <line x1="80" y1="60" x2="110" y2="100" />
        <line x1="240" y1="60" x2="210" y2="100" />
        <line x1="240" y1="60" x2="270" y2="100" />
      </g>
      {/* root */}
      <rect x="142" y="10" width="36" height="18" rx="2" fill="rgba(77,139,255,0.18)" stroke="rgba(77,139,255,0.7)" />
      <text x="160" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(220,230,250,0.9)">ROOT</text>
      {/* intermediates */}
      {[80, 160, 240].map((x, i) => (
        <g key={i}>
          <rect x={x - 16} y={52} width="32" height="14" rx="2" fill="rgba(20,28,40,0.9)" stroke="rgba(180,200,230,0.3)" />
          <text x={x} y={62} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(180,200,230,0.7)">CA·{i + 1}</text>
        </g>
      ))}
      {/* leaves */}
      {[50, 110, 210, 270].map((x, i) => (
        <g key={i}>
          <rect x={x - 12} y={92} width="24" height="12" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />
        </g>
      ))}
    </svg>
  );
}

function CapVisLattice() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      {/* lattice grid */}
      <g stroke="rgba(255,255,255,0.08)" fill="none">
        {Array.from({ length: 9 }).map((_, c) =>
          Array.from({ length: 5 }).map((__, r) => {
            const x = 40 + c * 30, y = 20 + r * 18;
            return <circle key={`${c}-${r}`} cx={x} cy={y} r="1.2" fill="rgba(180,200,230,0.4)" />;
          })
        )}
      </g>
      {/* basis vectors */}
      <line x1="160" y1="56" x2="220" y2="38" stroke="rgba(77,139,255,0.8)" strokeWidth="1.4" />
      <line x1="160" y1="56" x2="190" y2="92" stroke="rgba(180,210,255,0.7)" strokeWidth="1.4" />
      <circle cx="160" cy="56" r="3" fill="#fff" />
      <text x="226" y="36" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(180,200,230,0.7)">b₁</text>
      <text x="194" y="98" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(180,200,230,0.7)">b₂</text>
      <text x="40" y="112" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(180,190,205,0.5)" letterSpacing="2">LATTICE · ℤⁿ · LWE</text>
    </svg>
  );
}

/* ============================================================
   EXPERIENCE TIMELINE
   ============================================================ */
function Experience() {
  const items = [
    {
      period: "2024 — 2025",
      dur: "12 months",
      org: "Airbus / ALTEN",
      role: "Cybersecurity Engineering Intern",
      desc: "Contributed to secure software engineering for embedded aerospace systems — threat modeling on safety-critical components, secure-by-design reviews, and PKI tooling for internal certificate lifecycle.",
      tags: ["Embedded security", "PKI", "Threat modeling", "Java"],
    },
    {
      period: "2023 — 2024",
      dur: "8 months",
      org: "EXAIL Robotics",
      role: "Software & Security Engineer",
      desc: "Backend development for autonomous maritime robotics — hardened communication channels, designed secure telemetry pipelines, and built authentication primitives for the fleet command layer.",
      tags: ["Backend", "Secure APIs", "Python", "TLS"],
    },
    {
      period: "2022 — 2026",
      dur: "Ongoing",
      org: "Mines Saint-Étienne",
      role: "M.Eng — Cybersecurity Track",
      desc: "Graduate engineering program with specialization in secure systems and cryptography. Coursework in network security, cryptographic protocols, formal verification, and post-quantum primitives.",
      tags: ["Cryptography", "Formal methods", "Network security", "Research"],
    },
  ];

  return (
    <section id="experience" className="section" data-section="experience">
      <div className="shell">
        <div className="section-tag"><span className="num">04 ·</span> Experience</div>

        <div className="reveal" style={{ marginBottom: 72, maxWidth: 720 }}>
          <h2 className="display display-l" style={{ margin: 0 }}>
            Three institutions.<br />
            <span style={{ color: "var(--silver-2)" }}>One trajectory toward<br />secure systems engineering.</span>
          </h2>
        </div>

        <div className="timeline">
          {items.map((it, i) => (
            <div className="tl-item reveal" key={i}>
              <div className="tl-period">
                {it.period}
                <span className="dur">{it.dur}</span>
              </div>
              <div className="tl-body">
                <h3 className="tl-org">{it.org}</h3>
                <div className="tl-role">{it.role}</div>
                <p className="tl-desc">{it.desc}</p>
                <div className="tl-tags">
                  {it.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS — interactive topology / node ecosystem
   ============================================================ */
function Skills() {
  const skills = [
    { id: "java", label: "Java", group: "Languages", x: 18, y: 28 },
    { id: "python", label: "Python", group: "Languages", x: 32, y: 14 },
    { id: "ts", label: "TypeScript", group: "Languages", x: 48, y: 24 },
    { id: "sql", label: "SQL", group: "Languages", x: 22, y: 56 },
    { id: "nmap", label: "Nmap", group: "Recon", x: 65, y: 18 },
    { id: "metasploit", label: "Metasploit", group: "Exploit", x: 78, y: 32 },
    { id: "wireshark", label: "Wireshark", group: "Analysis", x: 70, y: 60 },
    { id: "kali", label: "Kali Linux", group: "Platform", x: 86, y: 50 },
    { id: "pki", label: "PKI", group: "Crypto", x: 42, y: 68 },
    { id: "api", label: "Secure APIs", group: "Backend", x: 58, y: 78 },
  ];

  const [active, setActive] = useStateS(null);
  const stageRef = useRefS(null);

  // build adjacency by group + a few cross-links
  const links = useRefS([]).current;
  if (links.length === 0) {
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const a = skills[i], b = skills[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 28) links.push([i, j, d]);
      }
    }
  }

  return (
    <section id="skills" className="section" data-section="skills">
      <div className="shell">
        <div className="section-tag"><span className="num">05 ·</span> Skills</div>

        <div className="reveal" style={{ marginBottom: 56, maxWidth: 740 }}>
          <h2 className="display display-l" style={{ margin: 0 }}>
            A living technical<br />
            <span style={{ color: "var(--silver-2)" }}>ecosystem.</span>
          </h2>
          <p className="body-l" style={{ marginTop: 24, maxWidth: 540 }}>
            Languages, recon tools, exploitation frameworks and cryptographic
            primitives — interconnected the way they are used in practice.
          </p>
        </div>

        <div className="skills-stage reveal" ref={stageRef}>
          <div className="skills-overlay">
            <span className="dot" /> NETWORK MAP · 10 NODES · 24 EDGES
          </div>

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {/* edges */}
            {links.map(([i, j, d], idx) => {
              const a = skills[i], b = skills[j];
              const dim = active != null && active !== i && active !== j ? 0.04 : Math.max(0.08, 0.4 - d / 100);
              return (
                <line key={idx}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={`rgba(77,139,255,${dim})`}
                  strokeWidth="0.12"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
            {/* nodes */}
            {skills.map((s, i) => {
              const isActive = active === i;
              return (
                <g key={s.id}
                   onMouseEnter={() => setActive(i)}
                   onMouseLeave={() => setActive(null)}
                   style={{ cursor: "pointer" }}>
                  <circle cx={s.x} cy={s.y} r="2.6" fill="rgba(77,139,255,0.12)" />
                  <circle cx={s.x} cy={s.y} r={isActive ? 1.6 : 1.1}
                    fill={isActive ? "#fff" : "rgba(220,230,250,0.85)"}
                    style={{ transition: "r 0.4s, fill 0.4s" }}
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
              );
            })}
          </svg>

          {/* labels (positioned in % so they track) */}
          {skills.map((s, i) => (
            <div
              key={s.id}
              className={`skill-node-label ${active === i ? "active" : ""}`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                opacity: active == null ? 0.7 : active === i ? 1 : 0.25,
                transition: "opacity 0.3s, color 0.3s",
              }}
            >
              {s.label}
              <span className="sub">{s.group}</span>
            </div>
          ))}

          <div className="skills-readout">
            <span><b>{active != null ? skills[active].label : "—"}</b> · selected</span>
            <span><b>{active != null ? skills[active].group : "—"}</b> · group</span>
            <span>HOVER · TO · INSPECT</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact({ email = "auxence.massieux@example.com" }) {
  return (
    <section id="contact" className="contact" data-section="contact">
      <div className="shell">
        <div className="section-tag"><span className="num">06 ·</span> Contact</div>

        <h2 className="contact-headline reveal">
          Let's build <span className="accent">secure systems</span><br />
          for the future.
        </h2>

        <div className="contact-links reveal">
          <a className="contact-link" href={`mailto:${email}`}>
            <div>
              <div className="ltype">Email</div>
              <div className="lvalue">{email}</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="contact-link" href="https://github.com/Auuxencee" target="_blank" rel="noreferrer">
            <div>
              <div className="ltype">GitHub</div>
              <div className="lvalue">@Auuxencee</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="contact-link" href="#" target="_blank" rel="noreferrer">
            <div>
              <div className="ltype">LinkedIn</div>
              <div className="lvalue">/in/auxence-massieux</div>
            </div>
            <span className="arr">↗</span>
          </a>
        </div>

        <div className="foot">
          <span>© MMXXVI · Auxence Massieux</span>
          <span>Designed &amp; engineered · Paris / Saint-Étienne</span>
          <span>v 1.0 · build 2026.05</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About, Capabilities, Experience, Skills, Contact });
