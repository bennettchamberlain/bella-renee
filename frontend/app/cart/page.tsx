'use client'

import {useCart} from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const {items, removeFromCart, updateQuantity, getTotal} = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold uppercase mb-6">Your Cart</h1>
          <p className="text-gray-400 text-lg mb-8">Your cart is empty</p>
          <Link
            href="/products"
            className="inline-block bg-white text-black px-8 py-4 font-bold uppercase hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold uppercase mb-12">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant?.size || 'default'}`}
                className="flex gap-6 border-b border-white/10 pb-6"
              >
                {/* Image */}
                <div className="relative w-24 h-32 bg-white/5 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <Link href={`/products/${item.slug}`} className="font-semibold hover:text-gray-300">
                    {item.name}
                  </Link>
                  {item.variant?.size && (
                    <p className="text-sm text-gray-400">Size: {item.variant.size.toUpperCase()}</p>
                  )}
                  <p className="font-medium">${item.price.toFixed(2)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)}
                        className="w-8 h-8 border border-white/20 hover:bg-white hover:text-black transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)}
                        className="w-8 h-8 border border-white/20 hover:bg-white hover:text-black transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId, item.variant)}
                      className="text-sm text-gray-400 hover:text-white transition-colors ml-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 p-6 space-y-4 sticky top-24">
              <h2 className="text-xl font-bold uppercase">Order Summary</h2>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold border-t border-white/10 pt-4">
                <span>Total</span>
                <span>${getTotal().toFixed(2)} USD</span>
              </div>

              <button className="w-full bg-white text-black py-4 font-bold uppercase hover:bg-gray-200 transition-colors">
                Checkout
              </button>

              <Link
                href="/products"
                className="block text-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
