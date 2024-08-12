import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { Product } from "../types";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Link, useSegments } from "expo-router";

type ProductListItemProps = {
  product: Product;
};

const defaultPizzaImage: string =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    // We can also write the route as (tabs)/menu/${product.id}
    // but round brackets() are optional path
    <Link href={`${segments[0]}/menu/${product.id}`} asChild={true}>
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode="contain"
        ></Image>
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
