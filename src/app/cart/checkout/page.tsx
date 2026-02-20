import Link from "next/link";
import { CartCheckoutContent } from "@/app/cart/CartCheckoutContent";

export default function CheckoutPage() {
	return (
		<section className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12 lg:px-8">
			<h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Płatność</h1>
			<CartCheckoutContent />
			<Link
				href="/cart"
				className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
			>
				← Wróć do koszyka
			</Link>
		</section>
	);
}
