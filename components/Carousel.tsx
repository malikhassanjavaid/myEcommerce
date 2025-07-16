'use client'

import { useEffect, useRef } from 'react'
import Stripe from 'stripe'
import Image from 'next/image'

interface Props {
  products: Stripe.Product[]
}

export default function InfiniteScrollSlider({ products }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderRef.current || products.length === 0) return

    const slider = sliderRef.current
    let animationFrame: number
    const scrollSpeed = 1 // px per frame

    // Duplicate content for infinite scroll effect
    slider.innerHTML += slider.innerHTML

    const scroll = () => {
      if (!sliderRef.current) return

      slider.scrollLeft += scrollSpeed

      // Reset when scrolled past half (since we duplicated once)
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0
      }

      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [products])

  return (
  <div className="relative w-full overflow-hidden bg-white rounded-2xl shadow-xl dark:bg-gray-950 py-10">
    <div className="max-w-7xl mx-auto">
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto no-scrollbar"
        style={{ scrollBehavior: 'auto', whiteSpace: 'nowrap' }}
      >
        {products.map((product) => {
          const price = product.default_price as Stripe.Price
          const priceString =
            typeof price.unit_amount === 'number'
              ? `$${(price.unit_amount / 100).toFixed(2)}`
              : 'N/A'

          return (
            <div
              key={product.id}
              className="flex-shrink-0 w-[250px] h-[280px] relative rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800"
            >
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                  No image
                </div>
              )}

              <div className="absolute bottom-0 w-full bg-black/60 text-white px-3 py-2 backdrop-blur-sm">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-gray-200">{priceString}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)
}
