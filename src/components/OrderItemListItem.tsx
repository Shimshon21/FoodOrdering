import { View, Image, StyleSheet, Text } from "react-native";
import { defaultPizzaImage } from "./ProductListItem";
import Colors from "@/constants/Colors";
import { OrderItem } from "@/types";
import { useProduct } from "@/api/products";

type OrderItemListItemProps = {
  orderItem: OrderItem;
};

const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
  const { data: product } = useProduct(orderItem.product_id);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product?.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{product?.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ${(product?.price || 0) * orderItem.quantity}
          </Text>
          <Text>Size: x</Text>
        </View>
      </View>
      <Text style={styles.quantity}>{orderItem.quantity}</Text>
    </View>
  );
};

export default OrderItemListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
