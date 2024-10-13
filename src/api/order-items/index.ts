import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { databaseTables } from '../products';
import { InsertTables } from '@/types';

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const id = session?.user.id;

  return useMutation({
    mutationFn: async (data: InsertTables<databaseTables.ORDER_ITEMS>) => {
      const { data: newProduct, error } = await supabase
        .from(databaseTables.ORDER_ITEMS)
        .insert({...data, user_id: id})
        .select()
        .single();

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return newProduct;
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [databaseTables.ORDERS] });
    }
  });
};