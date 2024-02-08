import { type ProductItemType } from "@/ui/types";

type Product = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({ product: { category, name, price } }: Product) => {
	return (
		<div className="mt-2 flex justify-between">
			<h3 className="text-white-700 text-sm font-semibold">{name}</h3>
			<p className="text-sm text-gray-500">
				<span className="sr-only">Kategoria </span>
				{category}
			</p>
			<p className="text-white-700 text-sm font-medium">
				<span className="sr-only">Cena: </span>
				{price} zł
			</p>
		</div>
	);
};
