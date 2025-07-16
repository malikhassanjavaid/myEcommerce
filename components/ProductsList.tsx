"use client"
import Stripe from "stripe"
import ProductsCard from "./ProductCard"
import { Input } from "./ui/input"
import { useState } from "react"
import { Search } from "lucide-react"

interface Props {
  products: Stripe.Product[]
}

export default function ProductsList({ products }: Props) {
  const [search, setSearch] = useState("")

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
        />
      </div>

     <ul className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {filtered.map((product, key) => (
    <li key={key} className="h-full">
      <ProductsCard product={product} />
    </li>
  ))}
</ul>

    </div>
  )
}
