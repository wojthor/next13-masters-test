import Link from "next/link";

const legalLinks = [
	{ href: "/regulamin", label: "Regulamin" },
	{ href: "/polityka-prywatnosci", label: "Polityka prywatności" },
	{ href: "/zwroty-reklamacje", label: "Zwroty i reklamacje" },
	{ href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
	return (
		<footer className="border-t border-neutral-200 bg-neutral-50">
			<div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				{/* Linki prawne */}
				<div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
					{legalLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm text-neutral-600 transition hover:text-neutral-900"
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Separator */}
				<div className="my-8 border-t border-neutral-200" />

				{/* Created by + link */}
				<div className="text-center">
					<p className="text-sm text-neutral-500">Created by Wojciech Aniszewski</p>
					<a
						href="https://aniszewski-code.pl"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-1 inline-block text-sm font-medium text-neutral-700 transition hover:text-neutral-900"
					>
						aniszewski-code.pl
					</a>
				</div>
			</div>
		</footer>
	);
}
