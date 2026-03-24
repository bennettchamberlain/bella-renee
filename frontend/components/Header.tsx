'use client'

import Link from 'next/link'
import {useCart} from '@/context/CartContext'
import {useState} from 'react'

export default function Header() {
  const {getItemCount} = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white hover:text-gray-300"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white uppercase tracking-wider">
            Bella Renee
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/products" className="text-white hover:text-gray-300 uppercase text-sm tracking-wide">
              Shop
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search - will implement later */}
            <button className="p-2 text-white hover:text-gray-300" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-white hover:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <Link
              href="/products"
              className="block py-2 text-white hover:text-gray-300 uppercase text-sm tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
