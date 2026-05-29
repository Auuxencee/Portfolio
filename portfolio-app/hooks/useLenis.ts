'use client'
import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    let lenis: import('lenis').default | null = null
    let raf: number

    async function init() {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({
        duration: 1.2,
        easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
        smoothWheel: true,
        touchMultiplier: 2,
      })

      const tick = (time: number) => {
        lenis!.raf(time)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      ;(window as Window & { __lenis?: typeof lenis }).__lenis = lenis
    }

    init().catch(() => {})

    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [])
}
