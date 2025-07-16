'use client'

import { useCartStore } from '@/store/cart-store'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const { items } = useCartStore()
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600 hover:opacity-80 transition">
          MyEcommerce
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`transition text-lg ${pathname === '/' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`transition text-lg ${pathname.startsWith('/products') ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className={`transition text-lg ${pathname === '/checkout' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
          >
            Checkout
          </Link>
        </div>

        {/* Cart & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link href="/checkout" className="relative inline-block">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu icon */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 px-6 pb-4">
          <Link
            href="/"
            className={`transition text-sm ${pathname === '/' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`transition text-sm ${pathname.startsWith('/products') ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className={`transition text-sm ${pathname === '/checkout' ? 'text-pink-600 font-semibold' : 'text-gray-700 hover:text-pink-600'}`}
          >
            Checkout
          </Link>
        </div>
      )}
    </nav>
  )
}
