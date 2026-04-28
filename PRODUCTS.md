# Product Data Structure Documentation

## Overview
Production-ready product database with 40 fruits and vegetables from Bengaluru market, organized by category with realistic pricing and comprehensive metadata.

## Product Count by Category
- **Fruits**: 14 products
- **Leafy Vegetables**: 9 products  
- **Root Vegetables**: 8 products
- **Daily Vegetables**: 9 products
- **Total**: 40 products

## File Structure
```
types/
├── product.ts       # Product interfaces and types
└── api.ts          # Common API response types

lib/
├── data/
│   └── products.ts  # Product data (40 items) + utility functions
└── constants.ts    # App-wide constants and configuration
```

## Product Data Structure

Each product contains the following fields:

```typescript
{
  id: string;              // Unique identifier (e.g., 'fruit-001')
  name: string;            // Product name
  category: ProductCategory; // One of 4 categories
  price: number;           // Current INR price (editable from admin)
  originalPrice?: number;  // Original price for showing discounts
  unit: ProductUnit;       // kg, piece, bunch, dozen, litre
  stock: number;          // Available quantity
  image: string;          // Path to product image
  description: string;    // Detailed product description
  rating?: number;        // Rating out of 5 (0-5)
  reviews?: number;       // Number of customer reviews
  tags?: string[];        // Search/filtering tags
  isFeatured?: boolean;   // Show on homepage
  benefits?: string[];    // Health benefits list
}
```

## Sample Products

### Fruits (14)
| Name | Price | Unit | Stock | Featured |
|------|-------|------|-------|----------|
| Red Apples | ₹120 | kg | 150 | ✓ |
| Bananas | ₹50 | dozen | 200 | ✓ |
| Mangoes | ₹150 | kg | 100 | ✓ |
| Oranges | ₹80 | kg | 120 | ✓ |
| Grapes (Green) | ₹150 | kg | 80 | - |
| Strawberries | ₹180 | kg | 60 | ✓ |
| Papaya | ₹60 | piece | 90 | - |
| Pineapple | ₹70 | piece | 75 | - |
| Watermelon | ₹40 | piece | 110 | ✓ |
| Guava | ₹55 | kg | 85 | - |
| Pomegranate | ₹180 | piece | 50 | ✓ |
| Kiwi | ₹140 | kg | 45 | - |
| Lemon | ₹90 | kg | 130 | - |
| Coconut (Dry) | ₹30 | piece | 75 | - |

### Leafy Vegetables (9)
| Name | Price | Unit | Stock |
|------|-------|------|-------|
| Spinach | ₹35 | bunch | 140 |
| Kale | ₹45 | kg | 60 |
| Lettuce | ₹40 | bunch | 100 |
| Coriander Leaves | ₹25 | bunch | 120 |
| Mint Leaves | ₹20 | bunch | 110 |
| Fenugreek Leaves (Methi) | ₹30 | bunch | 85 |
| Parsley | ₹35 | bunch | 70 |
| Amaranth Leaves (Chaulai) | ₹28 | bunch | 90 |
| Curry Leaves | ₹32 | bunch | 100 |

### Root Vegetables (8)
| Name | Price | Unit | Stock | Featured |
|------|-------|------|-------|----------|
| Potato | ₹25 | kg | 300 | ✓ |
| Onion | ₹70 | kg | 250 | ✓ |
| Garlic (Bulk) | ₹167 | kg | 100 | - |
| Beetroot | ₹65 | kg | 110 | - |
| Carrot | ₹45 | kg | 180 | ✓ |
| Ginger | ₹110 | kg | 95 | - |
| Radish | ₹40 | kg | 95 | - |
| Sweet Potato | ₹50 | kg | 120 | - |

### Daily Vegetables (9)
| Name | Price | Unit | Stock | Featured |
|------|-------|------|-------|----------|
| Tomato | ₹48 | kg | 220 | ✓ |
| Capsicum (Bell Pepper) | ₹45 | kg | 140 | - |
| Green Beans | ₹60 | kg | 100 | - |
| Cauliflower | ₹40 | piece | 90 | ✓ |
| Broccoli | ₹55 | piece | 70 | - |
| Cucumber | ₹35 | kg | 130 | - |
| Zucchini | ₹50 | kg | 80 | - |
| Cabbage | ₹30 | kg | 160 | - |
| Green Chilli | ₹83 | kg | 85 | - |

## Pricing Strategy

### Real Bengaluru Market Prices (April 2026)
- **Premium fruits**: ₹140-200 (Mangoes, Pomegranate, Grapes, Strawberries)
- **Regular fruits**: ₹50-100 (Banana, Orange, Guava, Papaya, Pineapple)
- **Daily vegetables**: ₹25-83 (Potato, Onion, Tomato, Cauliflower, Cabbage)
- **Specialty vegetables**: ₹110-167 (Ginger, Garlic)

### Price Flexibility
- All prices are **editable from the Admin Dashboard**
- `originalPrice` field stores base price for discount calculations
- Supports simple discount badges (% off calculation)
- No hardcoded prices in component code

## Key Features

### 1. **Type Safety**
- Full TypeScript support with strict typing
- Interface-based product structure
- Branded types for category and unit validation

### 2. **SEO & Search Optimization**
- Each product has tags for filtering
- Search function includes name, description, category, and tags
- Benefits listed for health/nutritional queries

### 3. **Admin-Friendly**
- Price fields separate from static data
- Easy to update in admin dashboard
- Stock management ready
- Discount support via `originalPrice`

### 4. **Component Integration**
```typescript
// ProductCard component receives typed product
<ProductCard product={product} />

// List products by category
const vegetables = getProductsByCategory('Daily Vegetables');

// Search products
const results = searchProducts('tomato');

// Filter with options
const filtered = filterProducts({
  category: 'Fruits',
  minPrice: 50,
  maxPrice: 150,
  search: 'fresh'
});
```

### 5. **Featured Products**
- 10 products marked as featured for homepage
- Automatic featured products export: `FEATURED_PRODUCTS`
- Mix across all categories

### 6. **Utility Functions**
```typescript
// Available helpers
- getProductsByCategory(category)
- getProductById(id)
- filterProducts(filters)
- searchProducts(query)
- FEATURED_PRODUCTS array
- CATEGORIES array
```

## Best Practices

### For Product Management
1. **Price Updates**: Update via admin dashboard → synced to database
2. **Inventory**: Stock field updated in real-time
3. **Discounts**: Set `originalPrice` when running promotions
4. **Featured**: Toggle `isFeatured` for homepage rotation

### For Development
1. Import types from `@/types/product`
2. Import utilities from `@/lib/data/products`
3. Use `PRODUCT_CATEGORIES` constant for category validation
4. Leverage TypeScript for type checking

### For Database Migration
When migrating to Supabase/Database:
1. Create `products` table matching `Product` interface
2. Add indexes on `category`, `name`, `tags`
3. Create composite index on `category` + `isFeatured`
4. Use this seed data for initial population

## Currency & Units

### Supported Units
- `kg` - Kilogram (weight)
- `piece` - Individual item
- `bunch` - Bundle (leafy vegetables)
- `dozen` - 12 pieces (bananas, eggs)
- `litre` - Volume

### Currency
- **Default**: INR (Indian Rupees)
- **Symbol**: ₹
- **Min Price**: ₹20
- **Max Price**: ₹500

## Image Organization

```
public/images/
├── products/
│   ├── fruits/
│   │   ├── red-apples.jpg
│   │   ├── bananas.jpg
│   │   └── ...
│   ├── leafy/
│   │   ├── spinach.jpg
│   │   └── ...
│   ├── root/
│   │   ├── potato.jpg
│   │   └── ...
│   └── daily/
│       ├── tomato.jpg
│       └── ...
├── categories/
├── hero/
└── placeholder.jpg
```

## Next Steps

1. **Database Setup**: Migrate seed data to Supabase
2. **Image Upload**: Add product images to `/public/images/products/`
3. **Admin Dashboard**: Create product CRUD interface
4. **API Routes**: Implement `/api/products` endpoints
5. **ProductCard Component**: Build reusable product display
6. **Product Listing Page**: Use filtering and search utilities

---

**Last Updated**: April 27, 2026  
**Total Products**: 40  
**Categories**: 4  
**Featured**: 10
