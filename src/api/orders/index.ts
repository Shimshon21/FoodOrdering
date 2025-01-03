import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { databaseTables } from "../products";
import { useAuth } from "@/providers/AuthProvider";
import { TablesInsert, TablesUpdate } from "@/database.types";

export const useAdminOrdersList = (archived = false) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];

    return useQuery({
      queryKey: [databaseTables.ORDERS, { archived }],
      queryFn: async () => {
        const { data, error } = await supabase
        .from(databaseTables.ORDERS)
        .select("*")
        .in("status", statuses)
        .order('created_at', { ascending: false });
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
          .eq("user_id", id)
          .order('created_at', { ascending: false });
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
        .select("*, order_items(*, products(*))")
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
    mutationFn: async (data: TablesInsert<"orders">) => {
      const { data: newProduct, error } = await supabase
      .from(databaseTables.ORDERS)
      .insert({...data, user_id: id})
      .select()
      .single()

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess(data) {
      // Refetch the products after inserting a new product
      console.log("invalidate orders", data);
      queryClient.invalidateQueries({ queryKey: [databaseTables.ORDERS] });
    }
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (
      { id, updatedFields }: { id: number; updatedFields: TablesUpdate<"orders"> }
    ) => {
      const { data: updateOrder, error } = await supabase
        .from(databaseTables.ORDERS)
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }

      return updateOrder;
    },
    onSuccess: async (_: any, { id }) => {
      // Refetch the products after inserting a new product
      await queryClient.invalidateQueries({ queryKey: [databaseTables.ORDERS] });
      await queryClient.invalidateQueries({ queryKey: [databaseTables.ORDERS, id] });
    },
  });
};


