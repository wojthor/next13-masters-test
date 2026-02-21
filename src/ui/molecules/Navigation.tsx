import { type Route } from "next";

import { getCategories } from "@/api/products";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

const staticLinks: { href: Route; label: string }[] = [
	{ href: "/", label: "Home" },
	{ href: "/products/1" as Route, label: "Wszystkie" },
];

export const Navigation = async () => {
	const categories = await getCategories();
	const categoryLinks = categories.map((cat) => ({
		href: `/categories/${cat.slug}/1` as Route,
		label: cat.name,
	}));
	const navLinks = [...staticLinks, ...categoryLinks];

	return (
		<>
			{navLinks.map((link) => (
				<li key={link.href + link.label}>
					<ActiveLink
						href={link.href}
						className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
						activeClassName="text-neutral-900"
						partialMatch
						aria-current
					>
						{link.label}
					</ActiveLink>
				</li>
			))}
		</>
	);
};
