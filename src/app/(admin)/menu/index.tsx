import ProductListItem from "@/components/ProductListItem";
import { View, FlatList } from "react-native";
import { useProductList } from "@/api/products";

export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList();

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
