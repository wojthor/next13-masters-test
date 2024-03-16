import { ChangeQuantity } from "@/app/cart/ChangeQuantity";
import { RemoveButton } from "@/app/cart/RemoveButton";
import { getCart, getCartIdFromCookie, handleStripePaymentAction } from "@/api/cart";
import { formatMoney } from "@/app/utils/formatMoney";

export default async function Cart() {
	const cart = await getCartIdFromCookie();
	const CartId = cart?.toString() || "";
	const findCart = await getCart();

	const totalCartPrice = formatMoney(
		findCart.cart?.items.reduce(
			(acc, item) => (acc += (item.product.price / 100) * item.quantity),
			0,
		) || 0,
	);

	return (
		<div className="text-black">
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{findCart.cart?.items.map((item) => (
						<tr key={item.product.id}>
							<td>{item.product.name}</td>
							<td className="px-4 text-center">
								<ChangeQuantity
									data-testid="quantity"
									quantity={item.quantity}
									id={CartId}
									productId={item.product.id}
								/>
							</td>
							<td>{formatMoney((item.product.price / 100) * item.quantity)} </td>
							<td>
								{" "}
								<RemoveButton id={CartId} productId={item.product.id} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<form action={handleStripePaymentAction} className="ml-auto">
				<button
					type="submit"
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
				>
					Pay
				</button>
			</form>
			<h1> {totalCartPrice}</h1>
		</div>
	);
}
