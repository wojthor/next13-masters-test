"use client";

import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();
	formStatus.data;

	return (
		<button
			type="submit"
			data-testid="add-to-cart-button"
			disabled={formStatus.pending}
			className="w-full rounded-md border bg-slate-500 px-8 py-3 text-white disabled:cursor-wait"
		>
			Do koszyka
		</button>
	);
};
