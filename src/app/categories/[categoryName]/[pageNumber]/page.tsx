import { getProductCategory } from "@/api/products";
import { calculateProductRange } from "@/app/utils/calculateProductRange";

import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organism/ProductList";

/*
export const generateStaticParams = async ({ params }: { params: { categoryName: string } }) => {
	if (params.categoryName === "T-shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }];
	}
};
*/

export const generateMetadata = async ({ params }: { params: { categoryName: string } }) => {
	const products = await getProductCategory({ params: { category: params.categoryName } });
	const title = products.slice(0, 1);

	return {
		title: title[0].category,
	};
};

export default async function CategoryPage({
	params,
}: {
	params: { categoryName: string; pageNumber: string };
}) {
	const products = await getProductCategory({ params: { category: params.categoryName } });
	const [startIndex, endIndex] = calculateProductRange(parseInt(params.pageNumber, 10), 4);
	const slicedProducts = products.slice(startIndex, endIndex);
	const title = products[0].category;

	return (
		<>
			<div className="gap-5 bg-gray-100">
				<div className="mx-auto max-w-7xl px-8">
					<div className="mx-auto py-8">
						<h2 className="text-bold text-black"> {title}</h2>
					</div>
				</div>
			</div>
			<section className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 sm:px-6 lg:max-w-7xl">
				<ProductList products={slicedProducts} />
				<Pagination params={params} productsInfo={products.length} />{" "}
			</section>
		</>
	);
}
