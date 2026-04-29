/**
 * Product Type Definitions
 * Core types for product data structure used across the application
 */

export type ProductCategory = 'Fruits' | 'Leafy Vegetables' | 'Root Vegetables' | 'Daily Vegetables';

export type ProductUnit = 'kg' | 'piece' | 'bunch' | 'dozen' | 'litre';

export interface Product {
  id?: number;
  name: string;
  category: ProductCategory;
  price: number; // Price in INR, editable from admin
  originalPrice?: number; // For showing discounts
  unit: ProductUnit;
  stock: number; // Quantity available
  image: string; // Path to product image
  description: string;
  rating?: number; // Rating out of 5
  reviews?: number; // Number of reviews
  tags?: string[]; // For filtering and search
  isFeatured?: boolean; // For homepage
  benefits?: string[]; // Health benefits
  status?: string; // e.g. 'In Stock' or 'Out of Stock'
}

export interface ProductFilterOptions {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
}

export interface PaginatedProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductCreateInput {
  name: string;
  category: ProductCategory;
  price: number;
  unit: ProductUnit;
  stock: number;
  image: string;
  description: string;
  tags?: string[];
  benefits?: string[];
  isFeatured?: boolean;
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {
  id: string;
}
