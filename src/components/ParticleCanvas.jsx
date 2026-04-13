import { useEffect, useRef } from 'react'

const COLORS = ['#2B5BA8', '#8DC63F', '#3d6ec4', '#a5d956', '#2B5BA8', '#2B5BA8']

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    // Build particles once, respawn if canvas is 0-sized
    const COUNT = 55
    const makeParticle = () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: Math.random() * 1.6 + 0.5,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      alpha: Math.random() * 0.5 + 0.12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() > 0.72,
      phase: Math.random() * Math.PI * 2,
    })
    const particles = Array.from({ length: COUNT }, makeParticle)

    let tick = 0
    const CONNECT_DIST = 88

    const draw = () => {
      tick++
      const cw = w(), ch = h()
      ctx.clearRect(0, 0, cw, ch)

      // Update & draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = cw
        if (p.x > cw) p.x = 0
        if (p.y < 0) p.y = ch
        if (p.y > ch) p.y = 0

        const alpha = p.pulse
          ? p.alpha * (0.55 + 0.45 * Math.sin(tick * 0.038 + p.phase))
          : p.alpha

        // Soft glow for larger dots
        if (p.r > 1.3) {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 7)
          const hexAlpha = Math.round(alpha * 70).toString(16).padStart(2, '0')
          grd.addColorStop(0, p.color + hexAlpha)
          grd.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 7, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        // Core dot
        const dotAlpha = Math.round(alpha * 255).toString(16).padStart(2, '0')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + dotAlpha
        ctx.fill()
      }

      // Connection lines (O(n²) but n=55 is trivial at 60fps)
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length - 1; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x
          const dy = particles[j].y - particles[i].y
          const d2 = dx * dx + dy * dy
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const lineAlpha = 0.14 * (1 - Math.sqrt(d2) / CONNECT_DIST)
            ctx.strokeStyle = `rgba(43,91,168,${lineAlpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  )
}
