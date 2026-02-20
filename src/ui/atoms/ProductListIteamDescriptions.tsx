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
		<div className="mt-4 px-0.5">
			<p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
				<span className="sr-only">Kategoria </span>
				{category}
			</p>
			<h3 className="mt-1 text-base font-semibold text-neutral-900">{name}</h3>
			<div className="mt-2 flex items-center justify-between">
				<p data-testid="product-price" className="text-base font-medium text-neutral-900">
					{formatMoney(price / 100)}
				</p>
				<div className="flex items-center gap-1.5">
					<Stack spacing={1} className="flex items-end">
						<Rating name="size-small" defaultValue={rating} size="small" readOnly />
					</Stack>
					<span data-testid="product-rating" className="text-xs text-neutral-500">
						{rating != null ? `${rating.toFixed(1)}` : "—"}
					</span>
				</div>
			</div>
		</div>
	);
};
