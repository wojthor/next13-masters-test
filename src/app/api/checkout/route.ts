import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type CheckoutItem = {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
};

const DELIVERY_NAMES: Record<string, string> = {
	inpost: "Dostawa InPost Paczkomaty",
	dhl: "Dostawa DHL",
	dpd: "Dostawa DPD",
};

export async function POST(req: NextRequest) {
	const stripeSecret = process.env.STRIPE_SECRET_KEY;
	if (!stripeSecret) {
		return NextResponse.json(
			{ error: "Brak konfiguracji Stripe (STRIPE_SECRET_KEY)." },
			{ status: 500 },
		);
	}

	let body: {
		items: CheckoutItem[];
		delivery?: string;
		deliveryPriceCents?: number;
	};
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "Nieprawidłowy body." }, { status: 400 });
	}

	if (!Array.isArray(body.items) || body.items.length === 0) {
		return NextResponse.json(
			{ error: "Koszyk jest pusty lub nieprawidłowy." },
			{ status: 400 },
		);
	}

	const origin =
		req.headers.get("origin") ||
		req.headers.get("referer")?.replace(/\/.*$/, "") ||
		"http://localhost:3000";

	const stripe = new Stripe(stripeSecret, {
		apiVersion: "2026-01-28.clover",
		typescript: true,
	});

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = body.items.map(
		(item: CheckoutItem) => ({
			price_data: {
				currency: "pln",
				product_data: {
					name: item.name,
					...(item.image ? { images: [item.image] } : {}),
				},
				unit_amount: Math.round(item.price),
			},
			quantity: item.quantity,
		}),
	);

	const deliveryCents = body.deliveryPriceCents ?? 0;
	if (deliveryCents > 0) {
		const deliveryName =
			DELIVERY_NAMES[body.delivery ?? ""] ?? "Dostawa";
		line_items.push({
			price_data: {
				currency: "pln",
				product_data: { name: deliveryName },
				unit_amount: deliveryCents,
			},
			quantity: 1,
		});
	}

	try {
		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items,
			success_url: `${origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cart/checkout`,
		});

		if (!session.url) {
			return NextResponse.json(
				{ error: "Stripe nie zwrócił URL sesji." },
				{ status: 500 },
			);
		}

		return NextResponse.json({ url: session.url });
	} catch (err) {
		console.error("Stripe checkout error:", err);
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Błąd tworzenia sesji Stripe." },
			{ status: 500 },
		);
	}
}
