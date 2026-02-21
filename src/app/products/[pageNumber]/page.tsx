import { getProductList } from "@/api/products";
import { calculateProductRange } from "@/app/utils/calculateProductRange";
import { SortingBox } from "@/ui/atoms/SortingBox";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organism/ProductList";

type ProductsPageParams = Promise<{ pageNumber: string }> | { pageNumber: string };

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: ProductsPageParams;
	searchParams: { [key: string]: string | undefined };
}) {
	const resolvedParams = await Promise.resolve(params);
	const sortDirection = searchParams.sortOrder
		? searchParams.sortOrder.toUpperCase()
		: undefined;
	const sort = searchParams.sort ? searchParams.sort.toUpperCase() : undefined;

	const products = await getProductList({
		sort,
		order: sortDirection,
	});

	const productsInfo = products.length;
	const [startIndex, endIndex] = calculateProductRange(parseInt(resolvedParams.pageNumber, 10), 4);
	const slicedProducts = products.slice(startIndex, endIndex);

	return (
		<div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 lg:px-8">
			<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
					Wszystkie produkty
				</h1>
				<SortingBox />
			</div>
			<ProductList products={slicedProducts} />
			<div className="mt-12">
				<Pagination params={resolvedParams} productsInfo={productsInfo} />
			</div>
		</div>
	);
}
