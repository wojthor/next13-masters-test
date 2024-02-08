import { ProductList } from "../ui/organism/ProductList";
import { type ProductItemType } from "../ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		name: "Koszulka",
		category: "T-shirt",
		price: 50,
		coverImage: { src: "/koszulka.png", alt: "Koszulka" },
	},
	{
		id: "2",
		name: "Bluza",
		category: "Hoodie",
		price: 150,
		coverImage: { src: "/bluza.png", alt: "Bluza" },
	},
	{
		id: "3",
		name: "Kubek",
		category: "Accerories",
		price: 150,
		coverImage: { src: "/kubek.png", alt: "Kubek" },
	},
	{
		id: "4",
		name: "Czapka",
		category: "Hat",
		price: 150,
		coverImage: { src: "/czapka.png", alt: "Czapka" },
	},
];

export default function Home() {
	return (
		<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<ProductList products={products} data-testid="products-list" />
		</section>
	);
}
