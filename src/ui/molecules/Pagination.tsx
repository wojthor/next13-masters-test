"use client";

import { useState, useEffect } from "react";
import { type Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { type ProductItemType } from "@/ui/types";

export const Pagination = ({ products }: { products: ProductItemType[] }) => {
	const [totalPages, setTotalPages] = useState(1);

	//Ustala ilość stron paginacji
	useEffect(() => {
		const totalProducts = 20;
		const productsPerPage = 10;
		const totalPagesCount = Math.ceil(totalProducts / productsPerPage);
		setTotalPages(totalPagesCount);
		console.log(totalPagesCount);
	}, [products]);

	return (
		<nav aria-label="pagination" className="flex justify-center">
			<ul className="inline-flex justify-center -space-x-px text-sm">
				{[...Array(totalPages).keys()].map((page) => (
					<li key={page + 1}>
						<ActiveLink
							href={`/products/${page + 1}` as Route}
							activeClassName="active"
							className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
