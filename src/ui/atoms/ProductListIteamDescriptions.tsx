import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { formatMoney } from "@/app/utils/formatMoney";
import { type ProductItemType } from "@/ui/types";

type Product = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { category, name, price, rating },
}: Product) => {
	return (
		<div className="mt-2">
			<div className="flex flex-row justify-between">
				<h3 className="text-sm font-semibold text-slate-700">{name}</h3>
				<p data-testid="product-price" className="text-sm font-medium text-black">
					{formatMoney(price / 100)}
				</p>
			</div>
			<div className="mt-1 flex flex-row justify-between">
				<p className="text-sm text-slate-500">
					<span className="sr-only">Kategoria </span>
					{category}
				</p>
				<div className="flex flex-row items-center gap-2">
					<p data-testid="product-rating" className="small-caps text-xs text-black">
						{`${rating?.toFixed(1)}/5`}
					</p>
					<Stack spacing={1} className="flex items-end">
						<Rating name="size-small" defaultValue={rating} size="small" readOnly />
					</Stack>
				</div>
			</div>
		</div>
	);
};
