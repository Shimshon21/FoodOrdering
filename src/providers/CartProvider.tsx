import { createContext } from "react";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
	return (
		<CartContext.Provider value={{ items: [], onAddItem: () => {} }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
