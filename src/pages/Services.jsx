import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Lightbulb, Shield, Thermometer, Zap, CheckCircle, ArrowRight, Clock, Wrench, Phone } from 'lucide-react'
import RevealText from '../components/RevealText'
import ShimmerButton from '../components/ShimmerButton'

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

/* ── Glowing border trace using SVG pathLength ── */
function GlowBorder({ color, active }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.rect
        x="0.75" y="0.75"
        width="98.5" height="98.5"
        rx="4" ry="4"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: 2 }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: active ? 1 : 0,
          opacity: active ? 0.85 : 0,
        }}
        transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  )
}

const services = [
  {
    icon: Lightbulb,
    title: 'Smart Home Systems Design & Installation',
    tagline: 'Full Smart Home Projects',
    color: '#8DC63F',
    desc: 'We handle everything from the initial site assessment to the final app configuration. Whether you want to automate a single room or your entire residence, we design a system that fits your space, your habits, and your budget. Every installation is clean, professional, and built to last.',
    features: [
      'Site assessment & electrical inspection',
      'Full system design & product selection',
      'Professional installation by engineers',
      'App setup, automations & scene configuration',
      'Hands-on training before we leave',
    ],
    process: ['Site Assessment', 'System Design & Proposal', 'Professional Installation', 'App Setup & Training'],
  },
  {
    icon: Zap,
    title: 'Electrical Systems & Power Distribution',
    tagline: 'Built for Lebanon\'s Power Realities',
    color: '#F59E0B',
    desc: 'Lebanon\'s electrical environment is unique — frequent cuts, generator switching, and aging infrastructure. We integrate smart control with your existing electrical system to give you visibility and control over your power consumption and distribution.',
    features: [
      'Generator & EDL power monitoring',
      'Smart circuit breakers with remote on/off',
      'Real-time energy consumption per circuit',
      'Overload protection and instant alerts',
      'Electrical panel smart integration',
    ],
    process: ['Generator & Power Monitoring', 'Smart Circuit Protection', 'Panel Integration', 'Remote Monitoring Setup'],
  },
  {
    icon: Shield,
    title: 'Smart Devices Supply & Integration',
    tagline: 'The Right Products, Correctly Integrated',
    color: '#2B5BA8',
    desc: 'We supply smart switches, sensors, cameras, door locks, and more from globally certified brands — Sonoff, Tuya, and Summao. But supply alone isn\'t enough — we integrate every device into a unified ecosystem that works together, with a single app controlling everything.',
    features: [
      'Product selection tailored to your needs',
      'Ecosystem integration via Tuya Smart Life or eWeLink',
      'Custom automations configured',
      'Voice control setup (Alexa / Google)',
      'LAN mode configured for offline operation',
    ],
    process: ['Product Selection', 'Ecosystem Integration', 'Automation Setup', 'Testing & Handover'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Technical Support',
    tagline: 'We Don\'t Disappear After Installation',
    color: '#E8814D',
    desc: 'Smart systems need ongoing care. We provide after-sales support, firmware updates, troubleshooting, and system expansions. Whether something stops working or you want to add more devices, we\'re available to help — remotely or on-site.',
    features: [
      'Remote support via WhatsApp and phone',
      'On-site visits for hardware issues',
      'Firmware updates and app re-configuration',
      'System expansion and new device integration',
      'Manufacturer warranty support',
    ],
    process: ['Remote Diagnosis', 'On-Site Visit (if needed)', 'Fix or Replace', 'System Expansion'],
  },
]

const processSteps = [
  { icon: Phone,       step: '01', title: 'Free Consultation', desc: 'We visit your site, understand your needs, and design a system that fits your space and budget.' },
  { icon: Wrench,      step: '02', title: 'System Design',     desc: 'We select the right devices, plan wiring and connectivity, and prepare a full installation proposal.' },
  { icon: CheckCircle, step: '03', title: 'Installation & Setup', desc: 'Professional installation, full app configuration, testing, and hands-on training before we leave.' },
  { icon: Clock,       step: '04', title: 'Ongoing Support',   desc: 'Post-installation WhatsApp support. Remote diagnosis first — we come on-site only when needed.' },
]

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* ── Header ── */}
      <section className="pt-32 pb-16 px-6 lg:px-8"
        style={{ background: 'radial-gradient(ellipse at top, rgba(43,91,168,0.1) 0%, transparent 60%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4"
              style={{ background: 'rgba(43,91,168,0.1)', border: '1px solid rgba(43,91,168,0.25)' }}>
              What We Offer
            </div>
          </FadeIn>
          <RevealText delay={0.05}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Our <span className="text-accent">Services</span>
            </h1>
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="text-gray-text text-lg max-w-xl mx-auto">
              Engineering-led services from consultation to long-term support — built around Lebanon's real electrical challenges.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Service detail cards with glowing border trace ── */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((svc, i) => (
            <FadeIn key={i} delay={0.1}>
              <motion.div
                className="relative p-8 md:p-10 rounded-3xl grid md:grid-cols-2 gap-8 items-start overflow-hidden cursor-default"
                style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* ── Glowing SVG border trace ── */}
                <GlowBorder color={svc.color} active={hoveredCard === i} />

                {/* ── Subtle inner glow on hover ── */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${svc.color}09, transparent 60%)` }}
                />

                {/* Left column */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}33` }}
                      animate={{ boxShadow: hoveredCard === i ? `0 0 22px ${svc.color}44` : '0 0 0 transparent' }}
                      transition={{ duration: 0.4 }}
                    >
                      <svc.icon size={26} style={{ color: svc.color }} />
                    </motion.div>
                    <div>
                      <div className="text-xs font-semibold mb-1" style={{ color: svc.color }}>{svc.tagline}</div>
                      <h2 className="text-2xl font-black text-white">{svc.title}</h2>
                    </div>
                  </div>
                  <p className="text-gray-text leading-relaxed mb-6">{svc.desc}</p>
                  <ShimmerButton
                    to="/contact"
                    className="gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${svc.color}, ${svc.color}99)`,
                      boxShadow: `0 0 20px ${svc.color}33`,
                    }}
                  >
                    Get Quote <ArrowRight size={14} />
                  </ShimmerButton>
                </div>

                {/* Right column */}
                <div className="relative z-10 grid grid-cols-1 gap-4">
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      {svc.features.map((f, fi) => (
                        <motion.li
                          key={fi}
                          className="flex items-center gap-2 text-gray-text text-sm"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: hoveredCard === i ? 1 : 0.7, x: 0 }}
                          transition={{ duration: 0.3, delay: fi * 0.04 }}
                        >
                          <CheckCircle size={14} style={{ color: svc.color }} className="shrink-0" />
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3">Our Process</h4>
                    <div className="flex flex-wrap gap-2">
                      {svc.process.map((step, si) => (
                        <div key={si}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                          style={{ background: `${svc.color}12`, border: `1px solid ${svc.color}30`, color: svc.color }}>
                          <span className="font-bold">{si + 1}.</span> {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6 lg:px-8" style={{ background: 'rgba(15,24,41,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <RevealText delay={0.05}>
              <h2 className="text-4xl font-black text-white mb-4">How It Works</h2>
            </RevealText>
            <p className="text-gray-text text-lg max-w-lg mx-auto">
              Simple, transparent, and engineering-led from start to finish.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(43,91,168,0.15)' }}
                  transition={{ duration: 0.25 }}
                  className="text-center p-6 rounded-2xl h-full"
                  style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(43,91,168,0.15)', border: '1px solid rgba(43,91,168,0.3)' }}>
                    <step.icon size={20} className="text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2 tracking-widest">STEP {step.step}</div>
                  <h4 className="text-white font-bold mb-2">{step.title}</h4>
                  <p className="text-gray-text text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <RevealText delay={0.05}>
              <h3 className="text-3xl font-black text-white mb-4">Ready to Start?</h3>
            </RevealText>
            <p className="text-gray-text mb-8">Contact us for a free, no-obligation consultation and site survey.</p>
            <ShimmerButton
              to="/contact"
              className="gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #2B5BA8, #1a3d7a)', boxShadow: '0 0 30px rgba(43,91,168,0.4)' }}
            >
              <Phone size={16} /> Book Free Consultation
            </ShimmerButton>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  )
}
