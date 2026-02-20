"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Rating from "@mui/material/Rating";
import { addReviewAction, type AddReviewState } from "@/api/reviews";

const initialState: AddReviewState = { ok: false };

export function ReviewForm({
	productId,
	productSlug,
}: {
	productId: string;
	productSlug: string;
}) {
	const [state, formAction] = useFormState(addReviewAction, initialState);
	const [rating, setRating] = useState(0);

	return (
		<div className="lg:col-span-4">
			<form
				data-testid="add-review-form"
				action={formAction}
				className="mt-2 flex flex-col gap-y-4"
			>
				<input type="hidden" name="productId" value={productId} />
				<input type="hidden" name="productSlug" value={productSlug} />

				<h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
					Recenzje klientów
				</h2>
				<p className="text-sm leading-6 text-neutral-600">
					Jeśli korzystałeś z tego produktu, podziel się swoimi myślami z innymi klientami.
				</p>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
					<div className="sm:col-span-4">
						<label htmlFor="author" className="block text-sm font-medium text-neutral-900">
							Imię
						</label>
						<input
							id="author"
							name="author"
							type="text"
							required
							className="mt-1 block w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:border-neutral-400 focus:outline-none"
							placeholder="Twoje imię"
						/>
					</div>

					<div className="sm:col-span-4">
						<label htmlFor="title" className="block text-sm font-medium text-neutral-900">
							Tytuł
						</label>
						<input
							id="title"
							name="title"
							type="text"
							required
							className="mt-1 block w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:border-neutral-400 focus:outline-none"
							placeholder="Tytuł recenzji"
						/>
					</div>

					<div className="sm:col-span-4">
						<label htmlFor="email" className="block text-sm font-medium text-neutral-900">
							E-mail
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="mt-1 block w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:border-neutral-400 focus:outline-none"
							placeholder="twoj@email.pl"
						/>
					</div>

					<div className="col-span-full">
						<label htmlFor="content" className="block text-sm font-medium text-neutral-900">
							Treść
						</label>
						<textarea
							id="content"
							name="content"
							rows={4}
							required
							className="mt-1 block w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:border-neutral-400 focus:outline-none"
							placeholder="Opis doświadczenia z produktem"
						/>
					</div>

					<div className="sm:col-span-4">
						<label className="block text-sm font-medium text-neutral-900">Ocena (1–5)</label>
						<input type="hidden" name="rating" value={rating} readOnly aria-hidden />
						<Rating
							max={5}
							precision={1}
							value={rating}
							onChange={(_e, newValue) => setRating(newValue ?? 0)}
							className="mt-1"
						/>
					</div>
				</div>

				{state.message && (
					<p
						className={`text-sm ${state.ok ? "text-green-600" : "text-red-600"}`}
						role="alert"
					>
						{state.message}
					</p>
				)}

				<button
					type="submit"
					className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none"
				>
					Zatwierdź recenzję
				</button>
			</form>
		</div>
	);
}
