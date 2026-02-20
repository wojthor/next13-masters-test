const CART_KEY = "cart";

export type LocalCartItem = {
	productId: string;
	quantity: number;
	product: {
		id: string;
		name: string;
		price: number;
		images: { url: string }[];
		categoryName?: string;
	};
};

function getCartFromStorage(): LocalCartItem[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(CART_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as LocalCartItem[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function saveCart(items: LocalCartItem[]) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(CART_KEY, JSON.stringify(items));
	window.dispatchEvent(new Event("cart-updated"));
}

export function getCart(): LocalCartItem[] {
	return getCartFromStorage();
}

export function addToCart(item: Omit<LocalCartItem, "quantity"> & { quantity?: number }) {
	const cart = getCartFromStorage();
	const qty = item.quantity ?? 1;
	const existing = cart.find((i) => i.productId === item.productId);
	if (existing) {
		existing.quantity += qty;
	} else {
		cart.push({ ...item, quantity: qty });
	}
	saveCart(cart);
}

export function removeFromCart(productId: string) {
	saveCart(getCartFromStorage().filter((i) => i.productId !== productId));
}

export function updateQuantity(productId: string, quantity: number) {
	if (quantity < 1) {
		removeFromCart(productId);
		return;
	}
	const cart = getCartFromStorage();
	const item = cart.find((i) => i.productId === productId);
	if (item) {
		item.quantity = quantity;
		saveCart(cart);
	}
}
