import { Order } from "@/types";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

type OrderListItemProps = {
	order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
	// Current date and time
	const currentDate = dayjs();

	const diffDate = dayjs(currentDate)
		.diff(order.created_at, "hour")
		.toLocaleString();

	const segments = useSegments();

	return (
		<Link href={`/${segments[0]}/orders/${order.id}`} asChild={true}>
			<Pressable style={styles.container}>
				<View>
					<Text>Order #{order.id}</Text>
					<Text style={styles.time}>{diffDate} hours ago</Text>
				</View>

				<View style={styles.status}>
					<Text>{order.status}</Text>
				</View>
			</Pressable>
		</Link>
	);
};

export default OrderListItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		marginVertical: 5,
		padding: 20,
		borderRadius: 10,
		justifyContent: "space-between",
	},

	status: {
		marginLeft: "auto",
	},

	time: {
		color: "grey",
	},
});
