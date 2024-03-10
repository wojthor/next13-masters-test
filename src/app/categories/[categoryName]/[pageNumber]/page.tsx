import { getProductCategory } from "@/api/products";
import { calculateProductRange } from "@/app/utils/calculateProductRange";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organism/ProductList";

export const generateStaticParams = async ({ params }: { params: { categoryName: string } }) => {
	if (params.categoryName === "T-shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }];
	}
};

export default async function CategoryPage({
	params,
}: {
	params: { categoryName: string; pageNumber: string };
}) {
	const products = await getProductCategory({ params: { category: params.categoryName } });
	const [startIndex, endIndex] = calculateProductRange(parseInt(params.pageNumber, 10), 4);
	const slicedProducts = products.slice(startIndex, endIndex);

	return (
		<div className="text-black">
			{" "}
			<ProductList products={slicedProducts} />
			<Pagination params={params} productsInfo={products.length} />{" "}
		</div>
	);
}
