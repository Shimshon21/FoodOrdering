
import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
  
  export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];  

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type Product = {
  created_at: string;
  id: number;
  image: string | null;
  name: string | null;
  price: number ;
};

export type ProductListItemProps = {
	product: Tables<"products">;
};

export type ProfileItemProps = {
  profile: Tables<"profiles">;
}

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = {
  created_at: string;
  id: number;
  total: number;
  status: OrderStatus;
  user_id: string;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: ProductListItemProps;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
