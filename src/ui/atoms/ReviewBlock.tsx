import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { formatDate } from "@/app/utils/formatDate";
import { type GetReviewQuery } from "@/gql/graphql";

export const ReviewBlock = ({ review }: { review: GetReviewQuery }) => {
	const data = review.product?.reviews.slice(-6).reverse();

	return (
		<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
			{data?.map((review) => {
				return (
					<div key={review.title} className="divide-y divide-gray-200 border-b  border-gray-200">
						<div className="">
							<div className="py-2 ">
								<div className="flex items-center gap-5 ">
									<h2 className="justify-start text-lg font-semibold text-gray-900">
										{review.author}
									</h2>
									<h2 className="text-lg font-light text-gray-900">
										<Stack spacing={1}>
											<Rating
												name="size-small"
												defaultValue={review.rating}
												size="small"
												readOnly
											/>
										</Stack>
									</h2>
									<h3 className="-caps justify-end text-sm text-black">
										{formatDate(review.createdAt as string)}
									</h3>
								</div>
								<div className="flex flex-col py-6 ">
									<h2 className="mb-2 mt-4 space-y-6 text-sm font-bold text-gray-600">
										{review.title}
									</h2>
									<p className="mt-2 text-sm italic text-gray-600">{review.description}</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

/*
<Stack spacing={1}>
	<Rating name="size-small" defaultValue={review.rating} size="small" readOnly />
</Stack>;
*/
