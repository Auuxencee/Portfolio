/* background.jsx — atmospheric cinematic backdrop
   Renders into #bg-root. Two layers:
   (1) Slow drifting gradient orbs (CSS conic + radial, animated via React state-free CSS keyframes)
   (2) Canvas-rendered floating topology network with subtle parallax to scroll position
*/

const { useEffect, useRef } = React;

function AtmosphericBackground({ style = "topology", accent = "#4d8bff", motion = true }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef({ nodes: [], w: 0, h: 0, t: 0, scrollY: 0, mouseX: 0, mouseY: 0 });

  // resize
  useEffect(() => {
    const onResize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth, h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + "px"; c.style.height = h + "px";
      const ctx = c.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current.w = w; stateRef.current.h = h;
      seedNodes(stateRef.current, style);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [style]);

  // scroll + mouse
  useEffect(() => {
    const onScroll = () => { stateRef.current.scrollY = window.scrollY; };
    const onMouse = (e) => {
      // smooth mouse parallax (max small offset)
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      stateRef.current.mouseX = (e.clientX - cx) / cx;
      stateRef.current.mouseY = (e.clientY - cy) / cy;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  // render loop
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      const s = stateRef.current;
      if (motion) s.t += dt * 0.0001;

      ctx.clearRect(0, 0, s.w, s.h);
      if (style === "topology") drawTopology(ctx, s, accent);
      else if (style === "nodes") drawNodes(ctx, s, accent);
      else if (style === "waves") drawWaves(ctx, s, accent);
      else drawOrbsOnly(ctx, s, accent);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [style, accent, motion]);

  return (
    <>
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" style={{ background: `radial-gradient(circle, ${hexToRgba(accent, 0.18)}, transparent 60%)` }} />
        <div className="orb orb-2" style={{ background: `radial-gradient(circle, ${hexToRgba(accent, 0.10)}, transparent 65%)` }} />
        <div className="orb orb-3" style={{ background: `radial-gradient(circle, rgba(180,200,255,0.06), transparent 60%)` }} />
        <div className="bg-grain" />
        <div className="bg-vignette" />
      </div>
      <canvas ref={canvasRef} className="bg-canvas" />
      <style>{`
        .bg-orbs { position: absolute; inset: 0; overflow: hidden; }
        .orb { position: absolute; border-radius: 50%; filter: blur(40px); will-change: transform; }
        .orb-1 { width: 60vw; height: 60vw; top: -10vw; left: -15vw;
                 animation: orbDrift1 32s ease-in-out infinite alternate; }
        .orb-2 { width: 50vw; height: 50vw; bottom: -10vw; right: -12vw;
                 animation: orbDrift2 38s ease-in-out infinite alternate; }
        .orb-3 { width: 40vw; height: 40vw; top: 30%; left: 35%;
                 animation: orbDrift3 44s ease-in-out infinite alternate; }
        @keyframes orbDrift1 {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(8vw, 6vw, 0) scale(1.1); }
        }
        @keyframes orbDrift2 {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-6vw, -4vw, 0) scale(0.95); }
        }
        @keyframes orbDrift3 {
          0% { transform: translate3d(0,0,0) scale(0.9); }
          100% { transform: translate3d(-4vw, 5vw, 0) scale(1.05); }
        }
        .bg-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.4 0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.45'/></svg>");
          opacity: 0.04;
          mix-blend-mode: overlay;
        }
        .bg-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%);
        }
        .bg-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
      `}</style>
    </>
  );
}

/* ===== seed + draw helpers ===== */

function seedNodes(s, style) {
  const w = s.w, h = s.h;
  const arr = [];

  if (style === "topology" || style === "nodes") {
    const count = Math.round(Math.min(64, (w * h) / 32000));
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        z: 0.3 + Math.random() * 0.7,    // depth factor for parallax
        r: 0.8 + Math.random() * 1.4,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  } else if (style === "waves") {
    // no nodes, just used for procedural wave
  } else {
    // orbs only — no nodes
  }
  s.nodes = arr;
}

function drawTopology(ctx, s, accent) {
  const { w, h, t, nodes } = s;
  // update positions
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < -50) n.x = w + 50;
    if (n.x > w + 50) n.x = -50;
    if (n.y < -50) n.y = h + 50;
    if (n.y > h + 50) n.y = -50;
  }

  // parallax offset from scroll + mouse
  const scrollPar = -s.scrollY * 0.04;
  const mx = s.mouseX * 14, my = s.mouseY * 14;

  // connections
  const linkDist = Math.min(w, h) * 0.18;
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < linkDist) {
        const alpha = (1 - d / linkDist) * 0.18 * Math.min(a.z, b.z);
        const ax = a.x + mx * a.z, ay = a.y + scrollPar * a.z + my * a.z;
        const bx = b.x + mx * b.z, by = b.y + scrollPar * b.z + my * b.z;
        ctx.strokeStyle = hexToRgba(accent, alpha);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }
  }

  // nodes
  for (const n of nodes) {
    const pulse = 0.6 + 0.4 * Math.sin(t * 4 + n.pulse);
    const x = n.x + mx * n.z, y = n.y + scrollPar * n.z + my * n.z;
    // halo
    const g = ctx.createRadialGradient(x, y, 0, x, y, 12 * n.z);
    g.addColorStop(0, hexToRgba(accent, 0.22 * pulse * n.z));
    g.addColorStop(1, hexToRgba(accent, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, 12 * n.z, 0, Math.PI * 2); ctx.fill();
    // core
    ctx.fillStyle = `rgba(220, 230, 250, ${0.55 * n.z})`;
    ctx.beginPath(); ctx.arc(x, y, n.r * n.z, 0, Math.PI * 2); ctx.fill();
  }
}

function drawNodes(ctx, s, accent) {
  // same as topology but without the lines — sparser feel
  const { t, nodes, w, h } = s;
  for (const n of nodes) {
    n.x += n.vx * 0.6;
    n.y += n.vy * 0.6;
    if (n.x < -50) n.x = w + 50;
    if (n.x > w + 50) n.x = -50;
    if (n.y < -50) n.y = h + 50;
    if (n.y > h + 50) n.y = -50;
  }
  const scrollPar = -s.scrollY * 0.05;
  const mx = s.mouseX * 16, my = s.mouseY * 16;
  for (const n of nodes) {
    const pulse = 0.6 + 0.4 * Math.sin(t * 3 + n.pulse);
    const x = n.x + mx * n.z, y = n.y + scrollPar * n.z + my * n.z;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 30 * n.z);
    g.addColorStop(0, hexToRgba(accent, 0.25 * pulse * n.z));
    g.addColorStop(1, hexToRgba(accent, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, 30 * n.z, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(230, 235, 250, ${0.7 * n.z})`;
    ctx.beginPath(); ctx.arc(x, y, n.r * n.z * 1.2, 0, Math.PI * 2); ctx.fill();
  }
}

function drawWaves(ctx, s, accent) {
  const { w, h, t } = s;
  const lines = 7;
  for (let i = 0; i < lines; i++) {
    ctx.beginPath();
    const baseY = h * 0.18 + (h * 0.6 / lines) * i;
    const amp = 14 + i * 2;
    const freq = 0.003 + i * 0.0006;
    const phase = t * 1.5 + i * 0.6 + s.scrollY * 0.001;
    for (let x = 0; x <= w; x += 6) {
      const y = baseY + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.1 + phase * 1.3) * amp * 0.35;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = hexToRgba(accent, 0.05 + i * 0.012);
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawOrbsOnly() { /* nothing */ }

/* hex (#rrggbb) -> rgba(...) */
function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

window.AtmosphericBackground = AtmosphericBackground;
window.hexToRgba = hexToRgba;
