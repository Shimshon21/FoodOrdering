import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { Tables } from "../types";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Link, useSegments } from "expo-router";
import { databaseTables } from "@/api/products/index";
import RemoteImage from "./RemoteImage";

type ProductListItemProps = {
  product: Tables<databaseTables.PRODUCTS>;
};

export const defaultPizzaImage: string =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    // We can also write the route as (tabs)/menu/${product.id}
    // but round brackets() are optional path
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image ?? defaultPizzaImage}
          style={styles.image}
          fallback={defaultPizzaImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
