'use client'

import { useEffect, useRef, useState } from 'react'
import Stripe from 'stripe'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  products: Stripe.Product[]
}

export default function InfiniteScrollSlider({ products }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const translateXRef = useRef(0)
  const speedRef = useRef(1.0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!sliderRef.current || products.length === 0) return

    const slider = sliderRef.current
    let animationFrame: number
    const baseSpeed = 1.5
    const hoverSpeed = 0.4
    const lerpFactor = 0.12

    const cardWidth = 300 + 24 // card width + gap
    const totalWidth = products.length * cardWidth
    
    const animate = () => {
      if (!sliderRef.current) return

      const targetSpeed = isHovered ? hoverSpeed : baseSpeed
      speedRef.current += (targetSpeed - speedRef.current) * lerpFactor

      translateXRef.current -= speedRef.current

      // Reset when scrolled past original content
      if (Math.abs(translateXRef.current) >= totalWidth) {
        translateXRef.current = 0
      }

      slider.style.transform = `translate3d(${translateXRef.current}px, 0, 0)`
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [products, isHovered])

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={sliderRef}
        className="flex gap-6 will-change-transform"
        style={{ 
          width: `${(products.length * 2) * 324}px`,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        {/* Render products twice for infinite scroll */}
        {[...products, ...products].map((product, index) => {
          const price = product.default_price as Stripe.Price
          const priceString =
            typeof price.unit_amount === 'number'
              ? `$${(price.unit_amount / 100).toFixed(2)}`
              : 'N/A'

          return (
            <Link
              key={`${product.id}-${index}`}
              href={`/products/${product.id}`}
              className="flex-shrink-0 w-[300px] group cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-pink-500/20 will-change-transform">
                {/* Image Container */}
                <div className="relative h-[200px] bg-gray-50 dark:bg-gray-700 overflow-hidden">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                  
                  {/* Floating elements */}
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 will-change-transform">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-tight line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-500 ease-out">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {priceString}
                      </span>
                      
                      {/* Stock indicator */}
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Available</span>
                      </div>
                    </div>
                    
                    {/* Add to cart icon */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-2 group-hover:translate-x-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ease-out shadow-lg hover:shadow-xl will-change-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      
      {/* Subtle fade gradients with hardware acceleration */}
      <div className="pointer-events-none absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent dark:from-gray-900 z-10 will-change-transform" />
      <div className="pointer-events-none absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent dark:from-gray-900 z-10 will-change-transform" />
    </div>
  )
}
