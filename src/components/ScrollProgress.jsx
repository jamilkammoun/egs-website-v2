import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #2B5BA8 0%, #3d6ec4 40%, #8DC63F 100%)',
        boxShadow: '0 0 8px rgba(141,198,63,0.6)',
      }}
    />
  )
}
