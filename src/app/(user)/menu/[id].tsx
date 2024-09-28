import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@components/Button";
import { PizzaSize } from "@/types";
import { useCart } from "@/providers/CartProvider";
import { useProduct } from "@/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(Number(typeof id === "string" ? id : id[0]));

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  // const product = products.find((p) => p.id.toString() == id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error loading product</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      ></Image>
      <Text>Select size:</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              { backgroundColor: selectedSize == size ? "gainsboro" : "white" },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize == size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart"></Button>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
