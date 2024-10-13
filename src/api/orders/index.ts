import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { databaseTables } from "../products";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables } from "@/types";

export const useAdminOrdersList = (archived = false) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];

    return useQuery({
      queryKey: [databaseTables.ORDERS, { archived }],
      queryFn: async () => {
        const { data, error } = await supabase
        .from(databaseTables.ORDERS)
        .select("*")
        .in("status", statuses);
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };

  /**
   * Fetches the list of orders for the current authenticated user.
   *
   * @returns A React Query hook that provides the list of orders for the current user.
   */
  export const useMyOrderList = () => {
    const { session } = useAuth();
    const id = session?.user.id;

    return useQuery({
      queryKey: [databaseTables.ORDERS, {userId: id }],
      queryFn: async () => {
        if (!id) {
          throw new Error("User ID is undefined");
        }
        const { data, error } = await supabase
          .from(databaseTables.ORDERS)
          .select("*")
          .eq("user_id", id);
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  }

  export const useOrderDetails = (id: number) => {
    let ordersTable = databaseTables.ORDERS;
    return useQuery({
      queryKey: [ordersTable, id],
      queryFn: async () => {
        const { data, error } = await supabase
        .from(ordersTable)
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

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const id = session?.user.id;

  return useMutation({
    mutationFn: async (data: InsertTables<"orders">) => {
      const { data: newProduct, error } = await supabase
      .from(databaseTables.ORDERS)
      .insert({...data, user_id: id})
      .select()
      .single();

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess(data) {
      // Refetch the products after inserting a new product
      queryClient.invalidateQueries({ queryKey: [databaseTables.ORDERS] });
    }
  });
};