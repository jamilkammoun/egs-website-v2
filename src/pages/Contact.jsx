import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import RevealText from '../components/RevealText'

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

const services = ['Smart Home Installation', 'Electrical Systems', 'Product Supply Only', 'Maintenance & Support', 'Other / Not sure yet']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const subject = encodeURIComponent('EGS Inquiry — ' + (form.service || 'General'))
    const body = encodeURIComponent(
      'Hello EGS,\n\n' +
      'Name: ' + form.name + '\n' +
      'Phone: ' + form.phone + '\n' +
      (form.email ? 'Email: ' + form.email + '\n' : '') +
      'Service: ' + (form.service || 'Not specified') + '\n\n' +
      'Message:\n' + form.message + '\n\n' +
      '---\nSent via energexglobalsolutions.com'
    )
    window.location.href = 'mailto:info@energexglobalsolutions.com?subject=' + subject + '&body=' + body
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: 'radial-gradient(ellipse at top, rgba(43,91,168,0.1) 0%, transparent 60%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-accent mb-4"
              style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.25)' }}>
              Let's Talk
            </div>
          </FadeIn>
          <RevealText delay={0.05}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Get In <span className="text-primary">Touch</span>
            </h1>
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="text-gray-text text-lg max-w-xl mx-auto">
              Free consultation. No pressure. We'll design the right smart home solution for your space and budget.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

          {/* Contact info */}
          <div className="space-y-5">
            <FadeIn>
              {[
                { icon: Phone, label: 'Phone', value: '+961 71 676 127', sub: 'Call or WhatsApp anytime', color: '#2B5BA8', href: 'tel:+96171676127' },
                { icon: Mail, label: 'Email', value: 'info@energexglobalsolutions.com', sub: 'We reply within 2 hours', color: '#8DC63F', href: 'mailto:info@energexglobalsolutions.com' },
                { icon: MapPin, label: 'Location', value: 'Tripoli, North Lebanon', sub: 'Serving all of North Lebanon', color: '#E8814D', href: null },
                { icon: MessageSquare, label: 'WhatsApp', value: '+961 71 676 127', sub: 'Fastest response — usually minutes', color: '#25D366', href: 'https://wa.me/96171676127' },
              ].map((item, i) => (
                item.href ? (
                  <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex items-start gap-4 p-5 rounded-2xl hover:border-white/20 transition-colors"
                      style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-text mb-0.5">{item.label}</div>
                        <div className="text-white font-semibold text-sm">{item.value}</div>
                        <div className="text-gray-text text-xs">{item.sub}</div>
                      </div>
                    </motion.div>
                  </a>
                ) : (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-text mb-0.5">{item.label}</div>
                      <div className="text-white font-semibold text-sm">{item.value}</div>
                      <div className="text-gray-text text-xs">{item.sub}</div>
                    </div>
                  </motion.div>
                )
              ))}
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(141,198,63,0.08)', border: '1px solid rgba(141,198,63,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={15} className="text-accent" />
                  <span className="text-white font-semibold text-sm">Free Consultation</span>
                </div>
                <p className="text-gray-text text-xs leading-relaxed">
                  Free consultation — no pressure. We'll visit your site, assess the electrical setup, and provide a full proposal at no cost.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.15}>
              <div className="p-8 md:p-10 rounded-3xl" style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'rgba(141,198,63,0.15)', border: '2px solid rgba(141,198,63,0.4)' }}>
                      <CheckCircle size={32} className="text-accent" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-text max-w-md mx-auto">
                      Your email app has opened with the message ready to send. We'll get back to you as soon as possible — usually within a few hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                      className="mt-8 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                      style={{ border: '1px solid rgba(43,91,168,0.5)', background: 'rgba(43,91,168,0.1)' }}>
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-white mb-2">Send Us a Message</h2>
                    <p className="text-gray-text text-sm mb-8">Fill in the form below — it will open your email app with the message ready to send to <strong className="text-white">info@energexglobalsolutions.com</strong></p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+961 XX XXX XXX' },
                        ].map((field) => (
                          <div key={field.name} className={field.name === 'message' ? 'sm:col-span-2' : ''}>
                            <label className="block text-xs font-semibold text-gray-text mb-2 uppercase tracking-wide">
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={form[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              required
                              className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-subtle outline-none transition-all duration-200"
                              style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid #1E2D4A',
                              }}
                              onFocus={(e) => { e.target.style.borderColor = '#2B5BA8'; e.target.style.boxShadow = '0 0 0 3px rgba(43,91,168,0.15)' }}
                              onBlur={(e) => { e.target.style.borderColor = '#1E2D4A'; e.target.style.boxShadow = 'none' }}
                            />
                          </div>
                        ))}

                        {/* Service select */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-text mb-2 uppercase tracking-wide">
                            Service Interested In
                          </label>
                          <select
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none"
                            style={{
                              background: '#0A0F1E',
                              border: '1px solid #1E2D4A',
                              color: form.service ? 'white' : '#9CA3AF',
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#2B5BA8' }}
                            onBlur={(e) => { e.target.style.borderColor = '#1E2D4A' }}
                          >
                            <option value="" disabled>Select a service</option>
                            {services.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-text mb-2 uppercase tracking-wide">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project — property type, number of rooms, what you'd like to automate..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-subtle outline-none transition-all duration-200 resize-none"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid #1E2D4A',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = '#2B5BA8'; e.target.style.boxShadow = '0 0 0 3px rgba(43,91,168,0.15)' }}
                          onBlur={(e) => { e.target.style.borderColor = '#1E2D4A'; e.target.style.boxShadow = 'none' }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.02 }}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm transition-all duration-300 disabled:opacity-70"
                        style={{
                          background: loading ? '#1a3d7a' : 'linear-gradient(135deg, #2B5BA8, #1a3d7a)',
                          boxShadow: loading ? 'none' : '0 0 30px rgba(43,91,168,0.4)',
                        }}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
