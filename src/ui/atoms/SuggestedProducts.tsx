import { getProductList } from "@/app/api/products";
import { ProductList } from "@/ui/organism/ProductList";

export const SuggestedProducts = async () => {
	const products = await getProductList();
	return <ProductList products={products.slice(-4)} />;
};
