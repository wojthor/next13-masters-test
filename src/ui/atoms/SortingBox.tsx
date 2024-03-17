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
				OPTION
			</option>
			<option value="PRICE" data-testid="sort-by-price">
				BUTTON
			</option>
		</select>
	);
}
