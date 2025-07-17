'use client'

import { useCartStore } from '@/store/cart-store'
import { Menu, X, ShoppingCart, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const { items } = useCartStore()
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/checkout', label: 'Checkout' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Name */}
          <Link href="/" className="group">
            <h1 className="text-2xl font-bold text-pink-600 dark:text-white tracking-tight group-hover:text-pink-700 dark:group-hover:text-pink-400 transition-all duration-300">
              MyEcommerce
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-16">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-base font-medium transition-all duration-300 py-2 px-1 ${
                      isActive
                        ? 'text-pink-600 dark:text-pink-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-600 dark:bg-pink-400 rounded-full"></div>
                    )}
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-600 dark:bg-pink-400 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Side - Cart */}
          <div className="flex items-center">
            <Link href="/checkout" className="relative group">
              <div className="relative">
                <div className="w-11 h-11 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 group-hover:border-pink-300 dark:group-hover:border-pink-600 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300" />
                </div>
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-pink-600 dark:bg-pink-500 text-white text-xs font-semibold rounded-full flex items-center justify-center px-1 shadow-lg border-2 border-white dark:border-gray-950">
                    {cartCount > 99 ? '99+' : cartCount}
                  </div>
                )}
              </div>
            </Link>

            {/* Mobile menu button */}
            <button 
              className="md:hidden ml-4 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="border-t border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl">
              <div className="py-6 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-4 text-lg font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-600 dark:border-pink-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}