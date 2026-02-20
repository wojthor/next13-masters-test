"use server";

import { revalidatePath } from "next/cache";

const REVIEW_CREATE_MUTATION = `
mutation ReviewCreate(
	$author: String!
	$title: String!
	$description: String!
	$email: String!
	$rating: Float!
	$productSlug: String!
) {
	createReview(
		data: {
			author: $author
			title: $title
			description: $description
			email: $email
			rating: $rating
			products: { connect: { slug: $productSlug } }
		}
	) {
		id
	}
}
`;

type ReviewCreateResult = { data?: { createReview?: { id: string } }; errors?: { message: string }[] };

export type AddReviewState = { ok: boolean; message?: string };

export async function addReviewAction(
	prevState: AddReviewState,
	formData: FormData,
): Promise<AddReviewState> {
	const productId = formData.get("productId");
	const productSlug = formData.get("productSlug");
	const author = formData.get("author");
	const title = formData.get("title");
	const description = formData.get("content");
	const email = formData.get("email");
	const ratingRaw = formData.get("rating");

	if (!productId || typeof productId !== "string") {
		return { ok: false, message: "Brak produktu." };
	}
	if (!productSlug || typeof productSlug !== "string" || !productSlug.trim()) {
		return { ok: false, message: "Brak produktu (slug)." };
	}
	if (!author || typeof author !== "string" || !author.trim()) {
		return { ok: false, message: "Podaj imię." };
	}
	if (!title || typeof title !== "string" || !title.trim()) {
		return { ok: false, message: "Podaj tytuł." };
	}
	if (!description || typeof description !== "string" || !description.trim()) {
		return { ok: false, message: "Podaj treść opinii." };
	}
	if (!email || typeof email !== "string" || !email.trim()) {
		return { ok: false, message: "Podaj adres e-mail." };
	}

	const rating = ratingRaw ? Number(ratingRaw) : 0;
	if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
		return { ok: false, message: "Wybierz ocenę od 1 do 5." };
	}

	const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
	if (!url) {
		return { ok: false, message: "Brak konfiguracji API." };
	}

	const token = process.env.HYGRAPH_MUTATION_TOKEN;
	if (!token) {
		return { ok: false, message: "Brak tokena HYGRAPH_MUTATION_TOKEN w .env – potrzebny do dodawania recenzji." };
	}

	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
		"gcms-stage": "DRAFT",
	};

	const res = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify({
			query: REVIEW_CREATE_MUTATION,
			variables: {
				productSlug: productSlug.trim(),
				author: author.trim(),
				title: title.trim(),
				description: description.trim(),
				email: email.trim(),
				rating,
			},
		}),
		cache: "no-store",
	});

	const json = (await res.json()) as ReviewCreateResult;

	if (json.errors?.length) {
		const errMsg = json.errors[0].message ?? "";
		const isPermissionError =
			res.status === 403 ||
			errMsg.toLowerCase().includes("permission") ||
			errMsg.toLowerCase().includes("unauthorized");
		if (isPermissionError) {
			return {
				ok: false,
				message: `Błąd uprawnień Hygraph. API: ${errMsg} Upewnij się, że token w .env to ten sam, który ma uprawnienia (Permanent Auth Tokens → Content API → Review: Read + Create) i że środowisko to master.`,
			};
		}
		return { ok: false, message: errMsg || "Błąd zapisu opinii." };
	}

	if (!json.data?.createReview?.id) {
		return { ok: false, message: "Nie udało się dodać opinii." };
	}

	revalidatePath(`/product/${productId}`);

	// W Hygraph wpisy są tworzone jako DRAFT. Jeśli token ma uprawnienie
	// "Publish content automatically", recenzja może być od razu opublikowana.
	// W przeciwnym razie w API Hygraph dodaj mutację publishReview(where: { id: ... })
	// i wywołaj ją tutaj z json.data.createReview.id.

	return { ok: true, message: "Dziękujemy za opinię!" };
}
