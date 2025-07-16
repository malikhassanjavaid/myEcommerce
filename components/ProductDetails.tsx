"use client"
import Image from "next/image"
import Stripe from "stripe"
import { Button } from "./ui/button"
import { useCartStore } from "@/store/cart-store"

interface Props {
  product: Stripe.Product
}

export default function ProductDetailsPage({ product }: Props) {
  const price = product.default_price as Stripe.Price

  const priceString =
    typeof price.unit_amount === "number"
      ? `$${(price.unit_amount / 100).toFixed(2)}`
      : "N/A"

  const {items, addItem, removeItem} = useCartStore()

  const cartItem = items.find((item) => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    })
  }

  return (
 <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
  <div className="max-w-6xl mx-auto py-10 px-6 grid md:grid-cols-2 gap-12 items-center">
    <Image
      src={product.images?.[0] || "/placeholder.jpg"}
      alt={product.name}
      width={400}
      height={400}
      className="rounded-xl shadow-xl"
    />
<div className="flex flex-col justify-center space-y-6">
    <h1 className="text-5xl font-black uppercase tracking-tight">{product.name}</h1>
    <p className="text-gray-500 leading-relaxed">{product.description}</p>
    <p className="text-3xl font-bold text-pink-600">{priceString}</p>
    {/* <button
    className="w-fit px-6 py-3 border-2 border-black hover:border-pink-600 hover:bg-pink-600 hover:text-white cursor-pointer transition">
      Shop Now →
    </button> */}
     <div className="mt-6 flex items-center space-x-4">
      {/* Minus Button */}
      <Button
        onClick={() => removeItem(product.id)}
        className="bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        variant="ghost"
      >
        –
      </Button>

      {/* Quantity Display */}
      <span className="text-lg font-semibold w-6 text-center">{quantity}</span>

      {/* Plus Button */}
      <Button
        onClick={handleAdd}
        className="bg-lime-500 text-white hover:bg-lime-600"
      >
        +
      </Button>
    </div>
  </div>
  </div>
</div>






  )
}
