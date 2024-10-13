import { useMyOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrdersList = () => {
	const { data: orders, isLoading, error } = useMyOrderList();

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Error loading orders</Text>;
	}

	if (!orders) {
		return <Text>No orders</Text>;
	}

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
		/>
	);
};

export default OrdersList;
