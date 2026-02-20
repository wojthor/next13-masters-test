import { getProductList } from "@/api/products";
import { ProductList } from "@/ui/organism/ProductList";

export const SuggestedProducts = async () => {
    // Pobieramy produkty z GraphQL (to działa!)
    const products = await getProductList({ sort: "DEFAULT", order: "DESC" });

    return (
        <div data-testid="related-products">
            <ProductList products={products.slice(-4)} />
        </div>
    );
};