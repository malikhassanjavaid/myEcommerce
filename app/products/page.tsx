import ProductsList from "@/components/ProductsList"
import { stripe } from "@/lib/stripe"

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  })

  return (
    <main className="bg-gray-50 dark:bg-black min-h-screen">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Explore Our Products
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Handpicked items, just for you
        </p>
      </section>

      <section className="max-w-7xl mx-auto pb-24">
        <ProductsList products={products.data} />
      </section>
    </main>
  )
}
