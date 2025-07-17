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
  const [search, setSearch] = useState<string>("")

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Simple Search */}
       <div className="relative max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Search"
        value={search || ""}
        onChange={(e) => setSearch(e.target.value || "")}
        className="w-full pl-5 pr-14 py-3 rounded-full bg-white shadow-md border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition"
      />
      <button
        type="submit"
        className="absolute right-1 top-1 bottom-1 w-10 h-10 rounded-full bg-pink-600 hover:bg-pink-700 flex items-center justify-center shadow-md transition"
      >
        <Search className="w-4 h-4 text-white" />
      </button>
    </div>

      {/* Results Count */}
      {search && (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {filtered.length} products found
          </p>
        </div>
      )}

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product, key) => (
            <div key={key} className="group">
              <ProductsCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            No products found for "{search}"
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 text-pink-600 hover:text-pink-700 underline"
          >
            Show all products
          </button>
        </div>
      )}
    </div>
  )
}