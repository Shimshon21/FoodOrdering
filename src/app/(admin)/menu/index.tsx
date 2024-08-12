import products from "@assets/data/products";
import ProductListItem from "@/components/ProductListItem";
import { View, FlatList } from "react-native";

export default function TabOneScreen() {
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
