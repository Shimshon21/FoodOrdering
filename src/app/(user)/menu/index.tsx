import products from "@assets/data/products";
import ProductListItem from "@/components/ProductListItem";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function MenuScreen() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  // // Calle when the component mounted(displaye)
  // useEffect(() => {
  // 	const fetchProducts = async () => {
  // 		const { data, error } = await supabase.from("products").select("*");
  // 		console.log(error);
  // 	};
  // }, []);

  return (
    <View>
      <FlatList
        renderItem={({ item }) => <ProductListItem product={item} />}
        data={data}
        numColumns={2}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }} // gap between rows, padding of the container
        columnWrapperStyle={{ gap: 10 }}
      ></FlatList>
    </View>
  );
}
