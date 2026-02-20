import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/ui/organism/Navbar";
import { Footer } from "@/ui/organism/Footer";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});


export const metadata: Metadata = {
	title: "Sklep Wojthora",
	description: "Nowoczesny sklep internetowy",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="pl" className={inter.variable}>
			<body className={`min-h-screen antialiased ${inter.className}`}>
				<header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
					<Navbar />
				</header>

				<main className="flex flex-1 flex-col">{children}</main>

				<Footer />
				{modal}
			</body>
		</html>
	);
}
