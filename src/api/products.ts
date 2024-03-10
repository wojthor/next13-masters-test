import { type ProductItemType } from "@/ui/types";
import {
	ProductCategoryBySlugDocument,
	ProductGetListDocument,
	type TypedDocumentString,
} from "@/gql/graphql";

export async function executeGraphQL<TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		cache,
		next,
		headers: {
			...headers,
			"Content-Type": "application/json",
		},
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const grapqlResponse = (await res.json()) as GraphQLResponse<TResult>;
	if (grapqlResponse.errors) {
		throw new Error(`GraphQL Error: ${grapqlResponse.errors[0].message}`);
	}

	return grapqlResponse.data;
}

export const getProductList = async (): Promise<ProductItemType[]> => {
	const grapqlResponse = await executeGraphQL({
		query: ProductGetListDocument,
		next: {
			revalidate: 15,
		},
	});

	return grapqlResponse.products.data.map((product) => {
		return {
			id: product.id,
			name: product.name,
			category: product.categories[0].name,
			price: product.price,
			coverImage: { src: product.images[0].url, alt: product.name },
			longDescription: product.description,
		};
	});
};

export const getProductCategory = async ({
	params,
}: {
	params: { category: string };
}): Promise<ProductItemType[]> => {
	const grapqlResponse = await executeGraphQL({
		query: ProductCategoryBySlugDocument,
		variables: {
			slug: params.category,
		},
		next: {
			revalidate: 15,
		},
	});

	const r = grapqlResponse.category?.products.map((product) => {
		return {
			id: product.id,
			name: product.name,
			category: params.category,
			price: product.price,
			coverImage: { src: product.images[0].url, alt: product.name },
		};
	});

	return r as ProductItemType[];
};