"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import {
	getCart,
	removeFromCart,
	updateQuantity,
	type LocalCartItem,
} from "@/lib/cart-store";
import {
	DELIVERY_OPTIONS,
	getSelectedDelivery,
	setSelectedDelivery,
	getDeliveryOption,
	type DeliveryOptionId,
} from "@/lib/delivery-store";
import { formatMoney } from "@/app/utils/formatMoney";
import { LuPackage, LuShoppingBag } from "react-icons/lu";

function CartLine({
	item,
	onRemove,
	onQuantityChange,
}: {
	item: LocalCartItem;
	onRemove: () => void;
	onQuantityChange: (qty: number) => void;
}) {
	const price = item.product.price / 100;
	const imageUrl = item.product.images[0]?.url ?? "";

	return (
		<li className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300 sm:p-5">
			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-28">
				<img
					className="h-full w-full object-cover"
					src={imageUrl}
					alt={item.product.name}
				/>
			</div>
			<div className="min-w-0 flex-1">
				<Link
					href={`/product/${item.productId}`}
					className="font-medium text-neutral-900 hover:underline line-clamp-2"
				>
					{item.product.name}
				</Link>
				{item.product.categoryName && (
					<p className="mt-0.5 text-xs text-neutral-500">{item.product.categoryName}</p>
				)}
				<div className="mt-3 flex flex-wrap items-center gap-3">
					<div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50">
						<button
							type="button"
							className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 rounded-l-full transition"
							data-testid="decrement"
							onClick={() => onQuantityChange(item.quantity - 1)}
							aria-label="Zmniejsz ilość"
						>
							−
						</button>
						<span data-testid="quantity" className="w-8 text-center text-sm font-medium text-neutral-900">
							{item.quantity}
						</span>
						<button
							type="button"
							className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 rounded-r-full transition"
							data-testid="increment"
							onClick={() => onQuantityChange(item.quantity + 1)}
							aria-label="Zwiększ ilość"
						>
							+
						</button>
					</div>
					<button
						type="button"
						onClick={onRemove}
						className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition"
					>
						Usuń
					</button>
				</div>
			</div>
			<p className="shrink-0 text-right font-semibold text-neutral-900">
				{formatMoney(price * item.quantity)}
			</p>
		</li>
	);
}

export default function CartContent() {
	const [items, setItems] = useState<LocalCartItem[]>([]);
	const [delivery, setDelivery] = useState<DeliveryOptionId | null>(null);

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

	// Domyślna dostawa tylko gdy użytkownik jeszcze nic nie wybrał
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

	return (
		<div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8">
			<div className="mb-8">
				<h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Koszyk</h1>
				<p className="mt-1 text-sm text-neutral-500">
					{items.length === 0
						? "Twój koszyk jest pusty"
						: `${items.length} ${items.length === 1 ? "produkt" : "produkty"} w koszyku`}
				</p>
			</div>

			{items.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50/50 py-20 px-6">
					<div className="rounded-full bg-neutral-200/80 p-6">
						<LuShoppingBag className="size-12 text-neutral-500" />
					</div>
					<h2 className="mt-6 text-xl font-semibold text-neutral-900">Brak produktów</h2>
					<p className="mt-2 max-w-sm text-center text-sm text-neutral-500">
						Dodaj produkty do koszyka, a następnie wróć tutaj, aby dokończyć zamówienie.
					</p>
					<Link
						href="/products/1"
						className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-neutral-800 transition"
					>
						Przejdź do sklepu
					</Link>
				</div>
			) : (
				<div className="grid gap-10 lg:grid-cols-[1fr,22rem]">
					<div className="space-y-6">
						<ul className="space-y-4">
							{items.map((item) => (
								<CartLine
									key={item.productId}
									item={item}
									onRemove={() => removeFromCart(item.productId)}
									onQuantityChange={(qty) => updateQuantity(item.productId, qty)}
								/>
							))}
						</ul>

						{/* Opcje dostawy */}
						<div className="rounded-2xl border border-neutral-200 bg-white p-6">
							<div className="flex items-center gap-2 text-neutral-900">
								<LuPackage className="size-5 text-neutral-500" />
								<h2 className="text-lg font-semibold">Wybierz dostawę</h2>
							</div>
							<p className="mt-1 text-sm text-neutral-500">
								Dostawa na terenie Polski
							</p>
							<div className="mt-4 space-y-2">
								{DELIVERY_OPTIONS.map((opt) => (
									<label
										key={opt.id}
										className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition ${
											delivery === opt.id
												? "border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900"
												: "border-neutral-200 hover:border-neutral-300"
										}`}
									>
										<input
											type="radio"
											name="delivery"
											value={opt.id}
											checked={delivery === opt.id}
											onChange={() => {
												setSelectedDelivery(opt.id);
												setDelivery(opt.id);
											}}
											className="sr-only"
										/>
										<div>
											<p className="font-medium text-neutral-900">{opt.name}</p>
											<p className="text-xs text-neutral-500">{opt.description}</p>
											<p className="mt-0.5 text-xs text-neutral-500">{opt.estimatedDays}</p>
										</div>
										<span className="shrink-0 font-semibold text-neutral-900">
											{formatMoney(opt.priceCents / 100)}
										</span>
									</label>
								))}
							</div>
						</div>

						{/* Smaczki */}
						<div className="flex flex-wrap gap-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 px-6 py-4 text-sm text-neutral-600">
							<span className="flex items-center gap-2">
								<span className="text-green-600">✓</span> Zwroty do 14 dni
							</span>
							<span className="flex items-center gap-2">
								<span className="text-green-600">✓</span> Bezpieczna płatność Stripe
							</span>
							<span className="flex items-center gap-2">
								<span className="text-green-600">✓</span> Wysyłka w 24h
							</span>
						</div>
					</div>

					{/* Podsumowanie */}
					<aside className="lg:sticky lg:top-24 lg:self-start">
						<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-neutral-900">Podsumowanie</h2>
							<dl className="mt-4 space-y-3 text-sm">
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
									<dt>Razem</dt>
									<dd>{formatMoney(total)}</dd>
								</div>
							</dl>
							<Link
								href="/cart/checkout"
								className="mt-6 block w-full rounded-full bg-neutral-900 py-3.5 text-center text-sm font-medium text-white hover:bg-neutral-800 transition"
							>
								Przejdź do płatności
							</Link>
							<Link
								href="/products/1"
								className="mt-3 block text-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition"
							>
								Kontynuuj zakupy
							</Link>
						</div>
					</aside>
				</div>
			)}
		</div>
	);
}
