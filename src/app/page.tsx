import Link from "next/link";
import { getProductList } from "@/api/products";
import { HERO_SLIDES } from "@/config/hero-slides";
import { HeroSlider } from "@/ui/molecules/HeroSlider";
import { ProductList } from "@/ui/organism/ProductList";

export default async function HomePage() {
	const products = await getProductList({ sort: "DEFAULT", order: "DESC" });
	const featured = products.slice(0, 8);

	const sliderSlides = HERO_SLIDES.map((s) => ({
		src: s.src,
		srcMobile: s.srcMobile,
		alt: s.alt,
	}));

	return (
		<>
			<HeroSlider slides={sliderSlides} />

			<section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
				<div className="mb-10 flex items-end justify-between">
					<h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
						Polecane produkty
					</h2>
					<Link
						href="/products/1"
						className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
					>
						Zobacz wszystko →
					</Link>
				</div>
				<ProductList products={featured} />
			</section>
		</>
	);
}
