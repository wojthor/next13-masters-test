import { notFound } from "next/navigation";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

import { getProductById, getProductReviews } from "@/api/products";
import { SuggestedProducts } from "@/ui/atoms/SuggestedProducts";
import { ProductImage } from "@/ui/atoms/ProductImage";
import { AddToCartButton } from "@/app/product/[productId]/AddToCartButton";
import { formatMoney } from "@/app/utils/formatMoney";
import { ReviewBlock } from "@/ui/atoms/ReviewBlock";
import { ReviewForm } from "@/ui/atoms/ReviewForm";

const back = (
	<Link
		href="/products/1"
		className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
	>
		<IoIosArrowBack className="size-5" /> Powrót
	</Link>
);

// Dynamic to avoid API rate limit during build (Hygraph read limit)
export const dynamic = "force-dynamic";

type ProductPageParams = Promise<{ productId: string }> | { productId: string };

export const generateMetadata = async ({ params }: { params: ProductPageParams }) => {
	const { productId } = await Promise.resolve(params);
	const product = await getProductById(productId);
	return {
		title: product?.name,
		description: product?.description ?? undefined,
	};
};

export default async function SingleProductPage({ params }: { params: ProductPageParams }) {
	const { productId } = await Promise.resolve(params);
	const [product, reviewsData] = await Promise.all([
		getProductById(productId),
		getProductReviews(productId),
	]);

	if (!product) {
		notFound();
	}

	const categoryName = product.categories[0]?.name ?? "";
	const imageUrl = product.images[0]?.url ?? "";
	const price = product.price ?? 0;

	return (
		<>
			<section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
				<p className="mb-8 flex flex-wrap items-center gap-1 text-sm text-neutral-500">
					{back}
					<span className="text-neutral-300">/</span>
					<span>{categoryName}</span>
					<span className="text-neutral-300">/</span>
					<span className="text-neutral-900">{product.name}</span>
				</p>
				<article className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="lg:sticky lg:top-24 lg:self-start">
						<ProductImage src={imageUrl} alt={product.name} />
					</div>
					<div className="flex flex-col justify-center">
						<h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
							{product.name}
						</h1>
						<p className="mt-3 text-2xl font-medium text-neutral-900">
							{formatMoney(price / 100)}
						</p>
						<p className="mt-6 text-neutral-600 leading-relaxed">{product.description}</p>
						<div className="mt-8">
							<AddToCartButton
								product={{
									id: product.id,
									name: product.name,
									price: price,
									images: product.images,
									categoryName: categoryName || undefined,
								}}
							/>
						</div>
					</div>
				</article>

				<aside className="mt-20 border-t border-neutral-200 pt-16">
					<h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
						Produkty, które mogą Ci się spodobać
					</h2>
					<div className="mt-8">
						<SuggestedProducts />
					</div>
				</aside>

				<div className="mx-auto mt-20 max-w-3xl border-t border-neutral-200 pt-16 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8">
					<ReviewForm
						productId={productId}
						productSlug={product.slug ?? productId}
					/>
					<ReviewBlock review={reviewsData} />
				</div>
			</section>
		</>
	);
}
