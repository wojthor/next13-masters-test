"use client";

import { useRouter } from "next/navigation";

export function Overlay() {
	const router = useRouter();
	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => router.back()}
			onKeyDown={(e) => e.key === "Escape" && router.back()}
			className="animation-fade-in fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
			aria-label="Zamknij"
		/>
	);
}
