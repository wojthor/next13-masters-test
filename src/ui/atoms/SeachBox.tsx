"use client";

export function SearchBox() {
	return (
		<form action="/search" method="get">
			<input
				type="search"
				name="query"
				className="w-full rounded-md border-0 bg-slate-50 py-2 pl-11 pr-4 text-sm text-slate-800 ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
				placeholder="Search"
				aria-label="Search"
			/>
		</form>
	);
}
