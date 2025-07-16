import Image from "next/image"
import Stripe from "stripe"
import { Card, CardContent, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
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
    <Card className="min-w-[300px] w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition hover:shadow-md hover:-translate-y-1">
      {/* Image */}
      <div className="relative w-full h-[180px] bg-gray-100 dark:bg-gray-800">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white truncate">
            {product.name}
          </CardTitle>
          <span className="text-xs font-medium bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-200 px-2 py-1 rounded">
            {priceString}
          </span>
        </div>

        {product.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <Button
          asChild
          variant="outline"
          className="mt-2 w-full text-sm border-gray-300 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition"
        >
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
