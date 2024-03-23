/* eslint-disable @next/next/no-img-element */
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
		<>
			<section className="mx-auto flex w-full max-w-7xl flex-col gap-5 p-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-slate-900">Koszyk</h1>
				</div>
				<div>
					<ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
						{findCart.cart?.items.map((item) => (
							<li key={item.product.id} className="flex py-4">
								<div className="flex-shrink-0 rounded-md border bg-slate-50">
									<img
										className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
										src={item.product.images[0].url}
										alt={item.product.name}
									/>
								</div>
								<div className="relative ml-4 flex flex-1 flex-col justify-between ">
									<div className="flex justify-between">
										<div className="pr-6">
											<h3 className="font-medium text-slate-700">{item.product.name}</h3>
											<p className="mt-1 text-sm text-slate-500">
												{item.product.categories[0].name}
											</p>
										</div>
									</div>

									<div className="mt-4 gap-3 text-black">
										<div className="flex">
											<ChangeQuantity
												data-testid="quantity"
												quantity={item.quantity}
												id={CartId}
												productId={item.product.id}
											/>
										</div>
										<RemoveButton id={CartId} productId={item.product.id} />
									</div>
								</div>
								<p className="small-caps p-4  text-right font-semibold text-slate-900">
									{formatMoney((item.product.price / 100) * item.quantity)}
								</p>
							</li>
						))}
					</ul>
				</div>
				<div className="mt-8">
					<div className="rounded-lg bg-gray-50 p-4">
						<div className="flex items-center justify-between divide-gray-200">
							<h3 className="text-slate-900">Podsumowanie</h3>
							<h3 className=" small-caps font-medium text-slate-900">{totalCartPrice}</h3>
						</div>
					</div>
					<div className="mt-10 grid grid-cols-2">
						<form action={handleStripePaymentAction} className="">
							<button
								type="submit"
								className="w-full rounded border border-transparent bg-blue-500 px-6 py-3 font-medium text-slate-50 hover:bg-blue-600 disabled:bg-gray-300"
							>
								Zapłać
							</button>
						</form>
					</div>
				</div>
			</section>
			;
		</>
	);
}

/*
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
		*/
