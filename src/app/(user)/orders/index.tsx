import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import { FlatList } from "react-native";

const OrdersList = () => {
	return <FlatList data={orders} renderItem={OrderListItem} />;
};

export default OrdersList;
