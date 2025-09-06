"use server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

const ALLOWED_COUNTRIES = ["US", "CA", "GB", "PK", "AE"] as const;

export const checkoutAction = async (formData: FormData) => {
  const items = JSON.parse(String(formData.get("items") || "[]")) as CartItem[];
  if (!Array.isArray(items) || items.length === 0) return;

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: [...ALLOWED_COUNTRIES] },
    phone_number_collection: { enabled: true },
    customer_creation: "always",

    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Standard (3–5 days)",
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          display_name: "Express (1–2 days)",
          type: "fixed_amount",
          fixed_amount: { amount: 1500, currency: "usd" },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 2 },
          },
        },
      },
    ],

    line_items,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url!);
};
