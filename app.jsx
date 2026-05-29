/* app.jsx — main shell: Lenis smooth scroll, scroll observers, nav, tweaks */

const { useEffect, useState, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#4d8bff",
  "bgStyle": "topology",
  "density": "balanced",
  "reducedMotion": false,
  "typeScale": 1.0
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ["#3a78ff", "#4d8bff", "#7aa8ff", "#a8d4ff"];
const BG_OPTIONS = ["topology", "nodes", "waves", "orbs"];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  /* Apply CSS variables when tweaks change */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent-hex", t.accent);
    root.style.setProperty("--accent-soft", hexToRgba(t.accent, 0.18));
    root.style.setProperty("--accent-glow", hexToRgba(t.accent, 0.35));
    document.body.classList.toggle("no-motion", !!t.reducedMotion);
  }, [t.accent, t.reducedMotion]);

  /* Lenis smooth scroll */
  useEffect(() => {
    if (typeof Lenis === "undefined") return;
    let lenis, raf;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
        smoothWheel: !t.reducedMotion,
        smoothTouch: false,
      });
      const tick = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      window.__lenis = lenis;
    } catch (e) {
      // graceful: fall back to native smooth scroll
      window.__lenis = null;
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
      window.__lenis = null;
    };
  }, [t.reducedMotion]);

  /* nav scrolled state + active section observer */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Reveal observer */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-stagger");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  const navItems = [
    { id: "hero", label: "Index", num: "00" },
    { id: "about", label: "About", num: "01" },
    { id: "expertise", label: "Expertise", num: "02" },
    { id: "projects", label: "Work", num: "03" },
    { id: "experience", label: "Path", num: "04" },
    { id: "skills", label: "Skills", num: "05" },
    { id: "contact", label: "Contact", num: "06" },
  ];

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="nav-mark" onClick={scrollTo("hero")}>
          <span className="mark-glyph" />
          <span>Auxence Massieux</span>
        </a>
        <div className="nav-links">
          {navItems.slice(1).map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              onClick={scrollTo(it.id)}
              className={activeSection === it.id ? "active" : ""}
            >
              <span className="dot" />{it.label}
            </a>
          ))}
        </div>
        <div className="nav-meta">
          <span className="nav-status">
            <span className="pulse" /> Available · 2026
          </span>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <SectionProgress activeSection={activeSection} sections={navItems} scrollTo={scrollTo} />

      <TweaksPanel>
        <TweakSection label="Accent" />
        <TweakColor
          label="Electric blue"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Background" />
        <TweakRadio
          label="Motion style"
          value={t.bgStyle}
          options={BG_OPTIONS}
          onChange={(v) => setTweak("bgStyle", v)}
        />

        <TweakSection label="Motion" />
        <TweakToggle
          label="Reduced motion"
          value={t.reducedMotion}
          onChange={(v) => setTweak("reducedMotion", v)}
        />
      </TweaksPanel>
    </>
  );
}

/* Right-side floating section progress / minimap */
function SectionProgress({ activeSection, sections, scrollTo }) {
  return (
    <div className="sec-progress" aria-hidden="false">
      {sections.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          onClick={scrollTo(it.id)}
          className={`sp-item ${activeSection === it.id ? "active" : ""}`}
          title={it.label}
        >
          <span className="sp-num">{it.num}</span>
          <span className="sp-dot" />
          <span className="sp-label">{it.label}</span>
        </a>
      ))}
      <style>{`
        .sec-progress {
          position: fixed;
          right: clamp(16px, 2vw, 28px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 40;
          font-family: var(--font-mono);
        }
        .sp-item {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--silver-3);
          font-size: 10px;
          letter-spacing: 0.16em;
          opacity: 0.6;
          transition: opacity 0.3s, color 0.3s;
        }
        .sp-num { width: 18px; text-align: right; font-feature-settings: "tnum"; }
        .sp-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--silver-4);
          transition: background 0.3s, transform 0.4s var(--ease-out-quart);
        }
        .sp-label {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s, transform 0.3s var(--ease-out-quart);
          color: var(--silver-2);
          text-transform: uppercase;
        }
        .sp-item:hover { opacity: 1; color: var(--white); }
        .sp-item:hover .sp-label { opacity: 1; transform: translateX(0); }
        .sp-item.active { opacity: 1; color: var(--white); }
        .sp-item.active .sp-dot {
          background: var(--accent-hex);
          transform: scale(1.4);
          box-shadow: 0 0 10px var(--accent-glow);
        }
        @media (max-width: 980px) {
          .sec-progress { display: none; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   Background mount (separate root)
   ============================================================ */
function BackgroundMount() {
  const [t] = useTweaks(TWEAK_DEFAULTS);
  return <AtmosphericBackground style={t.bgStyle} accent={t.accent} motion={!t.reducedMotion} />;
}

/* boot */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const bgRoot = ReactDOM.createRoot(document.getElementById("bg-root"));
bgRoot.render(<BackgroundMount />);
