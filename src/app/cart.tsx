import { StatusBar } from "expo-status-bar";
import { View, Text, Platform, FlatList } from "react-native";

import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
	const { items, total, checkout } = useCart();

	return (
		<View>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{ padding: 10, gap: 10 }}
			/>
			<Text style={{ margin: 10 }}>Total: ${total}</Text>
			<Button onPress={checkout} text="Checkout" />
			<StatusBar style={Platform.OS == "ios" ? "light" : "auto"} />
		</View>
	);
};

export default CartScreen;
