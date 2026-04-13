import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { product, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.product.id !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== id))
    } else {
      setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i))
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, totalCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
