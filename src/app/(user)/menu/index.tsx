import ProductListItem from "@/components/ProductListItem";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useProductList } from "@/api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  
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
