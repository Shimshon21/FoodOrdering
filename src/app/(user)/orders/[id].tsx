import { useOrderDetails } from "@/api/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { View } from "@/components/Themed";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

const OrderScreen = () => {
  const { id } = useLocalSearchParams();
  console.log("Load order by id ", id);
  const {
    data: order,
    isLoading,
    error,
  } = useOrderDetails(parseInt(id as string));

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.error("Error loading order by id ", error);
    return <Text>Error loading order</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: "Order #" + id }} />
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
