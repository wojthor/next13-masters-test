import { getProductList } from "@/api/products";
import { ProductList } from "@/ui/organism/ProductList";

export const SuggestedProducts = async () => {
	const products = await getProductList();
	return (
		<div data-testid="related-products">
			<ProductList products={products.slice(-4)} />;
		</div>
	);
};
