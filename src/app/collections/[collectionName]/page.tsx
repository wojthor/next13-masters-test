import { executeGraphQL } from "@/api/products";
import { ProductCategoryBySlugDocument } from "@/gql/graphql";
import { ProductList } from "@/ui/organism/ProductList";
import { type ProductItemType } from "@/ui/types";

/*
export const generateStaticParams = async ({ params }: { params: { collectionName: string } }) => {
	if (params.collectionName === "summer-vibes") {
		return [{ collectionName: "summer-vibes" }, { collectionName: "summer-vibes" }];
	} else {
		return [{ collectionName: "summer-vibes" }];
	}
};
/* */

export const generateMetadata = async ({ params }: { params: { collectionName: string } }) => {
	const grapqhlResponse = await executeGraphQL({
		query: ProductCategoryBySlugDocument,
		variables: {
			slug: params.collectionName,
		},
	});

	return {
		title: grapqhlResponse.category?.name,
	};
};

export default async function CollectionsPage({ params }: { params: { collectionName: string } }) {
	const grapqhlResponse = await executeGraphQL({
		query: ProductCategoryBySlugDocument,
		variables: {
			slug: params.collectionName,
		},
	});

	const r = grapqhlResponse.category?.products.map((product) => {
		return {
			id: product.id,
			name: product.name,
			category: product.categories[0].name,
			price: product.price,
			coverImage: { src: product.images[0].url, alt: product.name },

			rating: product.rating as number,
		};
	});

	return (
		<>
			<div className="bg-slate-50">
				<div className="mx-auto max-w-7xl px-8 py-12">
					<h1 className="text-3xl font-bold tracking-tight text-slate-900">
						{grapqhlResponse.category?.name}
					</h1>
					<p className="mt-4 max-w-2xl text-base text-slate-700">
						{grapqhlResponse.category?.description}
					</p>
				</div>
			</div>
			<section className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 text-black sm:px-6 lg:max-w-7xl">
				<ProductList products={r as ProductItemType[]} />
			</section>
		</>
	);
}
