import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { View } from "@/components/Themed";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, FlatList, StyleSheet } from "react-native";

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
			<FlatList
				contentContainerStyle={{ gap: 10, paddingTop: 10 }}
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
			></FlatList>
		</View>
	);
};

export default OrderScreen;
