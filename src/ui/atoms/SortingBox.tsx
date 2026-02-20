/*
"use client";

import { useSearchParams } from "next/navigation";

export function SortingBox() {
	const searchParams = useSearchParams();

	function updateSorting(sortType: string) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", sortType);
		window.history.pushState(null, "", `?${params.toString()}`);
		location.reload();
	}

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		updateSorting(e.target.value);
	}

	return (
		<select
			onChange={handleChange}
			className="arrow-down-bg block w-48 cursor-pointer appearance-none rounded-md border-gray-300 px-2 py-1 text-sm font-light shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 lg:mt-1"
		>
			<option>Sortuj</option>
			<option value="RATING" data-testid="sort-by-rating">
				Sort by rating
			</option>
			<option value="PRICE" data-testid="sort-by-price">
				Sort by price
			</option>
		</select>
	);
}
*/
"use client";

import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SortingBox = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [selectValue, setSelectValue] = useState("Sort products");

	const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const params = new URLSearchParams(searchParams.toString());
		setSelectValue(event.target.value);
		switch (event.target.value) {
			case "ratingDesc":
				params.set("sort", "rating");
				params.set("sortOrder", "desc");
				break;
			case "ratingAsc":
				params.set("sort", "rating");
				params.set("sortOrder", "asc");
				break;
			case "nameAsc":
				params.set("sort", "name");
				params.set("sortOrder", "asc");
				break;
			case "nameDesc":
				params.set("sort", "name");
				params.set("sortOrder", "desc");
				break;
			case "priceDesc":
				params.set("sort", "price");
				params.set("sortOrder", "desc");
				break;
			case "priceAsc":
				params.set("sort", "price");
				params.set("sortOrder", "asc");
				break;
		}

		const url = `${pathname}?${params.toString()}` as Route;
		router.push(url);
	};

	return (
		<select
			onChange={selectChangeHandler}
			value={selectValue}
			className="arrow-down-bg block w-48 cursor-pointer appearance-none rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 focus:border-neutral-400 focus:outline-none"
		>
			<option disabled>Sort products</option>
			<option data-testid="sort-by-rating" value="ratingDesc">
				Rating (High to Low)
			</option>
			<option data-testid="sort-by-rating" value="ratingAsc">
				Rating (Low to High)
			</option>
			<option value="nameAsc">Name (A-Z)</option>
			<option value="nameDesc">Name (Z-A)</option>
			<option data-testid="sort-by-price" value="priceDesc">
				Price (High to Low)
			</option>
			<option data-testid="sort-by-price" value="priceAsc">
				Price (Low to High)
			</option>
		</select>
	);
};
