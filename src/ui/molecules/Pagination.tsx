"use client";
import { type Route } from "next";
import { usePathname } from "next/navigation";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Pagination = ({
	params,
	productsInfo,
}: {
	params: { pageNumber: string; categoryName?: string };
	productsInfo: number;
}) => {
	const path = usePathname();
	const totalPages = Math.ceil(productsInfo / 4);
	const currentPath = path.split("/")[1];

	return (
		<nav aria-label="pagination" className="flex justify-center">
			<ul className="inline-flex gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1">
				{[...Array(totalPages).keys()].map((page) => (
					<li key={page + 1}>
						<ActiveLink
							href={
								`/${currentPath}/${params.categoryName ? params.categoryName + "/" : ""}${page + 1}` as Route
							}
							activeClassName="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full bg-neutral-900 px-4 text-sm font-medium text-white"
							className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-600 transition hover:bg-neutral-200 hover:text-neutral-900"
							exact={false}
							partialMatch={true}
							aria-label={`Strona ${page + 1}`}
						>
							{page + 1}
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
