import Link from "next/link";

import Image from "next/image";
import { executeGraphQL } from "@/api/products";
import { GetCollectionDocument } from "@/gql/graphql";
import { SuggestedProducts } from "@/ui/atoms/SuggestedProducts";

const grapqhResponse = await executeGraphQL({ query: GetCollectionDocument });
const collections = grapqhResponse.collections.data;

//Temporary data
const photos = [
	{
		imageSrc: "/summer.jpg",
	},
	{
		imageSrc: "/new_arivals.jpg",
	},
	{
		imageSrc: "/extras.jpg",
	},
];

const mappedCollections = collections.map((collection, index) => ({
	...collection,
	photo: photos[index % photos.length],
}));

export default function HomePage() {
	return (
		<>
			<div className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-8">
					<div className="mx-auto py-8">
						<h2 className="text-2xl font-bold text-gray-900">Collections</h2>

						<div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
							{mappedCollections.map((collection) => (
								<div key={collection.name} className="group relative">
									<div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
										<Link href={`/collections/${collection.slug}`}>
											<Image
												src={collection.photo.imageSrc}
												alt={collection.name}
												className="h-full w-full object-cover object-center"
												width={566}
												height={566}
											></Image>
										</Link>
									</div>
									<h3 className="mt-3 text-sm text-gray-500">
										<p className="text-base font-semibold text-gray-900">{collection.name}</p>
									</h3>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<section className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 sm:px-6 lg:max-w-7xl">
				<SuggestedProducts />
			</section>
		</>
	);
}
