export function calculateProductRange(
	pageNumber: number,
	productsPerPage: number,
): [number, number] {
	const startIndex = (pageNumber - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	return [startIndex, endIndex];
}
