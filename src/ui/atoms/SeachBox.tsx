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
				className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none focus:ring-0"
				placeholder="Szukaj"
				aria-label="Szukaj"
			/>
		</form>
	);
}
