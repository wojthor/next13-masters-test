import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Polityka prywatności",
	description: "Polityka prywatności sklepu",
};

export default function PolitykaPrywatnosciPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
			<h1 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900">
				Polityka prywatności
			</h1>
			<div className="prose prose-neutral prose-p:text-neutral-600">
				<p>
					Niniejsza polityka określa zasady przetwarzania danych osobowych w związku z
					korzystaniem ze sklepu internetowego.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">
					1. Administrator danych
				</h2>
				<p>
					Administratorem Twoich danych osobowych jest operator sklepu. Kontakt w sprawie
					danych: poprzez formularz kontaktowy lub adres e-mail podany w sekcji Kontakt.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">2. Cele przetwarzania</h2>
				<p>
					Dane osobowe są przetwarzane w celu realizacji zamówień, obsługi reklamacji,
					komunikacji oraz – za Twoją zgodą – wysyłki newslettera i marketingu.
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">3. Prawa użytkownika</h2>
				<p>
					Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia
					przetwarzania, przenoszenia danych oraz wniesienia skargi do organu nadzorczego
					(PUODO).
				</p>
				<h2 className="mt-8 text-xl font-medium text-neutral-900">4. Pliki cookies</h2>
				<p>
					Sklep korzysta z plików cookies w celu zapewnienia działania koszyka, sesji oraz
					analityki. Możesz zmienić ustawienia cookies w swojej przeglądarce.
				</p>
				<p className="mt-8 text-sm text-neutral-500">
					Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
				</p>
			</div>
		</div>
	);
}
