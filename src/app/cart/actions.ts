"use server";

import { revalidateTag } from "next/cache";
import { executeGraphQL } from "@/api/products";
import {
	ChangeQuantityDocument,
	CreateReviewDocument,
	RemoveItemFromCartDocument,
} from "@/gql/graphql";

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
