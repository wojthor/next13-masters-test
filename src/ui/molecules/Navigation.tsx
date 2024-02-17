import { type Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

const pageNumber = 1;

export const Navigation = () => {
	return (
		<nav className="flex flex-row justify-center gap-5 pt-2">
			<ul>
				<li>
					<ActiveLink href="/" exact>
						Home
					</ActiveLink>
				</li>
			</ul>
			<ul>
				<li>
					<ActiveLink href={`/products/${pageNumber}` as Route} partialMatch>
						All
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
