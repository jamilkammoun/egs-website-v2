import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Target, Eye, Heart, ArrowRight, Award, Users, Globe, CheckCircle } from 'lucide-react'
import RevealText from '../components/RevealText'
import ShimmerButton from '../components/ShimmerButton'

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

const values = [
  { icon: Target, title: 'Mission', desc: 'To deliver professional, reliable smart home systems that genuinely improve daily life for Lebanese families and businesses.' },
  { icon: Zap,    title: 'Engineering First', desc: 'Every decision is made from an engineering perspective — safety, reliability, and long-term performance come before aesthetics or cost-cutting.' },
  { icon: Award,  title: 'Lebanon-Focused', desc: 'We know the market, the infrastructure, and the challenges. Our solutions are built for Lebanese reality, not imported assumptions.' },
  { icon: Globe,  title: 'Vision', desc: 'To become the leading smart electrical engineering company in Lebanon, expanding from smart homes to full-scale electrical infrastructure.' },
]

const team = [
  { name: 'Jamil Kammoun', role: 'Founder & Electrical / Smart Systems Engineer', initials: 'JK', color: '#2B5BA8', img: 'jamil' },
]

const milestones = [
  { year: 'Founded', event: 'EGS — Energex Global Solutions established in Tripoli, North Lebanon by Electrical Engineering specialist Jamil Kammoun.' },
  { year: 'Brands', event: 'Became official partner and dealer for Sonoff, Tuya, and Summao — the most trusted smart home brands globally.' },
  { year: 'Products', event: 'Catalog grew to 68+ smart home products across switches, lighting, security cameras, smart locks, and energy meters.' },
  { year: 'Today', event: 'Providing end-to-end smart home design, supply, installation and support across North Lebanon.' },
]

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: 'radial-gradient(ellipse at top, rgba(43,91,168,0.1) 0%, transparent 60%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-accent mb-4"
              style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.25)' }}>
              Our Story
            </div>
          </FadeIn>
          <RevealText delay={0.05}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              About <span className="text-primary">EGS</span>
            </h1>
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="text-gray-text text-lg max-w-2xl mx-auto leading-relaxed">
              EGS — Energex Global Solutions is a professional smart home and electrical engineering company based in North Lebanon, built on a simple belief: Lebanese homes deserve smart, reliable, and professionally engineered solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, color: '#2B5BA8', title: 'Who We Are', text: 'EGS — Energex Global Solutions is a professional smart home and electrical engineering company based in Tripoli, North Lebanon. We design, supply, and install complete smart home systems for residential and commercial clients. Every project is approached with full engineering discipline, from site assessment to final commissioning.' },
            { icon: Eye, color: '#8DC63F', title: 'Why We\'re Different', text: 'Our work is grounded in electrical engineering expertise, with a deep understanding of Lebanon\'s unique infrastructure challenges — power cuts, generator dependency, aging wiring, and unreliable internet. We build systems that work in the real world, not just on paper.' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="p-8 rounded-3xl h-full flex flex-col gap-5"
                style={{ background: '#0F1829', border: `1px solid ${item.color}22` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                  <p className="text-gray-text leading-relaxed">{item.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-8" style={{ background: 'rgba(15,24,41,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <RevealText delay={0.05}>
              <h2 className="text-4xl font-black text-white mb-4">Our Core Values</h2>
            </RevealText>
            <p className="text-gray-text text-lg max-w-lg mx-auto">The principles that guide every decision we make and every home we touch.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl h-full text-center"
                  style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(43,91,168,0.15)', border: '1px solid rgba(43,91,168,0.3)' }}>
                    <v.icon size={20} className="text-primary" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-3">{v.title}</h4>
                  <p className="text-gray-text text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <RevealText delay={0.05}>
              <h2 className="text-4xl font-black text-white mb-4">About EGS</h2>
            </RevealText>
            <p className="text-gray-text text-lg">Engineering-driven. Lebanon-focused. Built to grow.</p>
          </FadeIn>
          <div className="relative space-y-6 pl-8 border-l-2" style={{ borderColor: '#1E2D4A' }}>
            {milestones.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[38px] top-1 w-4 h-4 rounded-full border-2 border-primary bg-navy"
                    style={{ boxShadow: '0 0 10px rgba(43,91,168,0.5)' }} />
                  <div className="p-5 rounded-2xl" style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}>
                    <div className="text-xs font-bold text-primary mb-1 tracking-widest">{m.year}</div>
                    <p className="text-gray-text text-sm">{m.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 lg:px-8" style={{ background: 'rgba(15,24,41,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <RevealText delay={0.05}>
              <h2 className="text-4xl font-black text-white mb-4">Meet the Founder</h2>
            </RevealText>
            <p className="text-gray-text text-lg max-w-lg mx-auto">The engineer behind every EGS smart home installation.</p>
          </FadeIn>
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <motion.div whileHover={{ y: -4 }} className="p-8 rounded-2xl flex flex-col sm:flex-row gap-8 items-center"
                style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}>
                <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 border-2"
                  style={{ borderColor: 'rgba(43,91,168,0.4)' }}>
                  <img src="/images/jamil.jpg" alt="Jamil Kammoun"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'rgba(43,91,168,0.2)';
                      e.target.parentElement.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;height:100%;color:#2B5BA8;font-weight:900;font-size:1.5rem;">JK</span>';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-1">Jamil Kammoun</h4>
                  <p className="text-sm font-semibold mb-3" style={{ color: '#2B5BA8' }}>Founder &amp; Electrical / Smart Systems Engineer</p>
                  <p className="text-gray-text text-sm leading-relaxed mb-4">
                    Founded by Jamil Kammoun, an Electrical Engineering specialist, EGS was built on a strong technical foundation with a focus on real-world performance. With deep expertise in smart home technologies and electrical system design, Jamil leads the company with a practical, engineering-first approach — designed specifically for Lebanon's infrastructure realities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Electrical Engineering', 'Smart Home Systems', 'Power Distribution', 'North Lebanon', 'Sonoff / Tuya / Summao'].map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
                        style={{ background: 'rgba(43,91,168,0.12)', border: '1px solid rgba(43,91,168,0.25)', color: '#8DC63F' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <RevealText delay={0.05}>
              <h3 className="text-3xl font-black text-white mb-4">Work With Us</h3>
            </RevealText>
            <p className="text-gray-text mb-8">Have a project in mind? We'd love to discuss it. Free consultation, no pressure.</p>
            <ShimmerButton
              to="/contact"
              className="gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #2B5BA8, #1a3d7a)', boxShadow: '0 0 30px rgba(43,91,168,0.4)' }}
            >
              Get in Touch <ArrowRight size={15} />
            </ShimmerButton>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  )
}
