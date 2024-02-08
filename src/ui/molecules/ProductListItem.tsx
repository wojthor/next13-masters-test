import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListIteamDescriptions";
import { type ProductItemType } from "@/ui/types";

type Product = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: Product) => {
	return (
		<li>
			<article>
				<ProductCoverImage src={product.coverImage.src} alt={product.coverImage.alt} />
				<ProductListItemDescription product={product} />
			</article>
		</li>
	);
};
