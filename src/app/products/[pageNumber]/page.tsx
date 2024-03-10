import { getProductList } from "@/api/products";
import { calculateProductRange } from "@/app/utils/calculateProductRange";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organism/ProductList";

export const generateStaticParams = async ({ params }: { params: { pageNumber: string } }) => {
	if (params.pageNumber === "1") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }];
	}
};

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
	const products = await getProductList();
	const productsInfo = products.length;

	const [startIndex, endIndex] = calculateProductRange(parseInt(params.pageNumber, 10), 4);
	const slicedProducts = products.slice(startIndex, endIndex);

	return (
		<div>
			<ProductList products={slicedProducts} />
			<Pagination params={params} productsInfo={productsInfo} />{" "}
		</div>
	);
}
