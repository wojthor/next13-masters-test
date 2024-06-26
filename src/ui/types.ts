export type ProductItemType = {
	id: string;
	name: string;
	category: string;
	price: number;
	coverImage: { src: string; alt: string };
	longDescription: string;
	rating?: number;
};
