"use client";

import { useState } from "react";
import { addToCart, type LocalCartItem } from "@/lib/cart-store";

type ProductForCart = {
	id: string;
	name: string;
	price: number;
	images: { url: string }[];
	categoryName?: string;
};

export function AddToCartButton({ product }: { product: ProductForCart }) {
	const [quantity, setQuantity] = useState(1);

	const handleAdd = () => {
		const item: Omit<LocalCartItem, "quantity"> & { quantity?: number } = {
			productId: product.id,
			product: {
				id: product.id,
				name: product.name,
				price: product.price,
				images: product.images,
				categoryName: product.categoryName,
			},
			quantity,
		};
		addToCart(item);
		setQuantity(1);
	};

	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="h-11 w-11 rounded-full border border-neutral-200 font-medium text-neutral-900 hover:bg-neutral-100"
					onClick={() => setQuantity((q) => Math.max(1, q - 1))}
					aria-label="Zmniejsz ilość"
				>
					−
				</button>
				<span
					className="min-w-[2.5rem] text-center text-lg font-medium"
					data-testid="product-quantity"
				>
					{quantity}
				</span>
				<button
					type="button"
					className="h-11 w-11 rounded-full border border-neutral-200 font-medium text-neutral-900 hover:bg-neutral-100"
					onClick={() => setQuantity((q) => q + 1)}
					aria-label="Zwiększ ilość"
				>
					+
				</button>
			</div>
			<button
				type="button"
				data-testid="add-to-cart-button"
				onClick={handleAdd}
				className="w-full rounded-full bg-neutral-900 px-8 py-3.5 font-medium text-white hover:bg-neutral-800 sm:w-auto"
			>
				Do koszyka
			</button>
		</div>
	);
}
