import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-50 dark:bg-pink-900/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gray-50 dark:bg-gray-700 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Grid Container */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-16">
        {/* Left: Text Content */}
        <div className="text-center lg:text-left space-y-8 z-10">
          {/* Badge */}
          <div className="relative inline-flex items-center">
            <div className="flex items-center px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 dark:from-emerald-400 dark:to-teal-500 rounded-full shadow-xl border-2 border-white/20 backdrop-blur-sm">
              <div className="relative mr-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                NEW COLLECTION
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
              Discover <span className="text-pink-600 dark:text-pink-400">Your Style</span>
            </h1>
            
            <div className="flex items-center justify-center lg:justify-start space-x-2 mt-4">
              <div className="h-1 w-12 bg-pink-600 dark:bg-pink-400 rounded-full" />
              <div className="h-1 w-8 bg-pink-400 dark:bg-pink-500 rounded-full" />
              <div className="h-1 w-4 bg-pink-300 dark:bg-pink-600 rounded-full" />
            </div>
          </div>

          {/* Supporting Paragraph */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Explore premium fashion pieces that blend modern aesthetics with timeless elegance. 
            Crafted for those who appreciate <span className="text-pink-600 dark:text-pink-400 font-medium">quality and style</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button asChild className="group px-8 py-6 text-lg font-semibold bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/products" className="flex items-center justify-center gap-3">
                <span>Shop Collection</span>
                <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="group px-8 py-6 text-lg font-semibold border-2 border-pink-300 dark:border-pink-600 hover:border-pink-600 dark:hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-all duration-300">
              <span className="text-pink-700 dark:text-pink-300 group-hover:text-pink-800 dark:group-hover:text-pink-200">
                Learn More
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "1000+", label: "Products" },
              { value: "4.9★", label: "Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image Display */}
        <div className="relative flex justify-center lg:justify-end z-10">
          <div className="relative w-full max-w-lg">
            {/* Main Image Container */}
            <div className="relative group">
              {/* Subtle Shadow with Pink Accent */}
              <div className="absolute inset-0 bg-pink-200 dark:bg-pink-800 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Image Card */}
              <div className="relative bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 group-hover:shadow-3xl transition-all duration-500">
                <div className="aspect-[4/5] relative overflow-hidden rounded-2xl">
                  <Image
                    src="/girl.png"
                    alt="Fashion Collection"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-pink-200 dark:border-pink-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Premium Collection</h3>
                          <p className="text-sm text-pink-600 dark:text-pink-400">Limited Edition</p>
                        </div>
                        <div className="w-10 h-10 bg-pink-600 dark:bg-pink-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Floating Elements with Pink Accents */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-200 dark:bg-pink-700 rounded-lg shadow-lg opacity-70" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-300 dark:bg-pink-600 rounded-full shadow-lg opacity-60" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-500">
        <span className="text-xs font-medium">Scroll Down</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}