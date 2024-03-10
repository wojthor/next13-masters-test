"use client";

import { useOptimistic } from "react";
import { changeItemQuantity } from "@/app/cart/actions";

export const ChangeQuantity = ({
	quantity,
	id,
	productId,
}: {
	quantity: number;
	id: string;
	productId: string;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex">
			<button
				className="h-6 w-6 border"
				data-testid="increment"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(id, productId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
			<span className="w-8 text-center">{optimisticQuantity}</span>
			<button
				className="h-6 w-6 border"
				data-testid="decrement"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(id, productId, optimisticQuantity - 1);
				}}
			>
				-
			</button>
		</form>
	);
};
