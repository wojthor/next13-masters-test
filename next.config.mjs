// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		domains: ["static-ourstore.hyperfunctor.com", "images.unsplash.com"],
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
			{
				source: "/categories/t-shirts",
				destination: "/categories/t-shirts/1",
				permanent: true,
			},
			{
				source: "/categories/hoodies",
				destination: "/categories/hoodies/1",
				permanent: true,
			},
			{
				source: "/categories/accessories",
				destination: "/categories/accessories/1",
				permanent: true,
			},
		];
	},
};

export default nextConfig;

// Path: next.config.js
