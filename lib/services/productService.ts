import { supabase } from '../supabase';
import { Product } from '@/types/product';

/**
 * Maps the database snake_case fields back to the local camelCase Product interface
 */
const mapDbToProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.category as 'Fruits' | 'Vegetables',
    price: dbProduct.price,
    unit: dbProduct.unit,
    stock: dbProduct.stock,
    image: dbProduct.image,
    description: dbProduct.description,
  };
};

/**
 * Fetches all products from Supabase
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data.map(mapDbToProduct);
};

/**
 * Fetches products by category from Supabase
 */
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', category)
    .order('name', { ascending: true });

  if (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }

  return data.map(mapDbToProduct);
};

/**
 * Searches products by name from Supabase
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name', { ascending: true });

  if (error) {
    console.error(`Error searching products for ${query}:`, error);
    return [];
  }

  return data.map(mapDbToProduct);
};
