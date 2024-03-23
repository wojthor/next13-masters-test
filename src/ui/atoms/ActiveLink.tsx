"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type Route } from "next";

type ActiveLinkProps = {
	href: Route;
	children?: ReactNode;
	className?: string;
	activeClassName?: string;
	exact?: boolean;
	partialMatch?: boolean;
};

export const ActiveLink = ({
	href,
	children,
	className = "hover:text-blue-500",
	activeClassName,
	exact = true,
	partialMatch = false,
}: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = exact
		? pathname === href
		: partialMatch
			? pathname.startsWith(href)
			: pathname.includes(href);
	return (
		<Link
			href={href}
			className={clsx(className, {
				[activeClassName || "active"]: isActive,
			})}
			aria-current={isActive ? "page" : undefined}
		>
			{children}
		</Link>
	);
};
