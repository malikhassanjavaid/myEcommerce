// /products/page.tsx

import ProductsList from "@/components/ProductsList"
import { stripe } from "@/lib/stripe"

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  })

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-screen-2xl mx-auto">

          {/* Unique Styled Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Discover <span className="text-pink-600">Curated Essentials</span>
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">
              Handpicked products crafted to match your taste.
            </p>
          </div>

          <ProductsList products={products.data} />
        </div>
      </div>
    </div>
  )
}
