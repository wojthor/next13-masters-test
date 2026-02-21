import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { formatDate } from "@/app/utils/formatDate";
import { type GetReviewQuery } from "@/api/products";

export const ReviewBlock = ({ review }: { review: GetReviewQuery }) => {
	const data = review.product?.reviews?.slice(-6).reverse() ?? [];

	return (
		<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
			{data.length === 0 ? (
				<p className="text-sm text-neutral-500">Brak opinii do wyświetlenia.</p>
			) : (
				<div className="space-y-6">
					{data.map((review, index) => (
						<div
							key={`${review.author ?? ""}-${String(review.createdAt)}-${index}`}
							className="border-b border-neutral-200 pb-6 last:border-0"
						>
							<div className="flex flex-wrap items-center gap-3 py-2">
								<span className="font-semibold text-neutral-900">{review.author}</span>
								<Stack spacing={1}>
									<Rating
										name="size-small"
										defaultValue={review.rating ?? 0}
										size="small"
										readOnly
									/>
								</Stack>
								<span className="text-sm text-neutral-500">
									{formatDate(review.createdAt as string)}
								</span>
							</div>
							<div className="flex flex-col py-2">
								<h3 className="mb-1 text-sm font-semibold text-neutral-900">
									{review.title}
								</h3>
								<p className="mt-2 text-sm text-neutral-600">{review.description}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

/*
<Stack spacing={1}>
	<Rating name="size-small" defaultValue={review.rating} size="small" readOnly />
</Stack>;
*/
