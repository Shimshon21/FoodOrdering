import OrderListItem from "@/components/OrderListItem";
import { View } from "@/components/Themed";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const OrderScreen = () => {
	const { id } = useLocalSearchParams();

	const order = orders.find((order) => order.id.toString() == id);

	if (!order) {
		return <Text>Order not found</Text>;
	}

	return (
		<View>
			<Stack.Screen options={{ title: "Orders" }} />
			<OrderListItem order={order} />
		</View>
	);
};

export default OrderScreen;
