'use client'

import {useCart} from '@/context/CartContext'
import {useState} from 'react'

interface AddToCartButtonProps {
  product: {
    _id: string
    name: string
    slug: string
    price: number
    image: string
  }
  variants?: Array<{
    size?: string
    color?: string
    stock?: number
  }>
}

export default function AddToCartButton({product, variants}: AddToCartButtonProps) {
  const {addToCart} = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        variant: selectedSize ? {size: selectedSize} : undefined,
      },
      quantity
    )

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const hasVariants = variants && variants.length > 0
  const canAddToCart = !hasVariants || selectedSize

  return (
    <div className="space-y-4">
      {/* Size Selector */}
      {hasVariants && (
        <div>
          <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Size</label>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(variant.size || '')}
                className={`px-4 py-2 border uppercase text-sm transition-colors ${
                  selectedSize === variant.size
                    ? 'bg-white text-black border-white'
                    : 'border-white/20 hover:border-white'
                }`}
                disabled={variant.stock === 0}
              >
                {variant.size}
                {variant.stock === 0 && ' (Sold Out)'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Quantity</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            −
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!canAddToCart}
        className={`w-full py-4 font-bold uppercase tracking-wider transition-colors ${
          added
            ? 'bg-green-500 text-white'
            : canAddToCart
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        {added ? '✓ Added to Cart' : canAddToCart ? 'Add to Cart' : 'Select a Size'}
      </button>
    </div>
  )
}
