import { formatMoney } from "@/app/utils/formatMoney";
import { type ProductItemType } from "@/ui/types";

type Product = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({ product: { category, name, price } }: Product) => {
	return (
		<div className="mt-2 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-black">{name}</h3>
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria </span>
					{category}
				</p>
			</div>

			<div className="flex flex-row">
				<p data-testid="product-price" className="text-sm font-medium text-black">
					<span className="sr-only">Cena: </span>
					{formatMoney(price / 100)}
				</p>
			</div>
		</div>
	);
};
