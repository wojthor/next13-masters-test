"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { executeGraphQL } from "@/api/products";
import {
	AddItemDocument,
	CartFindOrCreateDocument,
	ChangeQuantityDocument,
	CreateReviewDocument,
	RemoveItemFromCartDocument,
} from "@/gql/graphql";

import { getCart } from "@/api/cart";

export const removeItem = (id: string, productId: string) => {
	revalidateTag("cart");
	return executeGraphQL({
		query: RemoveItemFromCartDocument,
		variables: { id, productId },
		next: { tags: ["cart"] },
	});
};

export const changeItemQuantity = (id: string, productId: string, quantity: number) => {
	revalidateTag("cart");
	return executeGraphQL({
		query: ChangeQuantityDocument,
		variables: { id, productId, quantity },
		next: {
			tags: ["cart"],
		},
	});
};

export const SendReview = async (
	productId: string,
	title: string,
	description: string,
	author: string,
	email: string,
	rating: number,
) => {
	if (!title || !description || !author || !email || !rating) {
		throw new Error("All fields are required");
	}

	return executeGraphQL({
		query: CreateReviewDocument,
		variables: {
			productId,
			title,
			description,
			author,
			email,
			rating,
		},
	});
};

export async function addProductToCartAction(_formData: FormData) {
	// Pobierz id produktu z formularza
	const productId = _formData.get("productId");
	if (!productId) {
		console.error("productId is missing.");
		return;
	}
	const searchCart = await getCart();
	const currentQuantity =
		searchCart.cart?.items.find((item) => item.product.id === productId)?.quantity || 0;
	console.log("Current quantity: ", currentQuantity);

	// Pobierz id koszyka z plików cookie
	const cartIdFromCookies = cookies().get("cartId")?.value;
	let CartId: string;
	if (cartIdFromCookies) {
		CartId = cartIdFromCookies;
	} else {
		// Jeśli koszyk nie istnieje, utwórz nowy
		const response = await executeGraphQL({
			query: CartFindOrCreateDocument,
			variables: {
				input: { items: [{ productId: productId as string }] },
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-store",
		});
		CartId = response.cartFindOrCreate.id;

		// Ustaw wartość CartId w plikach cookie
		cookies().set("cartId", CartId);
	}

	// Pobierz aktualną ilość produktu w koszyku

	// Sprawdź czy produkt jest już w koszyku
	if (currentQuantity >= 1) {
		console.log("Product already in cart. Increasing quantity...");
		// Zwiększ ilość produktu o 1
		const newQuantity = currentQuantity + 1;
		await changeItemQuantity(CartId, productId as string, newQuantity);
	} else {
		// Jeśli produkt nie jest jeszcze w koszyku, dodaj go
		const addItemResponse = await executeGraphQL({
			query: AddItemDocument,
			variables: {
				id: CartId,
				input: {
					item: {
						productId: productId as string,
					},
				},
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-store",
		});
		revalidateTag("cart");

		return addItemResponse;
	}
}
