import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Wraps children in an overflow:hidden mask.
 * On scroll into view the content slides up from behind the clip edge.
 *
 * Usage:
 *   <RevealText delay={0.1}>
 *     <h2 className="text-4xl font-black text-white">Heading</h2>
 *   </RevealText>
 */
export default function RevealText({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : {}}
        transition={{
          duration: 0.78,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
