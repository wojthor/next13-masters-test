import { getProductList } from "@/api/products";
import { calculateProductRange } from "@/app/utils/calculateProductRange";
import { type SortDirection, type ProductSortBy } from "@/gql/graphql";
import { SortingBox } from "@/ui/atoms/SortingBox";

import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organism/ProductList";

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { [key: string]: string | undefined };
}) {
	//let sortType = "DEFAULT";

	/*
	if (searchParams.sort === "PRICE") {
		sortType = "PRICE";
		//@ts-expect-error "searchParams.sort" może być różnym typem niż oczekiwano
	} else if (searchParams.sort === "RATING") {
		sortType = "RATING";
	}
*/

	const sortDirection = searchParams.sortOrder
		? (searchParams.sortOrder.toUpperCase() as SortDirection)
		: undefined;
	console.log(sortDirection);

	const sort = searchParams.sort ? (searchParams.sort.toUpperCase() as ProductSortBy) : undefined;
	console.log(sort);

	const products = await getProductList({
		sort: sort as ProductSortBy,
		order: sortDirection as SortDirection,
	});

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
