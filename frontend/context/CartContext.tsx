'use client'

import React, {createContext, useContext, useEffect, useState} from 'react'

interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  image: string
  variant?: {
    size?: string
    color?: string
  }
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (productId: string, variant?: {size?: string; color?: string}) => void
  updateQuantity: (productId: string, quantity: number, variant?: {size?: string; color?: string}) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bella-renee-cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bella-renee-cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.variant?.size === item.variant?.size &&
          i.variant?.color === item.variant?.color
      )

      if (existingIndex > -1) {
        const newItems = [...prev]
        newItems[existingIndex].quantity += quantity
        return newItems
      }

      return [...prev, {...item, quantity}]
    })
  }

  const removeFromCart = (productId: string, variant?: {size?: string; color?: string}) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variant?.size === variant?.size &&
            item.variant?.color === variant?.color
          )
      )
    )
  }

  const updateQuantity = (productId: string, quantity: number, variant?: {size?: string; color?: string}) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant)
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.variant?.size === variant?.size &&
        item.variant?.color === variant?.color
          ? {...item, quantity}
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
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
