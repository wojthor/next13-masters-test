"use server";
import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import { Navigation } from "@/ui/molecules/Navigation";
import { getCart } from "@/api/cart";
import { SearchBox } from "@/ui/atoms/SeachBox";

export const Navbar = async () => {
	const cart = await getCart();
	if (!cart) {
		throw new Error("Cart is empty");
	}
	const count = cart.cart?.items.length;

	return (
		<div className=" sticky top-0 z-20 border-b bg-white bg-opacity-60 backdrop-blur-lg">
			<nav className="scrolling-touch scroll-shadows -mx-2 flex overflow-x-scroll underline lg:mx-0 lg:h-16 lg:overflow-x-auto">
				<ul className="flex h-16 max-w-full space-x-8 whitespace-nowrap lg:px-8">
					<Navigation />
				</ul>
				<div className="flex h-full flex-1 items-center px-2 lg:ml-6 lg:h-16 lg:justify-end">
					<div className="flex w-full max-w-lg justify-end lg:max-w-xs">
						<SearchBox />
					</div>
				</div>
			</nav>
			<li className="flex h-full w-full min-w-[3rem] items-center justify-end gap-2 px-1 pt-1 text-center text-xl font-medium text-slate-500 hover:border-gray-300 hover:text-slate-700">
				<Link href="/cart">
					<LuShoppingBag className="font-bold" />
				</Link>
				<h3>{count || 0} </h3>
			</li>
		</div>
	);
};
