import Image from "next/image"
import Stripe from "stripe"
import Link from "next/link"

interface Props {
  product: Stripe.Product
}

export default function ProductsCard({ product }: Props) {
  const price = product.default_price as Stripe.Price

  const priceString =
    typeof price.unit_amount === "number"
      ? `$${(price.unit_amount / 100).toFixed(2)}`
      : "N/A"

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer border border-gray-100 dark:border-gray-700">
        {/* Image Container */}
        <div className="relative w-full h-[240px] bg-gray-50 dark:bg-gray-700 overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {priceString}
              </span>
              
              {/* Star rating */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Add to cart icon */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
