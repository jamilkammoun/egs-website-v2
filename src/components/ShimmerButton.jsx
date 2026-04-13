import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

/**
 * A button/link with a diagonal shimmer sweep on hover.
 * Uses Framer Motion variant propagation — the parent sets
 * whileHover="shimmer" and the inner span picks it up.
 *
 * Usage:
 *   <ShimmerButton to="/contact" className="px-7 py-4 rounded-xl …" style={…}>
 *     Click me
 *   </ShimmerButton>
 *
 *   <ShimmerButton className="px-7 py-4 rounded-xl …" onClick={handleClick}>
 *     Submit
 *   </ShimmerButton>
 */

const shimmerSpan = (
  <motion.span
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none"
    variants={{
      shimmer: {
        x: ['-160%', '220%'],
        transition: { duration: 0.58, ease: [0.4, 0, 0.2, 1] },
      },
    }}
    style={{
      background:
        'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
      transform: 'skewX(-14deg)',
    }}
  />
)

const MotionNavLink = motion(NavLink)

export default function ShimmerButton({
  to,
  children,
  className = '',
  style = {},
  onClick,
}) {
  const shared = {
    className: `relative overflow-hidden inline-flex items-center justify-center ${className}`,
    style,
    whileHover: 'shimmer',
    whileTap: { scale: 0.97 },
  }

  if (to) {
    return (
      <MotionNavLink to={to} {...shared}>
        {shimmerSpan}
        {children}
      </MotionNavLink>
    )
  }

  return (
    <motion.button {...shared} onClick={onClick}>
      {shimmerSpan}
      {children}
    </motion.button>
  )
}
