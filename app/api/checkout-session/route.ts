import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const retrieveParams: Stripe.Checkout.SessionRetrieveParams = {
  expand: ["payment_intent", "customer", "shipping_cost.shipping_rate"],
};

function normalizeShipping(session: Stripe.Checkout.Session) {
  const pi =
    typeof session.payment_intent === "string"
      ? null
      : (session.payment_intent as Stripe.PaymentIntent);

  const fromPI = pi?.shipping ?? null;
  const cust = session.customer_details ?? null;

  return {
    name: fromPI?.name ?? cust?.name ?? null,
    phone: fromPI?.phone ?? cust?.phone ?? null,
    address: fromPI?.address ?? cust?.address ?? null,
  };
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  // Stripe typings wrap this as Response<Session>; cast to the concrete Session.
  const sessionResp = await stripe.checkout.sessions.retrieve(sessionId, retrieveParams);
  const session = sessionResp as Stripe.Checkout.Session;

  return NextResponse.json({
    id: session.id,
    currency: session.currency,
    amount_total: session.amount_total,
    shipping: normalizeShipping(session),                  // { name, phone, address }
    customer_email: session.customer_details?.email ?? null,
    shipping_cost: session.shipping_cost ?? null,
  });
}
