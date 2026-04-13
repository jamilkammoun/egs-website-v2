import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  Zap, Shield, Thermometer, Lightbulb, Wifi, ArrowRight,
  CheckCircle, Star, Phone, ChevronRight,
  Activity, Home as HomeIcon, Settings, Award, HeadphonesIcon,
  ChevronDown,
} from 'lucide-react'
import ParticleCanvas from '../components/ParticleCanvas'
import RevealText from '../components/RevealText'
import ShimmerButton from '../components/ShimmerButton'

/* ── Reusable fade-in wrapper ── */
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 36 : direction === 'down' ? -36 : 0, x: direction === 'left' ? 36 : direction === 'right' ? -36 : 0 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Animated counter (already enhanced, kept as-is) ── */
function CountUp({ target, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return controls.stop
  }, [isInView, target])

  return <span ref={ref}>{value}{suffix}</span>
}

/* ── Floating status card ── */
function FloatingCard({ icon: Icon, label, value, color, delay, yOffset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[160px] select-none"
      style={{
        background: 'rgba(10, 15, 30, 0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(43,91,168,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        ...yOffset,
      }}
    >
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3.5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <Icon size={16} style={{ color }} />
      </motion.div>
      <div>
        <div className="text-xs text-gray-text">{label}</div>
        <div className="text-sm font-bold text-white">{value}</div>
      </div>
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="w-2 h-2 rounded-full ml-auto"
        style={{ background: color }}
      />
    </motion.div>
  )
}

const serviceCards = [
  { icon: HomeIcon, title: 'Smart Home Design & Installation', desc: 'End-to-end smart home projects — site assessment, system design, device installation, and app configuration.', color: '#8DC63F', gradient: 'rgba(141,198,63,0.08)' },
  { icon: Zap,      title: 'Electrical Systems & Power', desc: 'Professional electrical installations integrated with smart control — generator monitoring, circuit protection, and more.', color: '#F59E0B', gradient: 'rgba(245,158,11,0.08)' },
  { icon: Shield,   title: 'Smart Devices Supply & Integration', desc: 'We source and supply quality smart devices from Sonoff, Tuya, and Summao, and handle full integration into your ecosystem.', color: '#2B5BA8', gradient: 'rgba(43,91,168,0.08)' },
  { icon: Settings, title: 'Maintenance & Technical Support', desc: 'Ongoing support, firmware updates, troubleshooting, and system expansions — we stay with you after installation.', color: '#E8814D', gradient: 'rgba(232,129,77,0.08)' },
]

const whyCards = [
  { icon: Award,          title: 'Engineering Expertise',   desc: 'Founded by an electrical engineer — every installation is designed to code, safe, and built to last.' },
  { icon: Wifi,           title: 'Works Without Internet',  desc: 'LAN-based control means your smart home keeps working even when your internet goes down.' },
  { icon: Settings,       title: 'Built for Lebanon',        desc: 'Our systems are designed around Lebanese realities — power cuts, generator switching, no neutral wire.' },
  { icon: HeadphonesIcon, title: 'Trusted Brands Only',     desc: 'We work exclusively with Sonoff, Tuya, and Summao — proven, globally certified smart home brands.' },
]

const scenarios = [
  { icon: '🔌', accent: 'rgba(239,68,68,.12)',  problem: '"The generator is overloading at 2am"', desc: 'You wake up every night to turn off ACs manually. You\'re losing sleep and wasting fuel.', solution: 'Smart switches auto-cut heavy loads when generator kicks in. Zero intervention needed.' },
  { icon: '❄️', accent: 'rgba(11,60,93,.12)',   problem: '"I left the AC on — I\'m already at work"', desc: 'Your electricity bill is running while you\'re not home. No way to turn it off remotely.', solution: 'Open your phone, tap once. AC off. From anywhere in the world.' },
  { icon: '🚪', accent: 'rgba(0,200,150,.12)',  problem: '"Who rang the doorbell? I\'m upstairs"', desc: 'You have to go downstairs every time someone rings. No way to see who it is.', solution: 'Smart video doorbell shows you exactly who\'s there on your phone before you open.' },
  { icon: '🔥', accent: 'rgba(239,68,68,.12)',  problem: '"There\'s a gas leak — nobody noticed"', desc: 'Gas leaks happen silently. Without a detector, you only know when it\'s too late.', solution: 'WiFi gas sensor alerts your phone instantly and sounds a loud alarm the second gas is detected.' },
  { icon: '💡', accent: 'rgba(107,33,168,.12)', problem: '"The kids leave lights on all day"', desc: 'Lights and fans running all day in empty rooms. Wasted electricity on every bill.', solution: 'Motion sensors auto-turn off lights when rooms are empty. You save every month.' },
  { icon: '📊', accent: 'rgba(13,110,138,.12)', problem: '"My electricity bill is too high"', desc: 'You pay every month but have no idea which appliance is draining your generator most.', solution: 'Smart energy meters show real-time consumption per appliance. Know exactly where your money goes.' },
]

const faqs = [
  {
    q: 'Does it work when the internet cuts off?',
    a: 'Yes. All devices support LAN (Local Area Network) control. As long as your home WiFi router is running — even without internet — you can control all devices from your phone inside the house. This is critical for Lebanon: power cuts won\'t stop your smart home.',
  },
  {
    q: 'Do I need to replace my existing switches and wiring?',
    a: 'No. In most cases we install smart relay modules behind your existing switches — they stay in place and look exactly the same. We work with your existing wiring. No renovation needed.',
  },
  {
    q: 'Will it work with my generator?',
    a: 'Absolutely — and this is one of the biggest advantages in Lebanon. We configure your smart devices to automatically manage loads when switching between EDL and generator power. You can set which devices turn on/off automatically on each power source.',
  },
  {
    q: 'How long does a typical installation take?',
    a: 'A starter pack (2–3 devices) takes about 1–2 hours. A full apartment setup with 10–15 devices takes a half day (3–5 hours). We handle everything: wiring, app setup, automations, and full training before we leave.',
  },
  {
    q: 'What if a device breaks down after installation?',
    a: 'All devices come with manufacturer warranty. We also provide post-installation WhatsApp support — if you have any issue, contact us and we\'ll diagnose remotely first. If a physical visit is needed, we\'ll be there.',
  },
  {
    q: 'How much does a complete smart home cost?',
    a: 'It depends on your home size and needs. We have packages starting from $50 for a single room up to $320 for a full apartment — all including hardware and installation. Contact us for a free consultation and custom quote tailored to your home.',
  },
]

/* FAQ accordion item */
function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid #1E2D4A', background: '#0F1829' }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-white font-semibold text-sm leading-snug">{faq.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-accent">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-5 text-gray-text text-sm leading-relaxed" style={{ borderTop: '1px solid #1E2D4A' }}>
              <span className="block pt-4">{faq.a}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

        {/* ── Particle canvas background ── */}
        <ParticleCanvas />

        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(43,91,168,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(43,91,168,0.8) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2B5BA8 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #8DC63F 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">

            {/* ── Text side ── */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-accent mb-8"
                style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                North Lebanon's Smart Home Specialists
              </motion.div>

              {/* ── Hero heading with staggered word reveal ── */}
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.82, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
                >
                  Engineered
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.82, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #2B5BA8, #8DC63F)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Smart Living
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-gray-text text-lg leading-relaxed mb-10 max-w-lg"
              >
                Professional design, supply, and installation of smart home systems. From a single smart switch to a fully automated residence — engineered to work reliably in Lebanon.
              </motion.p>

              {/* CTA Buttons with shimmer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <ShimmerButton
                  to="/contact"
                  className="gap-2 px-7 py-4 rounded-xl text-white font-semibold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #2B5BA8, #1a3d7a)',
                    boxShadow: '0 0 30px rgba(43,91,168,0.45)',
                  }}
                >
                  <Phone size={16} />
                  Get Free Consultation
                  <motion.span className="inline-flex" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <ArrowRight size={14} />
                  </motion.span>
                </ShimmerButton>

                <ShimmerButton
                  to="/products"
                  className="gap-2 px-7 py-4 rounded-xl text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.18)' }}
                >
                  Explore Products
                  <ChevronRight size={14} />
                </ShimmerButton>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="flex items-center gap-6 mt-10"
              >
                <div className="flex items-center gap-1 text-gray-text text-xs">
                  <CheckCircle size={13} className="text-accent" />
                  Sonoff Partner
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1 text-gray-text text-xs">
                  <CheckCircle size={13} className="text-accent" />
                  Tuya Certified
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1 text-gray-text text-xs">
                  <CheckCircle size={13} className="text-accent" />
                  North Lebanon
                </div>
              </motion.div>
            </div>

            {/* ── Floating cards side ── */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Central home illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(43,91,168,0.2), rgba(141,198,63,0.1))',
                  border: '1px solid rgba(43,91,168,0.4)',
                  boxShadow: '0 0 80px rgba(43,91,168,0.25)',
                }}
              >
                <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <HomeIcon size={64} className="text-primary opacity-80" />
                </motion.div>
                {[1, 2, 3].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute inset-0 rounded-3xl border border-primary/20"
                    animate={{ scale: [1, 1.5 + r * 0.3], opacity: [0.4, 0] }}
                    transition={{ duration: 2.5, delay: r * 0.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}
              </motion.div>

              <FloatingCard icon={Thermometer} label="Temperature" value="72°F · Optimal" color="#E8814D" delay={0.6} yOffset={{ top: '8%',    left: '5%'  }} />
              <FloatingCard icon={Shield}      label="Security"    value="Armed · 4 Cams" color="#2B5BA8" delay={0.8} yOffset={{ top: '8%',    right: '0%' }} />
              <FloatingCard icon={Zap}         label="Energy"      value="2.4 kWh · Low"  color="#F59E0B" delay={1.0} yOffset={{ bottom: '25%', left: '0%'  }} />
              <FloatingCard icon={Lightbulb}   label="Lighting"    value="8/12 On"         color="#8DC63F" delay={1.2} yOffset={{ bottom: '25%', right: '5%' }} />
              <FloatingCard icon={Wifi}        label="Network"     value="99.9% Uptime"    color="#8DC63F" delay={1.4} yOffset={{ bottom: '5%',  left: '25%' }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-gray-text text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════ STATS ═══════════════════════════ */}
      <section className="py-16 border-y" style={{ borderColor: '#1E2D4A', background: 'rgba(15,24,41,0.5)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[
              { value: 3,  suffix: '+', label: 'Premium Brands',  icon: Award,    color: '#2B5BA8' },
              { value: 50, suffix: '+', label: 'Smart Products',  icon: HomeIcon, color: '#8DC63F' },
              { value: 4,  suffix: '',  label: 'Core Services',   icon: Settings, color: '#E8814D' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.15} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 mx-auto"
                  style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}33` }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-text text-sm md:text-base">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SERVICES PREVIEW ═══════════════════════════ */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header with RevealText on heading */}
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4"
              style={{ background: 'rgba(43,91,168,0.1)', border: '1px solid rgba(43,91,168,0.25)' }}>
              What We Do
            </div>
            <RevealText delay={0.05}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Smart Home <span className="text-accent">Services</span>
              </h2>
            </RevealText>
            <p className="text-gray-text text-lg max-w-xl mx-auto">
              We don't just sell products — we design, install, and maintain complete smart systems tailored to your space.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 24px 55px ${card.color}28` }}
                  transition={{ duration: 0.28 }}
                  className="relative p-6 rounded-2xl h-full cursor-pointer group"
                  style={{ background: '#0F1829', border: `1px solid ${card.color}22` }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${card.color}0A, transparent 60%)` }} />
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${card.color}18`, border: `1px solid ${card.color}33` }}>
                    <card.icon size={22} style={{ color: card.color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-gray-text text-sm leading-relaxed mb-5">{card.desc}</p>
                  <NavLink to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: card.color }}>
                    Learn more <ArrowRight size={13} />
                  </NavLink>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <ShimmerButton
              to="/services"
              className="gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-sm"
              style={{ border: '1px solid rgba(43,91,168,0.5)', background: 'rgba(43,91,168,0.1)' }}
            >
              View All Services <ArrowRight size={15} />
            </ShimmerButton>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════ WHY EGS ═══════════════════════════ */}
      <section className="py-24 px-6 lg:px-8" style={{ background: 'rgba(15,24,41,0.4)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-accent mb-4"
                  style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.25)' }}>
                  Why Choose Us
                </div>
              </FadeIn>
              <RevealText delay={0.08}>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  The EGS <span className="text-primary">Difference</span>
                </h2>
              </RevealText>
              <FadeIn delay={0.15}>
                <p className="text-gray-text text-lg leading-relaxed mb-8">
                  We don't just sell products — we engineer complete smart home systems built for Lebanese reality. Power cuts, generator switching, no neutral wire — we handle it all with precision and expertise.
                </p>
                <NavLink to="/about"
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-200">
                  Our Story <ArrowRight size={15} />
                </NavLink>
              </FadeIn>
            </div>

            {/* Right: feature cards grid */}
            <div className="grid grid-cols-2 gap-5">
              {whyCards.map((card, i) => (
                <FadeIn key={i} delay={i * 0.12} direction={i % 2 === 0 ? 'left' : 'right'}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.22 }}
                    className="p-5 rounded-2xl"
                    style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(43,91,168,0.15)', border: '1px solid rgba(43,91,168,0.3)' }}>
                      <card.icon size={20} className="text-primary" />
                    </div>
                    <h4 className="text-white font-bold text-sm mb-2">{card.title}</h4>
                    <p className="text-gray-text text-xs leading-relaxed">{card.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SOUND FAMILIAR? ═══════════════════════════ */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4"
              style={{ background: 'rgba(43,91,168,0.1)', border: '1px solid rgba(43,91,168,0.25)' }}>
              Real Scenarios
            </div>
            <RevealText delay={0.05}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Sound <span className="text-accent">Familiar?</span>
              </h2>
            </RevealText>
            <p className="text-gray-text text-lg max-w-xl mx-auto">
              These are real problems Lebanese homeowners face every day. Smart home solves all of them.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.24 }}
                  className="p-6 rounded-2xl h-full flex flex-col gap-4"
                  style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: s.accent }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">The Problem</div>
                    <div className="text-white font-bold text-sm leading-snug mb-2">{s.problem}</div>
                    <p className="text-gray-text text-xs leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex items-start gap-2 p-3 rounded-xl text-xs leading-relaxed"
                      style={{ background: 'rgba(141,198,63,0.08)', border: '1px solid rgba(141,198,63,0.2)' }}>
                      <span className="text-accent shrink-0 mt-0.5">✓</span>
                      <span className="text-accent font-medium">EGS Solution: </span>
                      <span className="text-gray-text">{s.solution}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FAQ ═══════════════════════════ */}
      <section className="py-24 px-6 lg:px-8" style={{ background: 'rgba(15,24,41,0.5)' }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-accent mb-4"
              style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.25)' }}>
              Common Questions
            </div>
            <RevealText delay={0.05}>
              <h2 className="text-4xl font-black text-white mb-3">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </RevealText>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CTA BANNER ═══════════════════════════ */}
      <section className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 text-center"
              style={{
                background: 'linear-gradient(135deg, #0F1829 0%, #1a2d5a 40%, #0F1829 100%)',
                border: '1px solid rgba(43,91,168,0.35)',
                boxShadow: '0 0 80px rgba(43,91,168,0.15)',
              }}
            >
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #2B5BA8, transparent)', transform: 'translate(-40%,-40%)' }} />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #8DC63F, transparent)', transform: 'translate(40%,40%)' }} />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-accent mb-6"
                  style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.3)' }}>
                  <Activity size={12} /> Limited Slots This Month
                </div>

                <RevealText delay={0.05}>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Ready to Go Smart?
                  </h2>
                </RevealText>

                <p className="text-gray-text text-lg mb-10 max-w-lg mx-auto">
                  Book your free consultation today and get a custom smart home plan tailored to your space and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ShimmerButton
                    to="/contact"
                    className="gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #8DC63F, #6aa32d)', boxShadow: '0 0 30px rgba(141,198,63,0.4)' }}
                  >
                    <Phone size={16} />
                    Book Free Consultation
                    <ArrowRight size={14} />
                  </ShimmerButton>

                  <ShimmerButton
                    to="/products"
                    className="px-8 py-4 rounded-xl text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-300"
                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    View Products
                  </ShimmerButton>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="py-8" />
    </motion.div>
  )
}
