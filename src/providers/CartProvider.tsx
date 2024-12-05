import { CartItem, PizzaSize, Tables } from "@/types";
import products from "@assets/data/products";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { router } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";
import { initializePaymentSheet, openPaymentSheet } from "@/lib/stripe";

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
  const { mutate: insertOrderItems } = useInsertOrderItems();

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

  const checkout = async () => {
    await initializePaymentSheet(Math.floor(total * 100));
    const payed = await openPaymentSheet();
    if (!payed) {
      return;
    }

    insertOrder(
      {
        total,
      },
      {
        onSuccess: (data) => {
          saveOrderItems(data);
        },
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));
    console.log("insert order items orderItems", orderItems);

    insertOrderItems(orderItems, {
      onSuccess: (data) => {
        console.log("Success inserting order items", data);
        clearCart();
        router.back();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
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
