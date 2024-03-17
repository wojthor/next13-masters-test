"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBox() {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setIsTyping(true);
	};

	useEffect(() => {
		if (!isTyping) return;

		const typingTimeout = setTimeout(() => {
			if (searchValue.trim() !== "") {
				router.replace(`/search?query=${encodeURIComponent(searchValue.trim())}`);
			}
			setIsTyping(false);
		}, 500);

		return () => clearTimeout(typingTimeout);
	}, [searchValue, isTyping, router]);

	return (
		<form action="/search">
			<input
				onChange={handleChange}
				type="search"
				name="query"
				className="w-full rounded-md border-0 bg-slate-50 py-2 pl-11 pr-4 text-sm text-slate-800 ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
				placeholder="Search"
				aria-label="Search"
			/>
		</form>
	);
}
