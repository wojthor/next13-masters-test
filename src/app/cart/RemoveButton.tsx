"use client";

import { useTransition } from "react";

import { removeItem } from "@/app/cart/actions";

export function RemoveButton({ id, productId }: { id: string; productId: string }) {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeItem(id, productId);
				})
			}
			className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			Remove
		</button>
	);
}
