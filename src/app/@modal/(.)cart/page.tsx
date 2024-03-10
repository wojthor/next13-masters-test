/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
import { Overlay } from "@/ui/atoms/Overlay";
import { getCart } from "@/api/cart";
import { formatMoney } from "@/app/utils/formatMoney";

export default async function ModalCart() {
	const cart = await getCart();

	const totalCartPrice = formatMoney(
		cart.cart?.items.reduce(
			(acc, item) => (acc += (item.product.price / 100) * item.quantity),
			0,
		) || 0,
	);

	return (
		<>
			<Overlay />
			<div className="animation-slide-from-right fixed bottom-0 right-0 top-0 z-50 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
				<div className="z-30 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
					<ul className="z-40 flex flex-col gap-5">
						<div className="z-50 flex flex-row justify-between">
							<h1 className="text-lg font-medium text-slate-900"> Koszyk</h1>
							<a className="text-sm text-blue-800 " href="/cart">
								Wyświetl koszyk
							</a>
						</div>

						{cart.cart?.items.map((item) => (
							<li key={item.product.id} className="flex flex-row gap-5">
								<div className="h-24 w-24 flex-shrink-0  overflow-hidden rounded-md border border-gray-200 ">
									<img
										className=" object-cover object-center  transition-transform hover:scale-105"
										src={item.product.images[0].url}
										alt={item.product.name}
										width={100}
										height={100}
									/>
								</div>
								<div className="ml-4 flex flex-1 flex-col">
									<div className="flex justify-between text-base font-medium text-slate-900">
										<h1> {item.product.name}</h1>
										<p className="small-caps ml-4">
											{" "}
											{formatMoney((item.product.price / 100) * item.quantity)}
										</p>
									</div>
									<p className="mt-1 text-sm text-slate-500"> {item.product.categories[0].name}</p>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="font-bold text-slate-500"> Ilość : {item.quantity}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<div className="mt-6 flex  flex-col gap-5 border-t border-gray-200 px-4 py-6 sm:px-6">
						<div className=" flex justify-between text-base font-medium text-slate-900">
							<p className="font-extrabold">Suma</p>
							<p className="small-caps"> {totalCartPrice} </p>
						</div>

						<button className="w-full rounded border border-transparent bg-blue-500 px-6 py-3 font-medium text-slate-50 hover:bg-blue-600 disabled:bg-gray-300">
							<a href="/cart"> Przejdz do koszyka</a>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
