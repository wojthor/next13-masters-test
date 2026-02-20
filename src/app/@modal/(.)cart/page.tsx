"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import {
	getCart,
	updateQuantity,
	removeFromCart,
	type LocalCartItem,
} from "@/lib/cart-store";
import { formatMoney } from "@/app/utils/formatMoney";
import { Overlay } from "@/ui/atoms/Overlay";

/** Pełna nawigacja – zamyka modal i pokazuje docelową stronę (nie w modalu). */
function goToFullPage(path: string) {
	window.location.href = path;
}

export default function ModalCart() {
	const [items, setItems] = useState<LocalCartItem[]>([]);

	useEffect(() => {
		const update = () => setItems(getCart());
		update();
		window.addEventListener("cart-updated", update);
		return () => window.removeEventListener("cart-updated", update);
	}, []);

	const totalCartPrice = items.reduce(
		(acc, item) => acc + (item.product.price / 100) * item.quantity,
		0,
	);

	return (
		<>
			<Overlay />
			<div
				className="animation-slide-from-right fixed bottom-0 right-0 top-0 z-50 flex h-full w-full flex-col overflow-hidden bg-white shadow-xl sm:w-[28rem]"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="z-30 flex-1 overflow-y-auto px-6 py-8">
					<div className="mb-6 flex items-center justify-between">
						<h1 className="text-xl font-semibold text-neutral-900">Koszyk</h1>
						<button
							type="button"
							onClick={() => goToFullPage("/cart")}
							className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
						>
							Wyświetl pełny koszyk
						</button>
					</div>
					<ul className="flex flex-col gap-6">
						{items.length === 0 ? (
							<li className="text-neutral-500">Koszyk jest pusty.</li>
						) : (
							items.map((item) => (
								<li key={item.productId} className="flex gap-4">
									<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
										<img
											className="h-full w-full object-cover"
											src={item.product.images[0]?.url ?? ""}
											alt={item.product.name}
											width={80}
											height={80}
										/>
									</div>
									<div className="ml-2 flex flex-1 flex-col justify-between">
										<div className="flex justify-between gap-2 text-sm font-medium text-neutral-900">
											<span className="line-clamp-2">{item.product.name}</span>
											<span className="shrink-0">
												{formatMoney((item.product.price / 100) * item.quantity)}
											</span>
										</div>
										<p className="mt-0.5 text-xs text-neutral-500">
											{item.product.categoryName ?? ""}
										</p>
										<div className="mt-2 flex items-center gap-2">
											<button
												type="button"
												className="h-8 w-8 shrink-0 rounded-full border border-neutral-200 text-sm hover:bg-neutral-100"
												onClick={() => updateQuantity(item.productId, item.quantity - 1)}
											>
												−
											</button>
											<span className="min-w-[1.25rem] text-center text-sm font-medium text-neutral-900">
												{item.quantity}
											</span>
											<button
												type="button"
												className="h-8 w-8 shrink-0 rounded-full border border-neutral-200 text-sm hover:bg-neutral-100"
												onClick={() => updateQuantity(item.productId, item.quantity + 1)}
											>
												+
											</button>
											<button
												type="button"
												onClick={() => removeFromCart(item.productId)}
												className="ml-2 text-xs text-neutral-500 hover:text-neutral-900"
											>
												Usuń
											</button>
										</div>
									</div>
								</li>
							))
						)}
					</ul>
					{items.length > 0 && (
						<div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-6">
							<div className="flex justify-between text-base font-medium text-neutral-900">
								<p>Suma</p>
								<p>{formatMoney(totalCartPrice)}</p>
							</div>
							<button
								type="button"
								onClick={() => goToFullPage("/cart")}
								className="w-full rounded-full bg-neutral-900 px-6 py-3.5 text-center text-sm font-medium text-white hover:bg-neutral-800"
							>
								Przejdź do koszyka
							</button>
							<button
								type="button"
								onClick={() => goToFullPage("/cart/checkout")}
								className="w-full rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-center text-sm font-medium text-neutral-900 hover:bg-neutral-50"
							>
								Przejdź do płatności
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
