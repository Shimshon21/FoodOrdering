import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";



export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        console.log("subscribing to orders");
        // Subscribe to real-time changes in the orders table
         const orderSubscription = supabase
          .channel("custom-insert-channel")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "orders" },
            (payload) => {
              console.log("Change received!", payload);
              queryClient.invalidateQueries({ queryKey: ["orders"] });
            }
          )
          .subscribe();
    
        return () => {
          console.log("unsubscribing to orders");
          orderSubscription.unsubscribe();
        };
      }, []);
    };