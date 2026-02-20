"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, type LocalCartItem } from "@/lib/cart-store";
import {
	getSelectedDelivery,
	setSelectedDelivery,
	getDeliveryOption,
	type DeliveryOptionId,
} from "@/lib/delivery-store";
import { formatMoney } from "@/app/utils/formatMoney";
import { LuPackage } from "react-icons/lu";

export function CartCheckoutContent() {
	const [items, setItems] = useState<LocalCartItem[]>([]);
	const [delivery, setDelivery] = useState<DeliveryOptionId | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const update = () => setItems(getCart());
		update();
		window.addEventListener("cart-updated", update);
		return () => window.removeEventListener("cart-updated", update);
	}, []);

	useEffect(() => {
		const update = () => setDelivery(getSelectedDelivery());
		update();
		window.addEventListener("delivery-updated", update);
		return () => window.removeEventListener("delivery-updated", update);
	}, []);

	// Domyślna dostawa tylko gdy w koszyku nic nie wybrano (np. wejście bezpośrednio na checkout)
	useEffect(() => {
		if (items.length > 0 && getSelectedDelivery() === null) {
			setSelectedDelivery("inpost");
			setDelivery("inpost");
		}
	}, [items.length]);

	const subtotal = items.reduce(
		(acc, item) => acc + (item.product.price / 100) * item.quantity,
		0,
	);
	const deliveryOption = delivery ? getDeliveryOption(delivery) : null;
	const deliveryPrice = deliveryOption ? deliveryOption.priceCents / 100 : 0;
	const total = subtotal + deliveryPrice;

	const handleStripeCheckout = async () => {
		setError(null);
		setLoading(true);
		try {
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					items: items.map((item) => ({
						productId: item.productId,
						name: item.product.name,
						price: item.product.price,
						quantity: item.quantity,
						image: item.product.images[0]?.url,
					})),
					delivery: delivery ?? "inpost",
					deliveryPriceCents: deliveryOption?.priceCents ?? 999,
				}),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error ?? "Błąd tworzenia płatności.");
				return;
			}
			if (data.url) {
				window.location.href = data.url;
				return;
			}
			setError("Brak adresu płatności.");
		} catch {
			setError("Nie udało się połączyć z serwerem.");
		} finally {
			setLoading(false);
		}
	};

	if (items.length === 0) {
		return (
			<div className="rounded-2xl bg-neutral-50 p-8 text-center">
				<p className="text-neutral-600">Koszyk jest pusty.</p>
				<Link
					href="/"
					className="mt-4 inline-block text-sm font-medium text-neutral-900 hover:underline"
				>
					Przejdź do sklepu
				</Link>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<ul className="divide-y divide-neutral-200">
				{items.map((item) => (
					<li key={item.productId} className="flex items-center gap-4 py-4">
						<img
							src={item.product.images[0]?.url ?? ""}
							alt={item.product.name}
							className="h-16 w-16 rounded-xl object-cover bg-neutral-100"
						/>
						<div className="flex-1 min-w-0">
							<p className="font-medium text-neutral-900 truncate">{item.product.name}</p>
							<p className="text-sm text-neutral-500">
								{item.quantity} × {formatMoney(item.product.price / 100)}
							</p>
						</div>
						<p className="font-medium text-neutral-900 shrink-0">
							{formatMoney((item.product.price / 100) * item.quantity)}
						</p>
					</li>
				))}
			</ul>

			{/* Wybrana dostawa (tylko informacja, zmiana w koszyku) */}
			{deliveryOption && (
				<div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-neutral-200/80 p-2.5">
								<LuPackage className="size-5 text-neutral-600" />
							</div>
							<div>
								<h2 className="text-lg font-semibold text-neutral-900">Dostawa</h2>
								<p className="font-medium text-neutral-900">{deliveryOption.name}</p>
								<p className="text-sm text-neutral-500">
									{deliveryOption.description} · {deliveryOption.estimatedDays}
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold text-neutral-900">
								{formatMoney(deliveryOption.priceCents / 100)}
							</p>
							<Link
								href="/cart"
								className="mt-1 block text-sm font-medium text-neutral-500 hover:text-neutral-900"
							>
								Zmień w koszyku
							</Link>
						</div>
					</div>
				</div>
			)}

			<div className="rounded-2xl bg-neutral-50 p-6">
				<dl className="space-y-3 text-sm mb-6">
					<div className="flex justify-between text-neutral-600">
						<dt>Produkty</dt>
						<dd>{formatMoney(subtotal)}</dd>
					</div>
					{deliveryOption && (
						<div className="flex justify-between text-neutral-600">
							<dt>Dostawa ({deliveryOption.name})</dt>
							<dd>{formatMoney(deliveryPrice)}</dd>
						</div>
					)}
					<div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold text-neutral-900">
						<dt>Do zapłaty</dt>
						<dd>{formatMoney(total)}</dd>
					</div>
				</dl>

				{error && (
					<p className="mb-4 text-sm text-red-600" role="alert">
						{error}
					</p>
				)}

				<button
					type="button"
					onClick={handleStripeCheckout}
					disabled={loading}
					className="w-full rounded-full bg-neutral-900 px-6 py-3.5 text-center text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? "Przekierowuję do Stripe…" : "Zapłać przez Stripe"}
				</button>
			</div>
		</div>
	);
}
