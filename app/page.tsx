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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 dark:from-pink-500/5 dark:via-purple-500/5 dark:to-indigo-500/5" />
        <div className="relative">
          <HeroSection />
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-gray-900/50" />
        <div className="relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products, carefully curated for style and quality
            </p>
          </div>

          {/* Products Carousel */}
          <div>
              <CarouselPage products={products.data} />
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Premium Quality</h4>
              <p className="text-gray-600 dark:text-gray-300">Hand-selected products with guaranteed quality</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Fast Delivery</h4>
              <p className="text-gray-600 dark:text-gray-300">Quick and reliable shipping worldwide</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h4>
              <p className="text-gray-600 dark:text-gray-300">Always here to help with any questions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
