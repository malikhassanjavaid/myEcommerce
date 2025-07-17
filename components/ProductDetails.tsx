"use client"
import Image from "next/image"
import Stripe from "stripe"
import { Button } from "./ui/button"
import { useCartStore } from "@/store/cart-store"
import { Heart, Share2, Star, ShoppingBag, Minus, Plus, ArrowLeft, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Props {
  product: Stripe.Product
}

export default function ProductDetailsPage({ product }: Props) {
  const price = product.default_price as Stripe.Price

  const priceString =
    typeof price.unit_amount === "number"
      ? `$${(price.unit_amount / 100).toFixed(2)}`
      : "N/A"

  const {items, addItem} = useCartStore()

  const cartItem = items.find((item) => item.id === product.id)

  const [selectedQuantity, setSelectedQuantity] = useState(() => {
    return cartItem ? cartItem.quantity : 1
  })

  const [showNotification, setShowNotification] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleIncrement = () => {
    setSelectedQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setSelectedQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Simulate a brief loading state
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: price.unit_amount as number,
        imageUrl: product.images ? product.images[0] : null,
        quantity: selectedQuantity,
      })
      
      setIsAdding(false)
      setShowNotification(true)
      
      // Auto hide notification after 4 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 4000)
    }, 500)
  }

  const closeNotification = () => {
    setShowNotification(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-white border border-green-200 shadow-2xl rounded-xl p-4 flex items-center gap-4 min-w-[320px]">
            <div className="flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Added to Bucket!</h4>
              <p className="text-sm text-gray-600">
                {selectedQuantity}x {product.name} added successfully
              </p>
            </div>
            <button
              onClick={closeNotification}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {/* Back Button */}
      <Link 
        href="/products" 
        className="inline-flex items-center mb-8 group"
      >
        <div className="flex items-center transition-all duration-300 hover:scale-105">
          {/* Circle part */}
          <div className="w-12 h-12 border-2 border-pink-600 rounded-full flex items-center justify-center bg-white group-hover:bg-pink-700 group-hover:border-pink-700 transition-all duration-300 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </Link>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-start space-y-8">
          {/* Product Name */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            {product.description && (
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              {priceString}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrement}
                  className="p-3 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <Minus className="w-5 h-5 text-pink-600" />
                </button>
                <span className="px-6 py-3 min-w-[60px] text-center font-bold text-lg">
                  {selectedQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-3 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 text-pink-600" />
                </button>
              </div>
            </div>  

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAdding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Add to Bucket
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}