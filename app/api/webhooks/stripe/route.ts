import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const retrieveParams: Stripe.Checkout.SessionRetrieveParams = {
  expand: ["payment_intent", "customer", "shipping_cost.shipping_rate"],
};

function addr(a?: Stripe.Address | null) {
  return {
    line1: a?.line1 ?? null,
    line2: a?.line2 ?? null,
    city: a?.city ?? null,
    state: a?.state ?? null,
    postal_code: a?.postal_code ?? null,
    country: a?.country ?? null,
  };
}

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

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !whSecret) {
    return NextResponse.json({ error: "Missing Stripe signature/secret" }, { status: 400 });
  }

  // Use raw body for signature verification
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, whSecret);
  } catch (err: any) {
    console.error("[stripe] invalid signature:", err?.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  try {
    const sessionObj = event.data.object as Stripe.Checkout.Session;

    // Retrieve full session and cast
    const fullResp = await stripe.checkout.sessions.retrieve(sessionObj.id, retrieveParams);
    const full = fullResp as Stripe.Checkout.Session;

    const pi =
      typeof full.payment_intent === "string"
        ? null
        : (full.payment_intent as Stripe.PaymentIntent);

    const customer = full.customer_details ?? null;
    const shipping = normalizeShipping(full);

    // Idempotent upsert by session id (handles Stripe retries)
    const { data: orderRow, error: orderErr } = await supabaseAdmin
      .from("orders")
      .upsert(
        {
          stripe_session_id: full.id,
          payment_intent_id: pi?.id ?? null,
          customer_email: customer?.email ?? null,
          customer_name: customer?.name ?? null,
          customer_phone: customer?.phone ?? null,
          amount_total: full.amount_total,
          currency: full.currency,
          payment_status: full.payment_status,
          shipping_name: shipping.name ?? null,
          shipping_phone: shipping.phone ?? null,
          ...(() => {
            const a = addr(shipping.address);
            return {
              shipping_line1: a.line1,
              shipping_line2: a.line2,
              shipping_city: a.city,
              shipping_state: a.state,
              shipping_postal_code: a.postal_code,
              shipping_country: a.country,
            };
          })(),
          raw: full,
        },
        { onConflict: "stripe_session_id" }
      )
      .select("id")
      .single();

    if (orderErr) {
      console.error("[orders] upsert error:", orderErr);
      return NextResponse.json({ received: true });
    }

    const orderId = orderRow!.id;

    // Persist line items
    const lineItems = await stripe.checkout.sessions.listLineItems(full.id, {
      expand: ["data.price.product"],
      limit: 100,
    });

    const itemsRows = lineItems.data.map((li) => {
      const price = li.price as Stripe.Price | null;
      const product = (price?.product ?? null) as Stripe.Product | string | null;

      const unit =
        li.amount_subtotal && li.quantity
          ? Math.round(li.amount_subtotal / li.quantity)
          : price?.unit_amount ?? 0;

      return {
        order_id: orderId,
        stripe_price_id: price?.id ?? null,
        stripe_product_id: typeof product === "object" && product ? product.id : null,
        product_name: typeof product === "object" && product ? product.name : li.description ?? "Item",
        unit_amount: unit,
        quantity: li.quantity ?? 1,
      };
    });

    if (itemsRows.length) {
      const { error: itemsErr } = await supabaseAdmin.from("order_items").insert(itemsRows);
      if (itemsErr) console.error("[order_items] insert error:", itemsErr);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe webhook] handler error:", err);
    return NextResponse.json({ received: true });
  }
}
