"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Home, ShoppingBag, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

type ShippingDetails = {
  name?: string | null;
  phone?: string | null;
  address?: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
  } | null;
};

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { clearCart } = useCartStore();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [amountTotal, setAmountTotal] = useState<number | null>(null);
  const [shipping, setShipping] = useState<ShippingDetails | null>(null);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    (async () => {
      if (!sessionId) return setLoading(false);
      const res = await fetch(`/api/checkout-session?session_id=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setCurrency((data.currency || "USD").toUpperCase());
        setAmountTotal(typeof data.amount_total === "number" ? data.amount_total : null);
        setShipping(data.shipping ?? null);
      }
      setLoading(false);
    })();
  }, [sessionId]);

  const formattedTotal = useMemo(() => {
    if (amountTotal == null) return "-";
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amountTotal / 100);
  }, [amountTotal, currency]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>
      
      <div className="w-full max-w-lg z-10">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-lg opacity-50 animate-ping-slow"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg border border-emerald-100">
              <CheckCircle className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">Order Confirmed</h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
        </div>
        
        {/* Order Summary Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-500 mb-3"></div>
              <p className="text-slate-500">Loading your order details...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <span className="text-slate-600 font-medium">Total Paid</span>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {formattedTotal}
                </span>
              </div>
              
              {shipping && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-indigo-500" />
                    Shipping Information
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-indigo-50 rounded-lg">
                        <Mail className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Name</p>
                        <p className="font-medium text-slate-900">{shipping.name || "—"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-indigo-50 rounded-lg">
                        <Phone className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Phone</p>
                        <p className="font-medium text-slate-900">{shipping.phone || "—"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-indigo-50 rounded-lg">
                        <MapPin className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500">Address</p>
                        <div className="rounded-lg bg-slate-50 p-3 font-medium text-slate-900 text-sm">
                          {[
                            shipping.address?.line1,
                            shipping.address?.line2,
                            [shipping.address?.city, shipping.address?.state].filter(Boolean).join(", "),
                            shipping.address?.postal_code,
                            shipping.address?.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            className="group rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:from-pink-700 hover:to-pink-700 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            onClick={() => router.push("/products")}
          >
            <ShoppingBag className="h-5 w-5" />
            Continue Shopping
          </Button>
          
          <Button
            variant="outline"
            className="group rounded-xl cursor-pointer border-2 border-slate-200 py-3 font-medium transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] flex items-center justify-center gap-2"
            onClick={() => router.push("/")}
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>
        
        {/* Footer */}
        <div className="text-center text-sm text-slate-500 bg-white/50 backdrop-blur-sm rounded-xl py-4 px-6 border border-slate-100">
          <p>Questions about your order?</p>
          <p className="font-medium text-indigo-600 mt-1">Contact our support team</p>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}