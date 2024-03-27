import Stripe from "stripe";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { session_id: string };
}) {
	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(searchParams.session_id);
	console.log(stripeCheckoutSession.payment_status);

	return (
		<div className="container mx-auto px-4 py-8 text-center text-black">
			<h1 className="mb-4 text-2xl font-bold">Transakcja udana</h1>
			<p className="text-green-500">Gratulacje! Twoja transakcja została zakończona pomyślnie.</p>
			<p>Dziękujemy za zakupy!</p>
		</div>
	);
}
