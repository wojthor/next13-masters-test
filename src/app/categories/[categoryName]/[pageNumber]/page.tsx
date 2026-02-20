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
	const categoryName = products[0]?.category ?? params.categoryName;
	return { title: categoryName };
};

export default async function CategoryPage({
	params,
}: {
	params: { categoryName: string; pageNumber: string };
}) {
	const products = await getProductCategory({ params: { category: params.categoryName } });
	const [startIndex, endIndex] = calculateProductRange(parseInt(params.pageNumber, 10), 4);
	const slicedProducts = products.slice(startIndex, endIndex);
	const title = products[0]?.category ?? params.categoryName;

	return (
		<div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 lg:px-8">
			<h1 className="mb-10 text-2xl font-semibold tracking-tight text-neutral-900">{title}</h1>
			<ProductList products={slicedProducts} />
			<div className="mt-12">
				<Pagination params={params} productsInfo={products.length} />
			</div>
		</div>
	);
}
