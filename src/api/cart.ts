"use sever";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphQL } from "@/api/products";
import { TypedDocumentString } from "@/gql/graphql";

type GetCartByIdQuery = {
	cart?: {
		items: Array<{
			product: { name: string; price: number; images: Array<{ url: string }> };
			quantity: number;
		}>;
	};
};

const GetCartByIdDocument = new TypedDocumentString(
	`query GetCartByID($id: ID!) { cart(id: $id) { items { product { id name price images { url } categories { name } } quantity } } }`,
) as unknown as TypedDocumentString<GetCartByIdQuery, { id: string }>;

export const getCartIdFromCookie = async () => {
	const cookieStore = await cookies();
	const cart = cookieStore.get("cartId")?.value;
	const CartId: string = cart?.toString() || "";

	if (!cart) {
		console.log("Cart is empty");
	}

	return CartId;
};

export const getCart = async () => {
	const cart = await getCartIdFromCookie();
	if (!cart) {
		console.log();
	}
	const CartId = cart;

	const findCart = await executeGraphQL({
		query: GetCartByIdDocument,
		variables: { id: CartId },
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});

	return findCart;
};

export async function handleStripePaymentAction() {
	"use server";

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2026-01-28.clover",
		typescript: true,
	});

	const CartId = await getCartIdFromCookie();

	const findCart = await getCart();
	if (!findCart) {
		console.log("Cart is empty");
	}

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik", "p24", "paypal"],
		metadata: {
			cartId: CartId,
		},
		line_items: findCart.cart?.items
			.map((item) => {
				return {
					price_data: {
						currency: "pln",
						product_data: {
							name: item.product.name,
							images: item.product.images.map((image) => image.url),
						},
						unit_amount: item.product.price,
					},
					quantity: item.quantity,
				};
			})
			.filter(Boolean),
		mode: "payment",
		success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cart/canceled`,
	});
	if (session.url) {
		(await cookies()).set("cartId", "");
		redirect(session.url as Parameters<typeof redirect>[0]);
	}
}
