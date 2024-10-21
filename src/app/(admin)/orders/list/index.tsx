import { useAdminOrdersList } from "@/api/orders";
import { useInsertOrderSubscription } from "@/api/orders/subscriptions";
import OrderListItem from "@/components/OrderListItem";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useAdminOrdersList(false);

  const queryClient = useQueryClient();

  useInsertOrderSubscription();

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
