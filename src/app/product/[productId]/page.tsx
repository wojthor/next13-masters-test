import { cookies } from "next/headers";

import { notFound } from "next/navigation";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { revalidateTag } from "next/cache";
import { executeGraphQL, getProductList } from "@/api/products";
import { SuggestedProducts } from "@/ui/atoms/SuggestedProducts";
import { ProductImage } from "@/ui/atoms/ProductImage";
import {
	CartFindOrCreateDocument,
	ProductGetByIdDocument,
	AddItemDocument,
	GetReviewDocument,
} from "@/gql/graphql";
import { AddToCartButton } from "@/app/product/[productId]/AddToCartButton";
import { formatMoney } from "@/app/utils/formatMoney";
import { ReviewBlock } from "@/ui/atoms/ReviewBlock";
import { RevievForm } from "@/ui/atoms/ReviewForm";
import { getCart } from "@/api/cart";

import { changeItemQuantity } from "@/app/cart/actions";

const back = (
	<Link href="/products/1" className="flex flex-row font-semibold">
		<IoIosArrowBack className="size-5" /> Powrót
	</Link>
);

export const generateStaticParams = async () => {
	const products = await getProductList();
	return products.map((product) => ({
		productId: product.id,
	}));
};

async function addProductToCartAction(_formData: FormData) {
	"use server";

	//Pobiera id produktu z formularza
	const productId = _formData.get("productId");
	if (!productId) {
		console.error("productId is missing.");
		return;
	}

	//Pobiera id koszyka z plików cookie
	const cartIdFromCookies = cookies().get("cartId")?.value;
	let CartId: string;
	if (cartIdFromCookies) {
		CartId = cartIdFromCookies;
	} else {
		// Jeśli koszyk nie istnieje, utwórz nowy
		const response = await executeGraphQL({
			query: CartFindOrCreateDocument,
			variables: {
				input: { items: [{ productId: productId as string }] },
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-store",
		});
		CartId = response.cartFindOrCreate.id;

		// Ustaw wartość CartId w plikach cookie
		cookies().set("cartId", CartId);
	}

	//Sprawdza czy produkt jest w koszyku i jesli jest to zwieksza jego ilosc o 1
	// jesli nie to dodaje go do koszyka
	const searchCart = await getCart();
	const findId = searchCart.cart?.items.map((item) => item.product.id);

	const currentQuantity = searchCart.cart?.items.find(
		(item) => item.product.id === productId,
	)?.quantity;
	const newQuantity = currentQuantity ? currentQuantity + 1 : 1;

	if (findId && findId.includes(productId as string)) {
		await changeItemQuantity(CartId, productId as string, newQuantity);
	} else {
		const addItemResponse = await executeGraphQL({
			query: AddItemDocument,
			variables: {
				id: CartId,
				input: {
					item: {
						productId: productId as string,
					},
				},
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-store",
		});
		revalidateTag("cart");

		return addItemResponse;
	}
}

export const generateMetadata = async ({ params }: { params: { productId: string } }) => {
	const { product } = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: { id: params.productId },
	});

	return {
		title: product?.name,
		description: product?.description,
	};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const { product } = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: { id: params.productId },
		next: {
			revalidate: 15,
		},
	});

	const productId = params.productId;

	if (!product) {
		notFound();
	}

	const review = await executeGraphQL({
		query: GetReviewDocument,
		variables: { id: params.productId },
		next: {
			revalidate: 15,
		},
	});

	return (
		<>
			<div className="flex flex-col gap-12">
				<p className="flex flex-row text-sm uppercase  text-gray-500">
					{back} / {product.categories[0].name} / {product.name}
				</p>
				<article className=" flex flex-row gap-20">
					<div className=" basis-1/2">
						<ProductImage src={product.images[0].url} alt={product.name} />
					</div>

					<div className="flex basis-1/2 flex-col justify-center gap-5">
						<h1 className="text-6xl font-semibold text-black">{product.name}</h1>
						<p className="font-base small-caps text-lg text-black">
							{" "}
							{formatMoney(product.price / 100)}
						</p>
						<p className="text-m font-extralight text-black">{product.description}</p>
						<form action={addProductToCartAction}>
							<input type="text" name="productId" value={product.id} hidden />

							<AddToCartButton />
						</form>
					</div>
				</article>

				<aside className="flex flex-row ">
					<div className="flex flex-col gap-5 text-black">
						<p className="font-semibold">Produkty, które mogą Ci się spodobać</p>
						<SuggestedProducts />
					</div>
				</aside>

				<div className="flex flex-row gap-12">
					<RevievForm productId={productId} /> <ReviewBlock review={review} />
				</div>
			</div>
		</>
	);
}
