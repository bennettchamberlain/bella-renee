'use client'

import Link from 'next/link'
import {useCart} from '@/context/CartContext'
import {useState} from 'react'

export default function Header() {
  const {getItemCount} = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden -ml-2 p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo - Centered on mobile, left on desktop */}
          <Link 
            href="/" 
            className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 text-3xl md:text-2xl font-bold text-white uppercase tracking-widest hover:text-gray-300 transition-colors"
          >
            Bella Renee
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link 
              href="/products" 
              className="text-white hover:text-gray-400 uppercase text-sm font-medium tracking-widest transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-gray-400 uppercase text-sm font-medium tracking-widest transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* Search - Hidden on mobile */}
            <button 
              className="hidden md:block text-white hover:text-gray-400 transition-colors" 
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart - Always visible */}
            <Link href="/cart" className="relative text-white hover:text-gray-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-white hover:text-gray-400 uppercase text-base font-medium tracking-widest transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-400 uppercase text-base font-medium tracking-widest transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              {/* Search in mobile menu */}
              <button 
                className="text-white hover:text-gray-400 uppercase text-base font-medium tracking-widest transition-colors py-2 text-left"
              >
                Search
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
