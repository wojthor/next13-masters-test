import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { getProductById, getProductList } from "@/app/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { SuggestedProducts } from "@/ui/atoms/SuggestedProducts";

const back = (
	<Link href="/products/1" className="flex flex-row font-semibold">
		<IoIosArrowBack className="size-5" /> Powrót
	</Link>
);

export const generateStaticParams = async () => {
	const products = await getProductList();
	return products.map((product) => ({
		productId: product.id,
	}));
};

export const generateMetadata = async ({ params }: { params: { productId: string } }) => {
	const product = await getProductById(params.productId);
	return {
		title: product.name,
		description: product.longDescription,
	};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	return (
		<div className="flex flex-col gap-12">
			<p className="flex flex-row text-sm uppercase  text-gray-500">
				{back} / {product.category} / {product.name}
			</p>
			<article className=" flex flex-row gap-20">
				<div className="max-w-xs basis-1/2">
					<ProductCoverImage src={product.coverImage.src} alt={product.coverImage.alt} />
				</div>

				<div className="flex basis-1/2 flex-col justify-center gap-5">
					<h1 className="text-white-700 text-6xl font-semibold">{product.name}</h1>
					<p className="text-white-700 text-m font-extralight">{product.longDescription}</p>

					<p className="text-white-700 text-m font-medium"> {product.price} zł</p>

					<button className="rounded-full bg-white px-4 py-2 font-bold text-black hover:bg-gray-100">
						Do koszyka
					</button>
				</div>
			</article>

			<aside className="flex flex-row ">
				<div className="flex flex-col gap-5">
					<p className="font-semibold">Produkty, które mogą Ci się spodobać</p>
					<SuggestedProducts />
				</div>
			</aside>
		</div>
	);
}
