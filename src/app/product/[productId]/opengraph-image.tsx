/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { executeGraphQL, getProductList } from "@/api/products";
import { ProductGetByIdDocument } from "@/gql/graphql";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
	width: 1200,
	height: 630,
};

export const generateStaticParams = async () => {
	const products = await getProductList();
	return products.map((product) => ({
		productId: product.id,
	}));
};

export const contentType = "image/png";

export default async function og({ params }: { params: { productId: string } }) {
	const { product } = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: { id: params.productId },
		next: {
			revalidate: 15,
		},
	});

	return new ImageResponse(
		(
			<div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-8xl "
				style={{
					background: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
				}}
			>
				<p tw="font-sans uppercase m-0 p-0 text-[101px] leading-4 pt-10">{product?.name}</p>
				<p tw="text-sm"> {product?.categories[0].name}</p>
				<p tw="m-0 mt-2 text-sm">{product?.description}</p>
				<img tw="w-1/4" src={product?.images[0].url} alt={product?.name} />
			</div>
		),
	);
}
