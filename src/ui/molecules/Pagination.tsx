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
		<nav
			aria-label="pagination"
			className="isolate flex  justify-center -space-x-px rounded-md shadow-sm"
		>
			<ul className="inline-flex justify-center -space-x-px py-7 text-sm">
				{[...Array(totalPages).keys()].map((page) => (
					<li key={page + 1}>
						<ActiveLink
							href={
								`/${currentPath}/${params.categoryName ? params.categoryName + "/" : ""}${page + 1}` as Route
							}
							activeClassName="relative z-10 inline-flex items-center bg-blue-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-blue-600"
							className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							exact={false}
							partialMatch={true}
						>
							<div>{page + 1}</div>
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
