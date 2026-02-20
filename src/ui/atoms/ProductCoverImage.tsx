export const ProductCoverImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100">
			<img
				src={src}
				alt={alt}
				width={320}
				height={320}
				className="h-full w-full object-cover object-center transition duration-300 hover:scale-[1.02]"
			/>
		</div>
	);
}
