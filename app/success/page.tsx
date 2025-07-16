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
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-xl w-full text-center space-y-6">
        <CheckCircle className="mx-auto text-green-500" size={60} />
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 text-lg">
          Thank you for your purchase. Your order is being processed and you’ll receive a confirmation email soon.
        </p>

        <div className="border-t pt-6 text-left text-sm text-gray-500">
          <p className="mb-1">
            <span className="font-medium text-gray-700">Order ID:</span> #123456789
          </p>
          <p>
            <span className="font-medium text-gray-700">Estimated Delivery:</span> 3-5 business days
          </p>
        </div>

        <Button className="w-full" onClick={() => router.push("/products")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
