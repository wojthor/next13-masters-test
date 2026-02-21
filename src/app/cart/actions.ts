"use server";

import { revalidatePath } from "next/cache";
import { sendReview } from "@/api/products";

export async function changeItemQuantity(
	cartId: string,
	productId: string,
	quantity: number,
) {
	// Placeholder: API mutation not in schema; revalidate cart page
	revalidatePath("/cart");
}

export async function removeItem(cartId: string, productId: string) {
	// Placeholder: API mutation not in schema; revalidate cart page
	revalidatePath("/cart");
}

export const SendReview = async (
	productSlug: string,
	title: string,
	description: string,
	author: string,
	email: string,
	rating: number,
) => {
	if (!title || !description || !author || !email || !rating) {
		throw new Error("All fields are required");
	}

	return sendReview({
		productSlug,
		title,
		description,
		author,
		email,
		rating,
	});
};
