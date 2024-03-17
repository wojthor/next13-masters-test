/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-async-client-component */
/*
"use client";
import { useSearchParams } from "next/navigation";

import { executeGraphQL } from "@/api/products";
import { SearchDocument } from "@/gql/graphql";
import { ProductList } from "@/ui/organism/ProductList";

export default async function SearchPage() {
	/*
	const searchParams = useSearchParams();
	const query = searchParams.get("query");
	const res = await executeGraphQL({
		query: SearchDocument,
		variables: {
			search: query,
		},
	});
	const products = res.products.data.map((product) => {
		return {
			id: product.id,
			name: product.name,
			category: product.categories[0].name,
			price: product.price,
			coverImage: { src: product.images[0].url, alt: product.name },
			longDescription: product.description,
		};
	});

	return (
		<>
			<div className="flex flex-grow flex-col gap-5">
				<div className=" text-xl font-bold text-black">
					<div className="mx-auto max-w-7xl px-8">
						<div className="mx-auto py-8">
							<h1>
								Znaleziono {products.length} produktów pod frazą "{query}"
							</h1>
						</div>
					</div>
				</div>
				<div>
					<ProductList products={products} />
				</div>
			</div>
		</>
	);
}
*/
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ProductList } from "@/ui/organism/ProductList";
import { type ProductItemType } from "@/ui/types";
import { SearchProduct } from "@/api/products";

export default function SearchPage() {
	const searchParams = useSearchParams();
	const search = searchParams.get("query");
	const [query, setQuery] = useState<string | null>(null);
	const [products, setProducts] = useState<ProductItemType[]>([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setQuery(search);
		}, 500);

		return () => clearTimeout(timer);
	}, [search]);

	useEffect(() => {
		if (query) {
			const fetchProducts = async () => {
				const products = await SearchProduct({ query });
				setProducts(products);
			};
			void fetchProducts();
		}
	}, [query]);

	return (
		<>
			<div className="flex flex-grow flex-col gap-5">
				<div className=" text-xl font-bold text-black">
					<div className="mx-auto max-w-7xl px-8">
						<div className="mx-auto py-8">
							<h1>
								Znaleziono {products.length} produktów pod frazą "{query}"
							</h1>
						</div>
					</div>
				</div>
				<div>
					<ProductList products={products} />
				</div>
			</div>
		</>
	);
}
