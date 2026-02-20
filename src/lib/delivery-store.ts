const DELIVERY_KEY = "cart-delivery";

export type DeliveryOptionId = "inpost" | "dhl" | "dpd";

export type DeliveryOption = {
	id: DeliveryOptionId;
	name: string;
	description: string;
	priceCents: number;
	estimatedDays: string;
};

export const DELIVERY_OPTIONS: DeliveryOption[] = [
	{
		id: "inpost",
		name: "InPost Paczkomaty",
		description: "Dostawa do paczkomatu 24/7",
		priceCents: 999,
		estimatedDays: "2–3 dni robocze",
	},
	{
		id: "dhl",
		name: "DHL",
		description: "Kurier DHL do drzwi",
		priceCents: 1299,
		estimatedDays: "1–2 dni robocze",
	},
	{
		id: "dpd",
		name: "DPD",
		description: "Kurier DPD do drzwi",
		priceCents: 1199,
		estimatedDays: "1–2 dni robocze",
	},
];

export function getSelectedDelivery(): DeliveryOptionId | null {
	if (typeof window === "undefined") return null;
	const raw = window.localStorage.getItem(DELIVERY_KEY);
	if (!raw) return null;
	const id = raw as DeliveryOptionId;
	return DELIVERY_OPTIONS.some((o) => o.id === id) ? id : null;
}

export function setSelectedDelivery(id: DeliveryOptionId): void {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(DELIVERY_KEY, id);
	window.dispatchEvent(new Event("delivery-updated"));
}

export function getDeliveryOption(id: DeliveryOptionId): DeliveryOption {
	return DELIVERY_OPTIONS.find((o) => o.id === id) ?? DELIVERY_OPTIONS[0];
}
