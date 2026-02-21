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

type CategoryPageParams = Promise<{ categoryName: string; pageNumber: string }> | { categoryName: string; pageNumber: string };

export const generateMetadata = async ({ params }: { params: CategoryPageParams }) => {
	const { categoryName } = await Promise.resolve(params);
	const products = await getProductCategory({ params: { category: categoryName } });
	const categoryNameFromProducts = products[0]?.category ?? categoryName;
	return { title: categoryNameFromProducts };
};

export default async function CategoryPage({ params }: { params: CategoryPageParams }) {
	const resolvedParams = await Promise.resolve(params);
	const { categoryName, pageNumber } = resolvedParams;
	const products = await getProductCategory({ params: { category: categoryName } });
	const [startIndex, endIndex] = calculateProductRange(parseInt(pageNumber, 10), 4);
	const slicedProducts = products.slice(startIndex, endIndex);
	const title = products[0]?.category ?? categoryName;

	return (
		<div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 lg:px-8">
			<h1 className="mb-10 text-2xl font-semibold tracking-tight text-neutral-900">{title}</h1>
			<ProductList products={slicedProducts} />
			<div className="mt-12">
				<Pagination params={resolvedParams} productsInfo={products.length} />
			</div>
		</div>
	);
}
