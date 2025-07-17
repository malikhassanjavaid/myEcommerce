'use client';

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCartStore()
  useEffect(() => {
    clearCart()
  },[clearCart])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Order Confirmed</h1>
          <p className="text-gray-600">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-medium">#ORD-123456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery:</span>
            <span className="font-medium">3-5 business days</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-pink-600 hover:bg-pink-700 text-white cursor-pointer" 
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </Button>
          <Button 
            variant="outline" 
            className="w-full cursor-pointer"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
