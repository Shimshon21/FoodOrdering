import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

enum databaseTables {
  PRODUCTS = "products",
}

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
    mutationFn: async (data: any) => {
      const { data: newProduct, error } = await supabase
      .from(databaseTables.PRODUCTS)
      .update({
         name: data.name,
         price: data.price,
         image: data.image,
      })
      .eq("id", data.id);

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    return newProduct;
  }
  , async onSuccess(_, id) {
    // Refetch the products after inserting a new product
    queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS] });
    queryClient.invalidateQueries({ queryKey: [databaseTables.PRODUCTS, id] });
  }
});
};
