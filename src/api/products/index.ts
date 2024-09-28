import { supabase } from "@/lib/supabase";
import { Tables } from "@/database.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export const enum databaseTables {
  PRODUCTS = "products",
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
    mutationFn: async (data: ProductListItemProps ) => {
      const product = data.product
      const { data: newProduct, error } = await supabase
      .from(databaseTables.PRODUCTS)
      .insert({
         name: product.name,
         price: product.price,
         image: product.image,
      });

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess(data: ProductListItemProps) {
      // Refetch the products after inserting a new product
      queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS] });
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductListItemProps) => {
      const product = data.product
      const { data: newProduct, error } = await supabase
      .from(databaseTables.PRODUCTS)
      .update({
         name: product.name,
         price: product.price,
         image: product.image,
      })
      .eq("id", product.id);

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    return newProduct;
  }
  , async onSuccess(_: any, id: number) {
    // Refetch the products after inserting a new product
    queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS] });
    queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS, id] });
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
  // Refetch the products after inserting a new product
  queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS] });
}
  });
};