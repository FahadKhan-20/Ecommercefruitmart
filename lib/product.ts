/**
 * Product Data & Exports
 * Central location for product-related data and utilities
 */

export * from '@/types/product';
export {
  products,
  FEATURED_PRODUCTS,
  CATEGORIES,
  getProductsByCategory,
  getProductById,
  filterProducts,
  searchProducts
} from '@/lib/data/products';
