import { type Route } from "next";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/products/1", label: "All" },
	{ href: "/categories/t-shirts/1", label: "T-shirts" },
	{ href: "/categories/hoodies/1", label: "Hoodies" },
	{ href: "/categories/accessories/1", label: "Accessories" },
];

export const Navigation = async () => {
	return (
		<>
			{navLinks.map((link) => (
				<li key={link.href} className="first:pl-4 last:pr-4 lg:px-0">
					<ActiveLink
						href={link.href as Route}
						className="flex h-full w-full min-w-[3rem] items-center justify-center  px-1 pt-1 text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-slate-700"
						activeClassName="flex h-full w-full min-w-[3rem] items-center justify-center border-b-2 border-blue-500 px-1 pt-1 text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-slate-700"
						partialMatch
					>
						{link.label}
					</ActiveLink>
				</li>
			))}
		</>
	);
};
