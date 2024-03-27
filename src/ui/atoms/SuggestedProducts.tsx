import algoliasearch from "algoliasearch";
import { getProductList } from "@/api/products";
import { ProductList } from "@/ui/organism/ProductList";

const client = algoliasearch("OQRKXXKDRT", "ec5c5d91b21516cdfac004637cba93c4");

const index = client.initIndex("demo_ecommerce");
await index.setSettings({
	searchableAttributes: ["name", "id", "description", "price", "rating"],
});

export const SuggestedProducts = async () => {
	const products = await getProductList({ sort: "DEFAULT", order: "DESC" });

	return (
		<div data-testid="related-products">
			<ProductList products={products.slice(-4)} />
		</div>
	);
};
