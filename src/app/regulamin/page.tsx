import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Regulamin",
	description: "Regulamin sklepu",
};

export default function RegulaminPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
			<h1 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900">
				Regulamin sklepu
			</h1>
			<div className="prose prose-neutral prose-p:text-neutral-600">
				<p>
					Regulamin określa zasady korzystania ze sklepu internetowego. Korzystając ze sklepu,
					akceptujesz poniższe warunki.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">1. Postanowienia ogólne</h2>
				<p>
					Sklep prowadzi sprzedaż detaliczną na odległość. Zamówienia realizowane są w dni
					robocze. Ceny podane są w złotówkach i zawierają podatek VAT.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">2. Składanie zamówień</h2>
				<p>
					Zamówienie składasz poprzez dodanie produktów do koszyka i wypełnienie formularza
					zamówienia. Po złożeniu zamówienia otrzymasz potwierdzenie na adres e-mail.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">3. Płatności i dostawa</h2>
				<p>
					Płatność możliwa jest wybranymi metodami w procesie zamawiania. Dostawa realizowana
					jest na terenie Polski w podany przez Ciebie adres.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">4. Reklamacje i zwroty</h2>
				<p>
					Szczegóły dotyczące reklamacji i zwrotów znajdziesz w sekcji &quot;Zwroty i
					reklamacje&quot;.
				</p>
				<p className="mt-8 text-sm text-neutral-500">
					Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
				</p>
			</div>
		</div>
	);
}
