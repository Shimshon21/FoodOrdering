import React from "react";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import Colors from "@/constants/Colors";
import { notifiyUserAboutOrderUpdate } from "@/lib/notification";
import { OrderStatusList, OrderItem } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";

const OrderScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const updateStatus = async (status: string) => {
    console.log("Update status to ", status);
    await updateOrder({ id: id, updatedFields: { status } });
    console.log("Order updated");
    if (order) {
      notifiyUserAboutOrderUpdate({ order });
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error loading order</Text>;
  }

  if (!order) {
    return <Text>No order</Text>;
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
                  onPress={() => {
                    updateStatus(status);
                  }}
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
