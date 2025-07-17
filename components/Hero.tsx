import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0 -z-10" />

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* Left: Text Content */}
        <div className="text-center lg:text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-pink-100 dark:bg-pink-900/20 border border-pink-300/30 dark:border-pink-700/40 rounded-full">
            <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
              ✨ New Collection Available
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Discover the New You
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Explore our exclusive collection of modern fashion pieces — 
            <span className="text-pink-600 font-semibold"> stylish</span>, 
            <span className="text-purple-600 font-semibold"> affordable</span>, and 
            <span className="text-blue-600 font-semibold"> sustainably made</span>.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild className="px-12 py-5 text-base font-semibold bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-lg transition">
              <Link href="/products" className="flex items-center gap-2">
                Shop Now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
            {[
              ["10K+", "Happy Customers"],
              ["500+", "Products"],
              ["4.9★", "Rating"],
            ].map(([value, label], i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image Display */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-[400px] h-[500px] md:w-[480px] md:h-[600px]">
            {/* Floating elements */}
            <div className="absolute -top-2 right-16 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl opacity-80 animate-pulse z-20" />
            <div className="absolute bottom-20 left-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-70 animate-bounce z-20" />

            {/* Back image frame */}
            <div className="absolute top-12 left-16 w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl transform rotate-[-6deg] scale-90 bg-gradient-to-br from-white/20 to-purple-100/20 border border-white/30 backdrop-blur-md z-0 transition-transform duration-700 hover:rotate-[-3deg] hover:scale-95">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10" />
              <Image
                src="/girl.png"
                alt="Fashion Collection"
                fill
                className="object-cover rounded-3xl opacity-90 transition-all duration-700 hover:opacity-100"
              />
            </div>

            {/* Front image frame */}
            <div className="absolute top-0 left-0 w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/30 to-purple-100/30 border border-white/40 backdrop-blur-lg z-10 transition-all duration-700 hover:scale-105 hover:shadow-3xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/girl.png"
                alt="Premium Collection"
                fill
                className="object-cover rounded-3xl transition-all duration-700 group-hover:scale-110"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Premium Collection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Curated fashion essentials</p>
                </div>
              </div>
            </div>

            {/* Decorative lines */}
            <div className="absolute -top-6 right-45 -translate-x-1/2 w-22 h-1 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full opacity-60" />
            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
