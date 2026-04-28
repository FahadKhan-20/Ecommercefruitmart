/**
 * Application Constants
 * Shared constants used throughout the application
 */

// Product Categories
export const PRODUCT_CATEGORIES = {
  FRUITS: 'Fruits',
  LEAFY_VEGETABLES: 'Leafy Vegetables',
  ROOT_VEGETABLES: 'Root Vegetables',
  DAILY_VEGETABLES: 'Daily Vegetables',
} as const;

export const CATEGORY_LIST = Object.values(PRODUCT_CATEGORIES);

// Product Units
export const PRODUCT_UNITS = {
  KG: 'kg',
  PIECE: 'piece',
  BUNCH: 'bunch',
  DOZEN: 'dozen',
  LITRE: 'litre',
} as const;

// Pricing
export const MIN_PRODUCT_PRICE = 20;
export const MAX_PRODUCT_PRICE = 500;
export const DEFAULT_CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';

// Stock Status
export const STOCK_STATUS = {
  OUT_OF_STOCK: 'out-of-stock',
  LOW_STOCK: 'low-stock',
  IN_STOCK: 'in-stock',
} as const;

export const LOW_STOCK_THRESHOLD = 10;

// Pagination Defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 12;
export const MAX_LIMIT = 100;

// Image Paths
export const IMAGE_PATHS = {
  PRODUCTS: '/images/products',
  CATEGORIES: '/images/categories',
  HERO: '/images/hero',
  UI: '/images/ui',
  PLACEHOLDER: '/images/placeholder.jpg',
} as const;

// Rating
export const MIN_RATING = 0;
export const MAX_RATING = 5;

// Tags
export const COMMON_TAGS = [
  'fresh',
  'organic',
  'imported',
  'seasonal',
  'daily-use',
  'budget-friendly',
  'premium',
  'healthy',
  'exotic',
  'traditional',
  'superfood',
  'low-calorie',
  'vitamin-a',
  'vitamin-c',
  'antioxidants',
  'fiber',
  'low-carb',
] as const;

// Discount Types
export const DISCOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed-amount',
} as const;

// Sort Options
export const SORT_OPTIONS = {
  PRICE_LOW_TO_HIGH: 'price-asc',
  PRICE_HIGH_TO_LOW: 'price-desc',
  NEWEST: 'newest',
  MOST_POPULAR: 'popular',
  HIGHEST_RATED: 'rating',
  MOST_REVIEWED: 'reviews',
} as const;

// Validation Rules
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 1000,
  VALID_UNITS: Object.values(PRODUCT_UNITS),
  VALID_CATEGORIES: Object.values(PRODUCT_CATEGORIES),
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  CART: '/api/cart',
  AUTH: '/api/auth',
  CATEGORIES: '/api/categories',
  SEARCH: '/api/search',
  PAYMENTS: '/api/payment',
} as const;

// Messages
export const MESSAGES = {
  SUCCESS: {
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    ITEM_ADDED_TO_CART: 'Item added to cart',
    ITEM_REMOVED_FROM_CART: 'Item removed from cart',
  },
  ERROR: {
    PRODUCT_NOT_FOUND: 'Product not found',
    INVALID_INPUT: 'Invalid input provided',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    SERVER_ERROR: 'An error occurred. Please try again later.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
  },
} as const;
