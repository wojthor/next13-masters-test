import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/ui/organism/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sklep Wojthora",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="pl">
			<body className={inter.className}>
				<div className="mx-auto max-w-md px-12 sm:max-w-2xl  md:max-w-4xl lg:max-w-7xl">
					<Navbar />
				</div>

				<section className="mx-auto max-w-md p-12  sm:max-w-2xl  md:max-w-4xl lg:max-w-7xl">
					{children}
				</section>

				<footer className="text-center text-sm text-gray-500">
					<p>
						© {new Date().getFullYear()}{" "}
						<a href="https://github.com/wojthor" className="text-gray-700">
							Wojthor
						</a>
					</p>
				</footer>
				{modal}
			</body>
		</html>
	);
}
