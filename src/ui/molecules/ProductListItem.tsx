import Link from "next/link";
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
				<Link
					href={`/product/${product.id}`}
					className="group block rounded-2xl transition hover:bg-neutral-50/80"
				>
					<ProductCoverImage src={product.coverImage.src} alt={product.coverImage.alt} />
					<ProductListItemDescription product={product} />
				</Link>
			</article>
		</li>
	);
};
