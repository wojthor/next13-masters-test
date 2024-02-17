import { type ProductItemType } from "@/ui/types";

const URL = "https://naszsklep-api.vercel.app/api/products/";
const take = 20;
const offset = 0;

type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export const getProductList = async () => {
	const res = await fetch(`${URL}?take=${take}&offset=${offset}`);
	const productsResponse = (await res.json()) as ProductResponseItem[];
	const products = productsResponse.map(ProductResponseItemtoProductItemType);

	return products;
};

export const getProductById = async (id: ProductResponseItem["id"]) => {
	const res = await fetch(`${URL}${id}`);
	const productsResponse = (await res.json()) as ProductResponseItem;
	return ProductResponseItemtoProductItemType(productsResponse);
};

const ProductResponseItemtoProductItemType = (product: ProductResponseItem): ProductItemType => {
	return {
		id: product.id,
		name: product.title,
		category: product.category,
		price: product.price,
		coverImage: { src: product.image, alt: product.title },
		longDescription: product.longDescription,
	};
};
