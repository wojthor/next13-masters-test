"use client";

import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart-store";

export function CartCount() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const update = () => setCount(getCart().reduce((sum, i) => sum + i.quantity, 0));
		update();
		window.addEventListener("cart-updated", update);
		return () => window.removeEventListener("cart-updated", update);
	}, []);

	return (
		<Link
			href="/cart"
			className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-200"
		>
			<LuShoppingBag className="size-5" />
			<span>{count}</span>
		</Link>
	);
}
