import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative py-8 overflow-hidden bg-white dark:bg-gray-950">
      {/* Glowing Blurred Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-pink-500 opacity-20 blur-3xl rounded-full top-[-150px] left-[-150px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
            Discover the <span className="text-pink-600">Future</span> of Shopping
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
            Explore curated collections of premium products. Stylish, affordable, and delivered with care — redefining your shopping experience.
          </p>
          <Button asChild className="px-6 py-3 text-base font-medium border-2 border-black hover:bg-pink-600 hover:border-pink-600 hover:text-white transition">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>

        {/* Overlapping Album-Style Images */}
       <div className="relative flex justify-center">
  <div className="relative w-[320px] h-[380px] md:w-[400px] md:h-[480px]">
    {/* Back Image (soft and clean) */}
    <div className="absolute top-8 left-20 w-full h-full rounded-3xl overflow-hidden shadow-md transform rotate-[-4deg] scale-90 bg-white/10 border border-white/20 backdrop-blur-sm z-0">
      <Image
        src="/girl.png"
        alt="Product 2"
        fill
        className="object-cover rounded-3xl opacity-90"
      />
    </div>

    {/* Front Image */}
    <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white/10 border border-white/20 backdrop-blur-md z-10">
      <Image
        src="/girl.png"
        alt="Product 1"
        fill
        className="object-cover rounded-3xl"
      />
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
