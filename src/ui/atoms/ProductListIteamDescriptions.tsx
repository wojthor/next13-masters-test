import { formatMoney } from "@/app/utils/formatMoney";
import { type ProductItemType } from "@/ui/types";

type Product = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { category, name, price, rating },
}: Product) => {
	console.log(price);
	return (
		<div className="mt-2 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-black">{name}</h3>
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria </span>
					{category}
				</p>
			</div>

			<div className="flex flex-col">
				<p data-testid="product-price" className="text-sm font-medium text-black">
					{formatMoney(price / 100)}
				</p>
				<p data-testid="product-rating" className="z-50 text-sm font-medium text-black">
					{`${rating?.toFixed(1)}/5`}
				</p>
			</div>
		</div>
	);
};
