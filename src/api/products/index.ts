import { supabase } from "@/lib/supabase";
import { Tables, TablesUpdate } from "@/database.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export const enum databaseTables {
  PRODUCTS = "products",
  ORDERS = "orders",
  ORDER_ITEMS = "order_items",
}

type ProductListItemProps = {
	product: Tables<databaseTables.PRODUCTS>;
};

export const useProductList = () => {
  return useQuery({
    queryKey: [databaseTables.PRODUCTS],
    queryFn: async () => {
      const { data, error } = await supabase.from(databaseTables.PRODUCTS).select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
    return useQuery({
      queryKey: [databaseTables.PRODUCTS, id],
      queryFn: async () => {
        const { data, error } = await supabase
        .from(databaseTables.PRODUCTS)
        .select("*")
        .eq("id", id)
        .single();
                
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const product = data.product

      console.log("Inserting product", data);
      const { data: newProduct, error } = await supabase
      .from(databaseTables.PRODUCTS)
      .insert({
         name: data.name,
         price: data.price,
         image: data.image,
      });

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess(data) {
      // Refetch the products after inserting a new product
      queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS] });
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TablesUpdate<"products">) => {
      const { data: newProduct, error } = await supabase
      .from(databaseTables.PRODUCTS)
      .update({
         name: data.name,
         price: data.price,
         image: data.image,
      })
      .eq("id", data.id ?? 0);

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }

      return newProduct;
    },    onSuccess: (_, variables) => {
      // Refetch the products after updating a product
      queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS, variables.id] });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    async mutationFn(id: number) { 
      await supabase
      .from(databaseTables.PRODUCTS)
      .delete()
      .eq("id", id);
    }, async onSuccess() {
      console.log("Product deleted on api");
  // Refetch the products after inserting a new product
  queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS] });
}
  });
};