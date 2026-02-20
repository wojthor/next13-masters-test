import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Zwroty i reklamacje",
	description: "Informacje o zwrotach i reklamacjach",
};

export default function ZwrotyReklamacjePage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
			<h1 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900">
				Zwroty i reklamacje
			</h1>
			<div className="prose prose-neutral prose-p:text-neutral-600">
				<p>
					Masz 14 dni na odstąpienie od umowy bez podawania przyczyny (zwrot towaru). Termin
					liczy się od dnia otrzymania przesyłki.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">Jak zwrócić towar?</h2>
				<p>
					Poinformuj nas o chęci zwrotu (e-mail lub formularz). Zapakuj towar w oryginalny
					opakowanie i wyślij na adres podany w wiadomości. Zwrot kosztów przesyłki w
					ramach odstąpienia od umowy podlega indywidualnym zasadom – szczegóły podamy w
					odpowiedzi.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">Reklamacje</h2>
				<p>
					Reklamację możesz złożyć w przypadku wady produktu. Opisz problem i dołącz zdjęcia
					(lub inne dowody). Rozpatrujemy reklamacje zgodnie z Kodeksem cywilnym i ustawą o
					prawach konsumenta.
				</p>
				<p className="mt-8 text-sm text-neutral-500">
					Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
				</p>
			</div>
		</div>
	);
}
