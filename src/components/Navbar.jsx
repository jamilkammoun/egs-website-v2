import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { totalCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10, 15, 30, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30, 45, 74, 0.6)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="h-10 flex items-center">
              <img
                src="/images/EGS-logo.png"
                alt="EGS Logo"
                className="h-full w-auto object-contain"
                style={{ maxWidth: '110px', filter: 'brightness(1.05)' }}
                onError={(e) => {
                  e.target.src = '/images/EGS-logo.jpg'
                  e.target.onerror = null
                }}
              />
            </div>
            <div className="flex flex-col leading-tight hidden sm:flex">
              <span className="font-black text-white text-base tracking-widest uppercase">EGS</span>
              <span className="text-gray-text text-[10px] tracking-[0.2em] uppercase">Energex Global Solutions</span>
            </div>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-white' : ''}>{link.label}</span>
                    {/* Active underline */}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-accent transition-all duration-300"
                      style={{ width: isActive ? '70%' : '0%' }}
                    />
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-primary/60 w-0 group-hover:w-[70%] transition-all duration-300" />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side: Cart + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart button */}
            <motion.button
              onClick={onCartOpen}
              whileTap={{ scale: 0.92 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
              aria-label="Open cart"
            >
              <ShoppingCart size={18} />
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center"
                    style={{ background: '#8DC63F' }}
                  >
                    {totalCount > 9 ? '9+' : totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <NavLink
              to="/contact"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #2B5BA8, #1a3d7a)',
                boxShadow: '0 0 20px rgba(43,91,168,0.35)',
              }}
            >
              Get a Quote
            </NavLink>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={onCartOpen}
              whileTap={{ scale: 0.92 }}
              className="relative p-2 rounded-lg text-gray-300 hover:text-white"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key="badge-m"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                    style={{ background: '#8DC63F' }}
                  >
                    {totalCount > 9 ? '9+' : totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10"
            style={{
              background: 'rgba(10, 15, 30, 0.97)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    {({ isActive }) => (
                      <span className={isActive ? 'text-accent font-semibold' : ''}>{link.label}</span>
                    )}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="pt-3">
                <NavLink
                  to="/contact"
                  className="block w-full text-center px-5 py-3 rounded-lg text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #2B5BA8, #1a3d7a)' }}
                >
                  Get a Quote
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
