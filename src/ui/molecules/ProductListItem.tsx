import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListIteamDescriptions";
import { type ProductItemType } from "@/ui/types";

type Product = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: Product) => {
	return (
		<li key={product.id}>
			<article>
				<Link href={`/product/${product.id}`}>
					<ProductCoverImage src={product.coverImage.src} alt={product.coverImage.alt} />
					<ProductListItemDescription product={product} />
				</Link>
			</article>
		</li>
	);
};
