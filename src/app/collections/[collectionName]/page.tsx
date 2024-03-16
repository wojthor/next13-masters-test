import { executeGraphQL } from "@/api/products";
import { ProductGetByCollectionDocument } from "@/gql/graphql";
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
		query: ProductGetByCollectionDocument,
		variables: {
			slug: params.collectionName,
		},
	});

	return {
		title: grapqhlResponse.collection?.name,
	};
};

export default async function CollectionsPage({ params }: { params: { collectionName: string } }) {
	const grapqhlResponse = await executeGraphQL({
		query: ProductGetByCollectionDocument,
		variables: {
			slug: params.collectionName,
		},
	});

	const r = grapqhlResponse.collection?.products.map((product) => {
		return {
			id: product.id,
			name: product.name,
			price: product.price,
			coverImage: { src: product.images[0].url, alt: product.name },
		};
	});

	return (
		<div className="gap-10 text-black">
			<div className="">
				<h1 className="text-3xl font-bold tracking-tight text-slate-900">
					{grapqhlResponse.collection?.name}
				</h1>
				<p className="mt-4 max-w-2xl text-base text-slate-700">
					{grapqhlResponse.collection?.description}
				</p>
			</div>
			<div className="py-10">
				<ProductList products={r as ProductItemType[]} />
			</div>
		</div>
	);
}
