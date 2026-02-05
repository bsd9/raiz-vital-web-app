'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type Producto } from '@/data/productos'

interface CartItem {
  producto: Producto
  cantidad: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (producto: Producto) => void
  removeItem: (productoId: string) => void
  updateQuantity: (productoId: string, cantidad: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((producto: Producto) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.producto.id === producto.id)
      
      if (existingItem) {
        return currentItems.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      
      return [...currentItems, { producto, cantidad: 1 }]
    })
  }, [])

  const removeItem = useCallback((productoId: string) => {
    setItems(currentItems => currentItems.filter(item => item.producto.id !== productoId))
  }, [])

  const updateQuantity = useCallback((productoId: string, cantidad: number) => {
    if (cantidad <= 0) {
      setItems(currentItems => currentItems.filter(item => item.producto.id !== productoId))
      return
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.producto.id === productoId ? { ...item, cantidad } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0)
  const itemCount = items.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
