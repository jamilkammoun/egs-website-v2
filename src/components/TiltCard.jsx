import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'

/**
 * 3-D tilt card that follows the mouse cursor.
 * Includes a soft glare highlight that tracks the pointer.
 *
 * Usage:
 *   <TiltCard className="rounded-2xl" style={{ background: '#0F1829' }}>
 *     ... card content ...
 *   </TiltCard>
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  intensity = 11,
}) {
  const ref = useRef(null)

  // Raw normalised mouse position (-0.5 → +0.5)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring-damped versions for silky response
  const springCfg = { stiffness: 350, damping: 38, mass: 0.6 }
  const x = useSpring(rawX, springCfg)
  const y = useSpring(rawY, springCfg)

  // Rotation: left edge tilts back, right edge tilts forward
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity])

  // Glare: a radial highlight that follows the cursor
  const glareX = useTransform(x, [-0.5, 0.5], ['5%', '95%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['5%', '95%'])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.07) 0%, transparent 65%)`

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay — sits above all children */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
        style={{ background: glareBackground }}
      />
      {children}
    </motion.div>
  )
}
