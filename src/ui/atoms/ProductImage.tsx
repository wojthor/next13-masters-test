export const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100">
			<img
				width={566}
				height={566}
				src={src}
				alt={alt}
				className="h-full w-full object-cover object-center"
			/>
		</div>
	);
};
