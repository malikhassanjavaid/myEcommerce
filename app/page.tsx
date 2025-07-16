import CarouselPage from "@/components/Carousel"
import HeroSection from "@/components/Hero"
import { Button } from "@/components/ui/button"
import { stripe } from "@/lib/stripe"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 6,
  })

  return (
    <main className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
     <div>
      <HeroSection/>
     </div>

      {/* Carousel Section */}
      <section className="bg-gray-50 dark:bg-gray-950 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            <span className="text-pink-600">Featured picks</span> of the Week
          </h2>
          <CarouselPage products={products.data} />
        </div>
      </section>
    </main>
  )
}
