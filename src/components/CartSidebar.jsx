import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartSidebar({ open, onClose }) {
  const { items, removeFromCart, updateQty, clearCart, totalCount } = useCart()

  const handleWhatsApp = () => {
    if (items.length === 0) return
    const lines = items.map(i =>
      `• ${i.product.name} (${i.product.model}) × ${i.qty}`
    ).join('%0A')
    const msg = `Hi EGS!%0A%0AI'd like to inquire about the following products:%0A%0A${lines}%0A%0APlease send me a price quote.%0AThank you!`
    window.open(`https://wa.me/96171676127?text=${msg}`, '_blank')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[70] flex flex-col"
            style={{
              background: '#0A0F1E',
              borderLeft: '1px solid #1E2D4A',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#1E2D4A' }}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-accent" />
                <h2 className="text-white font-black text-lg">Cart</h2>
                {totalCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ background: '#8DC63F' }}>
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-text hover:text-red-400 transition-colors px-2 py-1 rounded"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-text hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(43,91,168,0.1)', border: '1px solid rgba(43,91,168,0.2)' }}>
                    <ShoppingBag size={28} className="text-primary opacity-50" />
                  </div>
                  <p className="text-gray-text text-sm">Your cart is empty.</p>
                  <p className="text-gray-text text-xs">Browse products and add items to inquire via WhatsApp.</p>
                </div>
              ) : (
                items.map(({ product, qty }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 p-3 rounded-xl"
                    style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}
                  >
                    {/* Product image */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <img
                        src={`/images/${product.img}.jpg`}
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold mb-0.5" style={{ color: product.color }}>{product.brand}</div>
                      <div className="text-white text-xs font-semibold leading-tight mb-1 truncate">{product.name}</div>
                      <div className="text-gray-text text-[10px]">{product.model}</div>
                    </div>

                    {/* Qty controls + remove */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-text hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-white transition-all"
                          style={{ background: 'rgba(43,91,168,0.3)', border: '1px solid rgba(43,91,168,0.4)' }}
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-white text-xs font-bold w-5 text-center">{qty}</span>
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-white transition-all"
                          style={{ background: 'rgba(43,91,168,0.3)', border: '1px solid rgba(43,91,168,0.4)' }}
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t space-y-3" style={{ borderColor: '#1E2D4A' }}>
                <div className="p-3 rounded-xl text-xs text-gray-text text-center"
                  style={{ background: 'rgba(141,198,63,0.06)', border: '1px solid rgba(141,198,63,0.15)' }}>
                  {totalCount} item{totalCount !== 1 ? 's' : ''} in cart — send inquiry to get your price quote
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    boxShadow: '0 0 25px rgba(37,211,102,0.35)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send Inquiry on WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
