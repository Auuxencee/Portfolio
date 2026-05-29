'use client'
import { useEffect, useRef } from 'react'
import { hexToRgba } from '@/utils/color'
import OrbLayer from './OrbLayer'

const ACCENT = '#1d55e0'

interface Node {
  x: number; y: number
  vx: number; vy: number
  z: number; r: number; pulse: number
}

interface State {
  nodes: Node[]; w: number; h: number; t: number
  scrollY: number; mouseX: number; mouseY: number
}

function seedNodes(s: State): void {
  const count = Math.round(Math.min(64, (s.w * s.h) / 32000))
  s.nodes = Array.from({ length: count }, () => ({
    x: Math.random() * s.w,
    y: Math.random() * s.h,
    vx: (Math.random() - 0.5) * 0.04,
    vy: (Math.random() - 0.5) * 0.04,
    z: 0.3 + Math.random() * 0.7,
    r: 0.8 + Math.random() * 1.4,
    pulse: Math.random() * Math.PI * 2,
  }))
}

function drawTopology(ctx: CanvasRenderingContext2D, s: State): void {
  const { w, h, t, nodes } = s

  for (const n of nodes) {
    n.x += n.vx
    n.y += n.vy
    if (n.x < -50) n.x = w + 50
    if (n.x > w + 50) n.x = -50
    if (n.y < -50) n.y = h + 50
    if (n.y > h + 50) n.y = -50
  }

  const scrollPar = -s.scrollY * 0.04
  const mx = s.mouseX * 14
  const my = s.mouseY * 14
  const linkDist = Math.min(w, h) * 0.18

  ctx.lineWidth = 1
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < linkDist) {
        const alpha = (1 - d / linkDist) * 0.12 * Math.min(a.z, b.z)
        ctx.strokeStyle = hexToRgba(ACCENT, alpha)
        ctx.beginPath()
        ctx.moveTo(a.x + mx * a.z, a.y + scrollPar * a.z + my * a.z)
        ctx.lineTo(b.x + mx * b.z, b.y + scrollPar * b.z + my * b.z)
        ctx.stroke()
      }
    }
  }

  for (const n of nodes) {
    const pulse = 0.6 + 0.4 * Math.sin(t * 4 + n.pulse)
    const x = n.x + mx * n.z
    const y = n.y + scrollPar * n.z + my * n.z
    const g = ctx.createRadialGradient(x, y, 0, x, y, 12 * n.z)
    g.addColorStop(0, hexToRgba(ACCENT, 0.14 * pulse * n.z))
    g.addColorStop(1, hexToRgba(ACCENT, 0))
    ctx.fillStyle = g
    ctx.beginPath(); ctx.arc(x, y, 12 * n.z, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = `rgba(29, 85, 224, ${0.4 * n.z})`
    ctx.beginPath(); ctx.arc(x, y, n.r * n.z, 0, Math.PI * 2); ctx.fill()
  }
}

export default function AtmosphericCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const stateRef = useRef<State>({ nodes: [], w: 0, h: 0, t: 0, scrollY: 0, mouseX: 0, mouseY: 0 })

  useEffect(() => {
    const onResize = () => {
      const c = canvasRef.current
      if (!c) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      c.width = w * dpr; c.height = h * dpr
      c.style.width = `${w}px`; c.style.height = `${h}px`
      const ctx = c.getContext('2d')!
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stateRef.current.w = w; stateRef.current.h = h
      seedNodes(stateRef.current)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => { stateRef.current.scrollY = window.scrollY }
    const onMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      stateRef.current.mouseX = (e.clientX - cx) / cx
      stateRef.current.mouseY = (e.clientY - cy) / cy
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')!
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(64, now - last); last = now
      const s = stateRef.current
      s.t += dt * 0.0001
      ctx.clearRect(0, 0, s.w, s.h)
      drawTopology(ctx, s)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <>
      <OrbLayer />
      <canvas ref={canvasRef} className="bg-canvas" />
    </>
  )
}
