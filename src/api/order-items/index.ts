import { useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { databaseTables } from '../products';
import { TablesInsert } from '@/database.types';

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: TablesInsert<databaseTables.ORDER_ITEMS>[]) => {
      const { data: newProduct, error } = await supabase
        .from(databaseTables.ORDER_ITEMS)
        .insert(items)
        .select();

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      console.log('Success inserting order items of product', newProduct);
      return newProduct;
    },
    onSuccess(data) {
      console.log('Success inserting order items', data);
    }
  });
};