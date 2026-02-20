"use server";

import { sendReview } from "@/api/products";

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
