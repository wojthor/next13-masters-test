import { type ProductItemType } from "@/ui/types";
import { TypedDocumentString } from "@/gql/graphql";

export async function executeGraphQL<TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers,
	authToken,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
	/** Token do mutacji (np. HYGRAPH_MUTATION_TOKEN) – dodaje Authorization: Bearer */
	authToken?: string;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
		throw new TypeError("NEXT_PUBLIC_GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({ query, variables }),
		cache,
		next,
		headers: {
			"Content-Type": "application/json",
			...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
			...headers,
		},
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const json = (await res.json()) as GraphQLResponse<TResult>;
	if (json.errors) {
		throw new Error(`GraphQL Error: ${json.errors[0].message}`);
	}

	if (!json.data) throw new Error("GraphQL returned no data");
	return json.data;
}

// --- ProductGetList ---

type ProductGetListQuery = {
	products: Array<{
		id: string;
		name: string;
		description?: string | null;
		price?: number | null;
		rating?: number | null;
		images: Array<{ url: string }>;
		categories: Array<{ name?: string | null }>;
	}>;
};

const ProductGetListDocument = new TypedDocumentString(
	`query ProductGetList { products { id name description price rating images { url } categories { name } } }`,
) as unknown as TypedDocumentString<ProductGetListQuery, Record<string, never>>;

function mapToProductItem(product: ProductGetListQuery["products"][number]): ProductItemType {
	return {
		id: product.id,
		name: product.name,
		category: product.categories[0]?.name ?? "Brak kategorii",
		price: product.price ?? 0,
		coverImage: { src: product.images[0]?.url ?? "", alt: product.name },
		longDescription: product.description ?? "",
		rating: product.rating ?? 0,
	};
}

export async function getProductList(_opts?: {
	sort?: string;
	order?: string;
}): Promise<ProductItemType[]> {
	const data = await executeGraphQL({
		query: ProductGetListDocument,
		next: { revalidate: 15 },
	});
	return data.products.map(mapToProductItem);
}

// --- ProductGetById ---

export type ProductById = {
	id: string;
	slug?: string | null;
	name: string;
	description?: string | null;
	price?: number | null;
	images: Array<{ url: string }>;
	categories: Array<{ name?: string | null }>;
};

type ProductGetByIdVariables = { id: string };
type ProductGetByIdQuery = { product: ProductById | null };

const ProductGetByIdDocument = new TypedDocumentString(
	`query ProductGetById($id: ID!) { product(where: { id: $id }) { id slug name description images { url } price categories { name } } }`,
) as unknown as TypedDocumentString<ProductGetByIdQuery, ProductGetByIdVariables>;

export async function getProductById(id: string): Promise<ProductById | null> {
	const data = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: { id },
		next: { revalidate: 15 },
	});
	return data.product;
}

// --- GetReview (opinie) ---

export type ReviewItem = {
	author?: string | null;
	title?: string | null;
	description?: string | null;
	email?: string | null;
	rating?: number | null;
	createdAt?: unknown;
};

type GetReviewVariables = { id: string };
export type GetReviewQuery = {
	product: {
		reviews: ReviewItem[];
	} | null;
};

const GetReviewDocument = new TypedDocumentString(
	`query GetReview($id: ID!) { product(where: { id: $id }) { reviews { author title description email rating createdAt } } }`,
) as unknown as TypedDocumentString<GetReviewQuery, GetReviewVariables>;

export async function getProductReviews(productId: string): Promise<GetReviewQuery> {
	const data = await executeGraphQL({
		query: GetReviewDocument,
		variables: { id: productId },
		next: { revalidate: 15 },
	});
	return { product: data.product };
}

// --- ProductCategoryBySlug ---

type ProductCategoryBySlugVariables = { slug: string };
type ProductCategoryBySlugQuery = {
	category: {
		name: string;
		description?: string | null;
		products: Array<{
			id: string;
			name: string;
			price?: number | null;
			rating?: number | null;
			images: Array<{ url: string }>;
			categories: Array<{ name?: string | null }>;
		}>;
	} | null;
};

const ProductCategoryBySlugDocument = new TypedDocumentString(
	`query ProductCategoryBySlug($slug: String) { category(where: { slug: $slug }) { name description products { id name price rating images { url } categories { name } } } }`,
) as unknown as TypedDocumentString<ProductCategoryBySlugQuery, ProductCategoryBySlugVariables>;

type CategoryProduct = NonNullable<ProductCategoryBySlugQuery["category"]>["products"][number];

function mapCategoryProductToItem(product: CategoryProduct): ProductItemType {
	return {
		id: product.id,
		name: product.name,
		category: product.categories[0]?.name ?? "Brak kategorii",
		price: product.price ?? 0,
		coverImage: { src: product.images[0]?.url ?? "", alt: product.name },
		longDescription: "",
		rating: product.rating ?? 0,
	};
}

export async function getProductCategory({
	params,
}: {
	params: { category: string };
}): Promise<ProductItemType[]> {
	const data = await executeGraphQL({
		query: ProductCategoryBySlugDocument,
		variables: { slug: params.category },
		next: { revalidate: 15 },
	});

	if (!data.category?.products) {
		return [];
	}

	return data.category.products.map((p) => mapCategoryProductToItem(p));
}

// --- GetCategories (navbar) ---

type GetCategoriesQuery = {
	categories: Array<{ name?: string | null; slug?: string | null }>;
};

const GetCategoriesDocument = new TypedDocumentString(
	`query GetCategories { categories { name slug } }`,
) as unknown as TypedDocumentString<GetCategoriesQuery, Record<string, never>>;

export type NavCategory = { name: string; slug: string };

export async function getCategories(): Promise<NavCategory[]> {
	const data = await executeGraphQL({
		query: GetCategoriesDocument,
		next: { revalidate: 60 },
	});
	return (data.categories ?? [])
		.filter(
			(c): c is { name: string; slug: string } =>
				typeof c.name === "string" && typeof c.slug === "string",
		)
		.map((c) => ({ name: c.name, slug: c.slug }));
}

// --- Search (dla strony /search) ---

type SearchQueryVariables = { search: string };
type SearchQuery = {
	products: Array<{
		id: string;
		name: string;
		description?: string | null;
		price?: number | null;
		rating?: number | null;
		images: Array<{ url: string }>;
		categories: Array<{ name?: string | null }>;
	}>;
};

const SearchDocument = new TypedDocumentString(
	`query Search($search: String) { products(where: { _search: $search }) { id name description price rating images { url } categories { name } } }`,
) as unknown as TypedDocumentString<SearchQuery, SearchQueryVariables>;

export async function SearchProduct({ query }: { query: string }): Promise<ProductItemType[]> {
	if (!query.trim()) return [];
	const data = await executeGraphQL({
		query: SearchDocument,
		variables: { search: query },
		next: { revalidate: 15 },
	});
	return data.products.map(mapToProductItem);
}

// --- Create & Publish Review ---

type CreateReviewVariables = {
	productSlug: string;
	title: string;
	description: string;
	author: string;
	email: string;
	rating: number;
};
type CreateReviewMutation = { createReview: { id: string } };

const CreateReviewDocument = new TypedDocumentString(
	`mutation CreateReview($author: String!, $title: String!, $description: String!, $email: String!, $rating: Float!, $productSlug: String!) { 
        createReview(data: { 
            author: $author, 
            title: $title, 
            description: $description, 
            email: $email, 
            rating: $rating, 
            products: { connect: { slug: $productSlug } } 
        }) { id } 
    }`,
) as unknown as TypedDocumentString<CreateReviewMutation, CreateReviewVariables>;

const PublishReviewDocument = new TypedDocumentString(
	`mutation PublishReview($id: ID!) { 
        publishReview(where: { id: $id }, to: [PUBLISHED]) { id } 
    }`,
) as unknown as TypedDocumentString<{ publishReview: { id: string } }, { id: string }>;

/** * Funkcja tworzy recenzję i od razu ją publikuje,
 * używając tokena autoryzacyjnego z .env.local
 */
export async function sendReview(variables: CreateReviewVariables): Promise<void> {
	const token = process.env.HYGRAPH_MUTATION_TOKEN;
	console.log("Token check:", token ? "Token is present" : "TOKEN IS MISSING!");

	if (!token) {
		throw new Error("HYGRAPH_MUTATION_TOKEN is not defined in environment variables");
	}

	// 1. Stworzenie recenzji (Draft)
	const createData = await executeGraphQL({
		query: CreateReviewDocument,
		variables,
		authToken: token,
		cache: "no-store",
	});

	const reviewId = createData.createReview?.id;

	if (reviewId) {
		// 2. Automatyczna publikacja
		await executeGraphQL({
			query: PublishReviewDocument,
			variables: { id: reviewId },
			authToken: token,
			cache: "no-store",
		});
	}
}
