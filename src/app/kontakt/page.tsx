import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Kontakt",
	description: "Skontaktuj się z nami",
};

export default function KontaktPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
			<h1 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900">Kontakt</h1>
			<div className="prose prose-neutral prose-p:text-neutral-600">
				<p>
					W sprawie zamówień, zwrotów i reklamacji skorzystaj z poniższych form kontaktu.
				</p>
				<ul className="mt-6 list-none space-y-2 pl-0">
					<li>
						<strong className="text-neutral-900">E-mail:</strong>{" "}
						<a
							href="mailto:sklep@example.com"
							className="text-neutral-600 underline hover:text-neutral-900"
						>
							sklep@example.com
						</a>
					</li>
					<li>
						<strong className="text-neutral-900">Godziny obsługi:</strong> pn–pt 9:00–17:00
					</li>
				</ul>
				<p className="mt-8">
					<Link
						href="/"
						className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
					>
						← Powrót do sklepu
					</Link>
				</p>
			</div>
		</div>
	);
}
