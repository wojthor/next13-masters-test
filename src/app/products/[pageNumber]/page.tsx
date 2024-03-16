import { getProductList } from "@/api/products";
import { calculateProductRange } from "@/app/utils/calculateProductRange";
import { type ProductSortBy } from "@/gql/graphql";
import { SortingBox } from "@/ui/atoms/SortingBox";

import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organism/ProductList";

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: URLSearchParams;
}) {
	let sortType = "DEFAULT";

	//@ts-expect-error "searchParams.sort" może być różnym typem niż oczekiwano

	if (searchParams.sort === "PRICE") {
		sortType = "PRICE";
		//@ts-expect-error "searchParams.sort" może być różnym typem niż oczekiwano
	} else if (searchParams.sort === "RATING") {
		sortType = "RATING";
	}

	const products = await getProductList({ sort: sortType as ProductSortBy });
	const productsInfo = products.length;
	const [startIndex, endIndex] = calculateProductRange(parseInt(params.pageNumber, 10), 4);
	const slicedProducts = products.slice(startIndex, endIndex);

	return (
		<div className="flex flex-col  gap-5 text-black">
			<div className="flex justify-end">
				<SortingBox />
			</div>
			<ProductList products={slicedProducts} />
			<Pagination params={params} productsInfo={productsInfo} />
		</div>
	);
}
