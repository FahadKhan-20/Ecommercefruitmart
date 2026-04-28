import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Define products directly here since we can't easily import a .ts file in a node script without tsx setup
const products = [
  { id: 'fruit-001', name: 'Red Apples', category: 'Fruits', price: 120, originalPrice: 150, unit: 'kg', stock: 150, image: '/images/products/apples.jpg', description: 'Fresh, crisp red apples sourced directly from farms. Rich in fiber and vitamin C.' },
  { id: 'fruit-002', name: 'Alphonso Mangoes', category: 'Fruits', price: 250, originalPrice: 300, unit: 'dozen', stock: 50, image: '/images/products/mangoes.png', description: 'Premium Alphonso mangoes, known as the king of fruits. Sweet, juicy, and rich in flavor.' },
  { id: 'fruit-003', name: 'Nagpur Oranges', category: 'Fruits', price: 90, originalPrice: 120, unit: 'kg', stock: 100, image: '/images/products/oranges.jpg', description: 'Tangy and sweet Nagpur oranges. Excellent source of Vitamin C. Perfect for fresh juice.' },
  { id: 'fruit-004', name: 'Fresh Strawberries', category: 'Fruits', price: 180, originalPrice: 220, unit: 'box (200g)', stock: 40, image: '/images/products/strawberries.jpg', description: 'Plump, juicy red strawberries. Perfect for desserts, smoothies, or eating fresh.' },
  { id: 'fruit-005', name: 'Green Grapes', category: 'Fruits', price: 110, originalPrice: 140, unit: 'kg', stock: 80, image: '/images/products/greengrapes.png', description: 'Sweet and seedless green grapes. A perfect healthy snack.' },
  { id: 'fruit-006', name: 'Watermelon', category: 'Fruits', price: 45, originalPrice: 60, unit: 'pc', stock: 60, image: '/images/products/watermelon.png', description: 'Large, sweet watermelon. Perfect summer cooler, high in hydration.' },
  { id: 'fruit-007', name: 'Papaya', category: 'Fruits', price: 55, originalPrice: 75, unit: 'pc', stock: 75, image: '/images/products/papaya.png', description: 'Ripe, sweet papaya. Excellent for digestion and skin health.' },
  { id: 'fruit-008', name: 'Pineapple', category: 'Fruits', price: 85, originalPrice: 110, unit: 'pc', stock: 45, image: '/images/products/pineapple.png', description: 'Sweet and tangy pineapple. Great for immunity and digestion.' },
  { id: 'fruit-009', name: 'Pomegranate', category: 'Fruits', price: 160, originalPrice: 200, unit: 'kg', stock: 55, image: '/images/products/pomegranate.png', description: 'Ruby red pomegranates loaded with antioxidants and nutrients.' },
  { id: 'veg-001', name: 'Tomatoes', category: 'Vegetables', price: 40, unit: 'kg', stock: 200, image: '/images/products/tomatoes.png', description: 'Fresh, firm red tomatoes. Essential for curries and salads.' },
  { id: 'veg-002', name: 'Onion', category: 'Vegetables', price: 35, unit: 'kg', stock: 300, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop', description: 'Dry red onions. A staple ingredient in almost every Indian dish.' },
  { id: 'veg-003', name: 'Potato', category: 'Vegetables', price: 30, unit: 'kg', stock: 250, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop', description: 'Versatile potatoes. Perfect for baking, frying, or boiling.' },
  { id: 'veg-004', name: 'Carrot', category: 'Vegetables', price: 60, unit: 'kg', stock: 100, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop', description: 'Crunchy, sweet carrots. Great for salads, curries, and juices.' },
  { id: 'veg-005', name: 'Spinach', category: 'Vegetables', price: 25, unit: 'bunch', stock: 80, image: '/images/products/spinach.png', description: 'Fresh leafy spinach. High in iron and essential vitamins.' },
  { id: 'veg-006', name: 'Capsicum', category: 'Vegetables', price: 70, unit: 'kg', stock: 90, image: '/images/products/capsicum.png', description: 'Crisp green capsicum. Adds crunch and flavor to stir-fries and curries.' },
  { id: 'veg-007', name: 'Cauliflower', category: 'Vegetables', price: 45, unit: 'pc', stock: 65, image: '/images/products/cauliflower.png', description: 'Fresh, white cauliflower head. Versatile and low-carb vegetable.' },
  { id: 'veg-008', name: 'Broccoli', category: 'Vegetables', price: 120, unit: 'kg', stock: 70, image: '/images/products/broccoli.png', description: 'Fresh, green broccoli crowns. Nutrient-dense superfood. Great for immunity and health.' },
  { id: 'veg-009', name: 'Cucumber', category: 'Vegetables', price: 35, unit: 'kg', stock: 130, image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop', description: 'Cool, refreshing cucumbers. Mostly water, hydrating vegetable. Perfect for salads and pickles.' },
  { id: 'veg-010', name: 'Green Chilli', category: 'Vegetables', price: 83, unit: 'kg', stock: 85, image: '/images/products/green-chilli.jpg', description: 'Spicy green chillies, sharp heat. Essential for Indian cooking. High in vitamin C.' }
];

async function seedProducts() {
  console.log('Seeding products to Supabase...');
  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const { name, category, price, unit, stock, image, description } = product;
    
    // Map to snake_case for Supabase
    const dbProduct = {
      name,
      category,
      price,
      unit,
      stock,
      image,
      description
    };

    const { error } = await supabase
      .from('products')
      .upsert(dbProduct, { onConflict: 'name' });

    if (error) {
      console.error(`Error inserting ${name}:`, error.message);
      errorCount++;
    } else {
      console.log(`Inserted: ${name}`);
      successCount++;
    }
  }

  console.log('---');
  console.log(`Seeding complete. Success: ${successCount}, Errors: ${errorCount}`);
}

seedProducts();
