import products from "@assets/data/products";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import defaultPizzaImage from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@components/Button";
import { PizzaSize } from "@/types";
import { useCart } from "@/providers/CartProvider";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const { addItem } = useCart();

	const router = useRouter();

	const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

	const product = products.find((p) => p.id.toString() == id);

	const addToCart = () => {
		if (!product) {
			return;
		}
		addItem(product, selectedSize);
		router.push("/cart");
	};

	if (!product) {
		return <Text>Product not fount</Text>;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: product.name }} />
			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
				resizeMode="contain"
			></Image>
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
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
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
