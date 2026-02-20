import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { Navigation } from "@/ui/molecules/Navigation";
import { SearchBox } from "@/ui/atoms/SeachBox";
import { CartCount } from "@/ui/atoms/CartCount";

export const Navbar = () => {
	return (
		<div className="border-b border-neutral-200">
			<nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
				<Link
					href="/"
					className="text-xl font-semibold tracking-tight text-neutral-900 transition hover:opacity-80"
				>
					BaseCamp
				</Link>

				<ul className="hidden items-center gap-8 lg:flex">
					<Navigation />
				</ul>

				<div className="flex flex-1 items-center justify-end gap-4 lg:max-w-xs lg:flex-initial">
					<div className="relative w-full max-w-[200px] lg:max-w-full">
						<span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
							<CiSearch className="size-5" />
						</span>
						<SearchBox />
					</div>
					<CartCount />
				</div>
			</nav>
			{/* Mobile: horizontal nav */}
			<div className="overflow-x-auto border-t border-neutral-100 lg:hidden">
				<ul className="flex gap-6 px-6 py-3 text-sm">
					<Navigation />
				</ul>
			</div>
		</div>
	);
};
