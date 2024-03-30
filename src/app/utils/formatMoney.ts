export const formatMoney = (number: number) => {
	return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(number);
};
