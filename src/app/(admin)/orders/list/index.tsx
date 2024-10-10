import { useAdminOrdersList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrdersList = () => {
	const { data: orders, isLoading, error } = useAdminOrdersList();

	console.log("Ordders!!!", orders);

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Error: {error.message}</Text>;
	}

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
		/>
	);
};

export default OrdersList;
