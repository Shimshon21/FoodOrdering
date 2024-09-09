import products from "@assets/data/products";
import ProductListItem from "@/components/ProductListItem";
import { View, FlatList } from "react-native";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function MenuScreen() {
	// Calle when the component mounted(displaye)
	useEffect(() => {
		const fetchProducts = async () => {
			const { data, error } = await supabase.from("products").select("*");
			console.log(error);
		};
	}, []);

	return (
		<View>
			<FlatList
				renderItem={({ item }) => <ProductListItem product={item} />}
				data={products}
				numColumns={2}
				contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }} // gap between rows, padding of the container
				columnWrapperStyle={{ gap: 10 }}
			></FlatList>
		</View>
	);
}
