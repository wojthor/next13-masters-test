"use client";

import { usePathname } from "next/navigation";
import { ProductList } from "../../../ui/organism/ProductList";
import { Pagination } from "@/ui/molecules/Pagination";
import { getProductList } from "@/app/api/products";

export default async function ProductsPage() {
	//Manualne ustawienei ilości stron paginacji
	const pathname = usePathname();
	let products = [];

	if (pathname.startsWith("/products/1")) {
		const allProducts = await getProductList();
		products = allProducts.slice(0, 10);
	} else {
		pathname.startsWith("/products/2");
		{
			const allProducts = await getProductList();
			products = allProducts.slice(10, 20);
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<Pagination products={products} />
			<ProductList products={products} />
		</div>
	);
}
