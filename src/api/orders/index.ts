import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { databaseTables } from "../products";

export const useAdminOrdersList = () => {
    return useQuery({
      queryKey: [databaseTables.ORDERS],
      queryFn: async () => {
        const { data, error } = await supabase.from(databaseTables.ORDERS).select("*");
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };