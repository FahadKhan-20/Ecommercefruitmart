export interface Product {
  id: string;
  name: string;
  category: 'Fruits' | 'Vegetables';
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  image: string;
  description: string;
  rating?: number;
}

export const products: Product[] = [
  // ==================== FRUITS (10 products) ====================
  {
    name: 'Red Apples',
    category: 'Fruits',
    price: 120,
    originalPrice: 150,
    unit: 'kg',
    stock: 150,
    image: '/images/products/apples.jpg',
    description: 'Fresh, crisp red apples sourced directly from farms. Rich in fiber and vitamin C.',
  },
  {
    name: 'Bananas',
    category: 'Fruits',
    price: 50,
    unit: 'dozen',
    stock: 200,
    image: '/images/products/bananas.png',
    description: 'Bright yellow bananas, perfectly ripe. High in potassium and natural sugars.',
  },
  {
    name: 'Mangoes',
    category: 'Fruits',
    price: 150,
    originalPrice: 180,
    unit: 'kg',
    stock: 100,
    image: '/images/products/mangoes.jpg',
    description: 'Golden mangoes, the king of fruits. Seasonal specialty with sweet, juicy flesh.',
  },
  {
    name: 'Oranges',
    category: 'Fruits',
    price: 80,
    unit: 'kg',
    stock: 120,
    image: '/images/products/oranges.jpg',
    description: 'Juicy, sweet oranges packed with vitamin C. Great for fresh juice or eating whole.',
  },
  {
    name: 'Strawberries',
    category: 'Fruits',
    price: 180,
    originalPrice: 220,
    unit: 'box',
    stock: 60,
    image: '/images/products/strawberries.jpg',
    description: 'Fresh, red strawberries with natural sweetness. Rich in vitamin C and antioxidants.',
  },
  {
    name: 'Green Grapes',
    category: 'Fruits',
    price: 150,
    unit: 'kg',
    stock: 80,
    image: '/images/products/green-grapes.png',
    description: 'Crisp, seedless green grapes. Sweet and refreshing. Perfect for snacking or desserts.',
  },
  {
    name: 'Watermelon',
    category: 'Fruits',
    price: 40,
    unit: 'piece',
    stock: 110,
    image: '/images/products/watermelon.png',
    description: 'Large, sweet watermelons. 92% water content, perfect for hydration in summer.',
  },
  {
    name: 'Papaya',
    category: 'Fruits',
    price: 60,
    unit: 'piece',
    stock: 90,
    image: '/images/products/papaya.jpg',
    description: 'Golden, sweet papayas. Aids digestion with natural enzymes. Rich in vitamin A and C.',
  },
  {
    name: 'Pineapple',
    category: 'Fruits',
    price: 70,
    originalPrice: 90,
    unit: 'piece',
    stock: 75,
    image: '/images/products/pineapple.jpg',
    description: 'Fresh, juicy pineapples with natural sweetness. High in vitamin C and bromelain.',
  },
  {
    name: 'Pomegranate',
    category: 'Fruits',
    price: 180,
    unit: 'piece',
    stock: 50,
    image: '/images/products/pomegranate.png',
    description: 'Ruby red pomegranates, full of antioxidants. Packed with arils. Premium quality fruit.',
  },

  // ==================== VEGETABLES (10 products) ====================
  {
    name: 'Tomato',
    category: 'Vegetables',
    price: 48,
    originalPrice: 60,
    unit: 'kg',
    stock: 220,
    image: '/images/products/tomatoes.jpg',
    description: 'Fresh red tomatoes, juicy and flavorful. Essential for Indian cooking. Rich in lycopene.',
  },
  {
    name: 'Potato',
    category: 'Vegetables',
    price: 25,
    unit: 'kg',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    description: 'Starchy potatoes, versatile staple vegetable. Perfect for cooking, frying, boiling.',
  },
  {
    name: 'Onion',
    category: 'Vegetables',
    price: 70,
    unit: 'kg',
    stock: 250,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop',
    description: 'Fresh red onions with strong flavor. Essential for Indian cooking. Long storage life.',
  },
  {
    name: 'Spinach',
    category: 'Vegetables',
    price: 35,
    unit: 'bunch',
    stock: 140,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    description: 'Fresh green spinach, nutrient-dense leafy green. Rich in iron and calcium.',
  },
  {
    name: 'Carrot',
    category: 'Vegetables',
    price: 45,
    originalPrice: 55,
    unit: 'kg',
    stock: 180,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
    description: 'Bright orange carrots, sweet and crunchy. High in beta-carotene. Great for eyes and skin.',
  },
  {
    name: 'Capsicum',
    category: 'Vegetables',
    price: 45,
    unit: 'kg',
    stock: 140,
    image: '/images/products/capsicum.jpg',
    description: 'Colorful bell peppers (green). Sweet and crunchy. Great for salads and cooking.',
  },
  {
    name: 'Cauliflower',
    category: 'Vegetables',
    price: 40,
    unit: 'piece',
    stock: 90,
    image: '/images/products/cauliflower.jpg',
    description: 'Fresh cauliflower head, white and dense. Low carb, keto-friendly. Great roasted or curried.',
  },
  {
    name: 'Broccoli',
    category: 'Vegetables',
    price: 55,
    originalPrice: 70,
    unit: 'piece',
    stock: 70,
    image: '/images/products/broccoli.png',
    description: 'Fresh, green broccoli crowns. Nutrient-dense superfood. Great for immunity and health.',
  },
  {
    name: 'Cucumber',
    category: 'Vegetables',
    price: 35,
    unit: 'kg',
    stock: 130,
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop',
    description: 'Cool, refreshing cucumbers. Mostly water, hydrating vegetable. Perfect for salads and pickles.',
  },
  {
    name: 'Green Chilli',
    category: 'Vegetables',
    price: 83,
    unit: 'kg',
    stock: 85,
    image: '/images/products/green-chilli.jpg',
    description: 'Spicy green chillies, sharp heat. Essential for Indian cooking. High in vitamin C.',
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find((p) => p.id === id);
};
