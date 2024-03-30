export default function Page() {
	return (
		<div className="container mx-auto px-4 py-8 text-center text-black">
			<h1 className="mb-4 text-2xl font-bold">Transakcja nieudana</h1>
			<p className="text-red-500">Ups! Coś poszło nie tak z Twoją transakcją.</p>
			<p>Spróbuj ponownie później.</p>
		</div>
	);
}
