import Stripe from "stripe";
import Link from "next/link";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { session_id?: string | string[] };
}) {
	const sessionId = Array.isArray(searchParams.session_id)
		? searchParams.session_id[0]
		: searchParams.session_id;

	if (!process.env.STRIPE_SECRET_KEY) {
		return (
			<div className="mx-auto max-w-lg px-6 py-16 text-center">
				<p className="text-neutral-600">Brak konfiguracji płatności.</p>
			</div>
		);
	}

	if (!sessionId) {
		return (
			<div className="mx-auto max-w-lg px-6 py-16 text-center">
				<h1 className="text-xl font-semibold text-neutral-900">Brak sesji</h1>
				<p className="mt-2 text-neutral-600">Nie znaleziono potwierdzenia płatności.</p>
				<Link href="/cart" className="mt-4 inline-block text-sm font-medium text-neutral-600 hover:text-neutral-900">
					Wróć do koszyka
				</Link>
			</div>
		);
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	return (
		<div className="mx-auto max-w-lg px-6 py-16 text-center">
			<h1 className="text-2xl font-semibold text-neutral-900">Transakcja zakończona</h1>
			<p className="mt-2 text-neutral-600">
				{session.payment_status === "paid"
					? "Dziękujemy za zakupy! Płatność została przyjęta."
					: "Sesja płatności została zarejestrowana."}
			</p>
			<Link
				href="/"
				className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
			>
				Wróć do sklepu
			</Link>
		</div>
	);
}
