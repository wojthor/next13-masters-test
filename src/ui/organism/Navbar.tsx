"use server";
import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
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
		<div className=" mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
			<div className="flex flex-col justify-between gap-y-4 pb-4 lg:flex-row lg:items-center lg:pb-0">
				<nav className="scrolling-touch scroll-shadows -mx-2 flex overflow-x-scroll underline lg:mx-0 lg:h-16 lg:overflow-x-auto">
					<div className="hidden flex-shrink-0 items-center lg:flex"></div>
					<ul className="flex h-16 max-w-full space-x-8 whitespace-nowrap lg:px-8">
						<Navigation />
					</ul>
				</nav>
				<div className="flex h-full flex-1 items-center px-2 lg:ml-6 lg:h-16 lg:justify-end">
					<div className="w-full max-w-lg lg:max-w-xs">
						<div className="relative">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<CiSearch className="text-black" />
							</div>
							<SearchBox />
						</div>
					</div>
				</div>
				<div className="ml-auto h-full lg:ml-4">
					<li className="flex h-full w-16 items-center justify-center border-b-2 border-transparent px-2 text-center text-xl font-medium text-slate-500 hover:border-gray-300 hover:text-slate-700">
						<Link href="/cart">
							<LuShoppingBag className="font-bold" />
						</Link>
						<div className="w-4">
							<h3 className="ml-2 text-sm font-medium ">{count || 0} </h3>
						</div>
					</li>
				</div>
			</div>
		</div>
	);
};
