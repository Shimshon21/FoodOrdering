import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import Colors from "@/constants/Colors";
import { OrderStatusList } from "@/types";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";

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
				ListFooterComponent={
					<>
						<Text style={{ fontWeight: "bold" }}>Status</Text>
						<View style={{ flexDirection: "row", gap: 5 }}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => console.warn("Update status")}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor:
											order.status === status
												? Colors.light.tint
												: "transparent",
									}}
								>
									<Text
										style={{
											color:
												order.status === status ? "white" : Colors.light.tint,
										}}
									>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				}
			></FlatList>
		</View>
	);
};

export default OrderScreen;
