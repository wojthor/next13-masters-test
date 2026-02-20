"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type HeroSlide = {
	src: string;
	srcMobile?: string;
	alt: string;
	productId?: string;
	productName?: string;
};

const MOBILE_BREAKPOINT = 768;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
	const [index, setIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		if (slides.length <= 1) return;
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % slides.length);
		}, 5000);
		return () => clearInterval(id);
	}, [slides.length]);

	if (!slides.length) return null;

	return (
		<section className="relative h-[70vh] min-h-[400px] w-full overflow-hidden bg-neutral-100">
			{slides.map((slide, i) => {
				const imgSrc =
					isMobile && slide.srcMobile ? slide.srcMobile : slide.src;
				return (
				<div
					key={`${slide.src}-${i}`}
					className={`absolute inset-0 transition-opacity duration-700 ${
						i === index ? "slider-slide z-10 opacity-100" : "z-0 opacity-0"
					}`}
				>
					<div className="relative h-full w-full">
						<Image
							src={imgSrc}
							alt={slide.alt}
							className="object-cover object-center"
							fill
							sizes="(max-width: 768px) 100vw, 1920px"
							priority={i === 0}
							unoptimized={imgSrc.startsWith("/")}
						/>
						<div className="absolute inset-0 bg-black/20" />
						<div className="absolute bottom-0 left-0 right-0 p-8 text-white md:p-12">
							<Link
								href={slide.productId ? `/product/${slide.productId}` : "/products/1"}
								className="inline-block rounded-full bg-white/90 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-white"
							>
								Zobacz produkty
							</Link>
						</div>
					</div>
				</div>
			);
			})}

			{/* Dots */}
			{slides.length > 1 && (
				<div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
					{slides.map((_, i) => (
						<button
							key={i}
							type="button"
							aria-label={`Slajd ${i + 1}`}
							onClick={() => setIndex(i)}
							className={`h-2 w-2 rounded-full transition-colors ${
								i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
							}`}
						/>
					))}
				</div>
			)}
		</section>
	);
}
