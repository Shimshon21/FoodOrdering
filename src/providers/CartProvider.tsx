import { CartItem, PizzaSize, Tables } from "@/types";
import products from "@assets/data/products";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { router } from "expo-router";

type Product = Tables<"products">;

type CartType = {
	items: CartItem[];
	addItem: (product: Product, size: CartItem["size"]) => void;
	updateQuantity: (itemId: string, amount: -1 | 1) => void;
	total: number;
	checkout: () => void;
};

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
	checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const { mutate: insertOrder } = useInsertOrder();

	const addItem = (product: Product, size: PizzaSize) => {
		const exisitngItem = items.find(
			(item) => item.product == product && item.size == size
		);

		if (exisitngItem) {
			updateQuantity(exisitngItem.id, 1);
			return;
		}

		const newCartItem: CartItem = {
			id: randomUUID(),
			product,
			product_id: product.id,
			size,
			quantity: 1,
		};

		// include the new cart at the top, and the old items
		setItems([newCartItem, ...items]);
	};

	const updateQuantity = (itemId: string, amount: -1 | 1) => {
		console.log(itemId, amount);
		const updatedItems = items
			.map((item) =>
				item.id != itemId ? item : { ...item, quantity: item.quantity + amount }
			)
			.filter((item) => item.quantity > 0);
		setItems(updatedItems);
	};

	console.log(items);

	const total = items.reduce(
		(sum, item) => (sum += (item.product?.price ?? 0) * item.quantity),
		0
	);

	const clearCart = () => {
		setItems([]);
	};

	const checkout = () => {
		insertOrder(
			{
				total,
			},
			{
				onSuccess: (data) => {
					clearCart();
					router.back();
					router.push(`/(user)/orders/${data.id}`);
				},
			}
		);
	};

	const saveOrderItems = (data: Tables<"orders">) => {
		const orderItems = items.map((item) => ({
			order_id: data.id,
			product_id: item.product_id,
			quantity: item.quantity,
			size: item.size,
		}));
		console.log(orderItems);
		clearCart();
		router.push(`/(user)/orders/${data.id}`);
	};

	return (
		<CartContext.Provider
			value={{ items, addItem, updateQuantity, total, checkout }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
