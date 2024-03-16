import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { formatDate } from "@/app/utils/formatDate";
import { type GetReviewQuery } from "@/gql/graphql";

export const ReviewBlock = ({ review }: { review: GetReviewQuery }) => {
	const data = review.product?.reviews.slice(-6).reverse();

	return (
		<div className=" z-50 flex w-3/4 flex-col gap-10 ">
			{data?.map((review) => {
				return (
					<div key={review.title} className="">
						<div className="mx-9 flex flex-col ">
							<div className=" ">
								<h2 className="text-lg font-semibold text-gray-900">{review.author}</h2>
								<h2 className="text-lg font-light text-gray-900">
									<Stack spacing={1}>
										<Rating name="size-small" defaultValue={review.rating} size="small" readOnly />
									</Stack>
								</h2>
								<h3 className="small-caps text-sm text-black">
									{formatDate(review.createdAt as string)}
								</h3>
							</div>
							<div className=" ">
								<h2 className="mb-2 mt-4 space-y-6 text-sm font-bold text-gray-600">
									{review.title}
								</h2>
								<p className="mt-2 text-sm italic text-gray-600">{review.description}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
