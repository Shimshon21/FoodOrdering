import { Order } from "@/types";
import relativetime from "dayjs/plugin/relativeTime";
import dayjs, { Dayjs } from "dayjs";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

dayjs.extend(relativetime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  // Current date and time
  const currentDate = dayjs();

  // Use the first segment to determine the route group (e.g., 'user' or 'admin')
  const segments = useSegments();

  <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
    <Pressable style={styles.container}>
      <View>
        <Text>Order #{order.id}</Text>
        <Text style={styles.time}>
          {" "}
          {dayjs(order.created_at).fromNow()} hours ago
        </Text>
      </View>

      <View style={styles.status}>
        <Text>{order.status}</Text>
      </View>
    </Pressable>
  </Link>;
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
