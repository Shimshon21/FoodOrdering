import { Order } from "@/types";
import { Text, View } from "react-native";

type OrderListItemProps = {
	order: Order;
};

const OrderListItem = (order: {}) => {
	return (
		<View>
			<View>
				<Text>Order number </Text>
				<Text>Subtitle</Text>
			</View>

			<View>
				<Text>Status</Text>
			</View>
		</View>
	);
};

export default OrderListItem;
