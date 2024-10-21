import { useAdminOrdersList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useAdminOrdersList(true);

  console.log("Ordders of archived items!!!", orders);

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

export default OrdersScreen;
