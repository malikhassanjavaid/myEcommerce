'use client';

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { checkoutAction } from "./checkout-section";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const handleClick = () => router.push("/products");

  const { items, removeItem, addItem, clearItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (total === 0 || items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your <span className="text-pink-600">Basket</span> is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything yet.</p>
        <Button 
          className="bg-pink-600 hover:bg-pink-700 text-white cursor-pointer"
          onClick={handleClick}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Shopping Basket</h1>

        <div className="hidden md:grid grid-cols-12 font-medium text-gray-500 border-b pb-4">
          <div className="col-span-6">Product</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-3 text-right">Total</div>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 items-center border-b pb-6 gap-y-6 md:gap-6 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Image and Info */}
              <div className="col-span-6 flex gap-4">
                <div className="w-24 h-28 relative rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div>
                  <Link 
                    className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors" 
                    href={`/products/${item.id}`}
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    ${(item.price / 100).toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="col-span-3 flex items-center justify-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 space-x-4 shadow-sm">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-lg font-bold cursor-pointer text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-base font-medium">{item.quantity}</span>
                  <button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="text-lg font-bold cursor-pointer text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => clearItem(item.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Total */}
              <div className="col-span-3 text-right text-lg font-semibold text-gray-900">
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal and Action Buttons */}
        <form action={checkoutAction} className="flex justify-end">
          <div className="w-full max-w-md bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
            <div className="flex justify-between text-xl font-semibold text-gray-900">
              <span>Subtotal</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
            <input type="hidden" name="items" value={JSON.stringify(items)}/>
            <div className="space-y-3 pt-4">
              <Button 
                type="submit" 
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 cursor-pointer"
              >
                Proceed to Checkout
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 cursor-pointer"
                onClick={handleClick}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}