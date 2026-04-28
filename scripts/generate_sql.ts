import { products } from '../lib/products';
import fs from 'fs';

let sql = 'INSERT INTO public.products (name, category, price, unit, stock, image, description) VALUES\n';

const values = products.map((p) => {
  const escape = (str: string) => str.replace(/'/g, "''");
  return `('${escape(p.name)}', '${escape(p.category)}', ${p.price}, '${escape(p.unit)}', ${p.stock}, '${escape(p.image)}', '${escape(p.description)}')`;
});

sql += values.join(',\n') + ';';

fs.writeFileSync('supabase/insert_products.sql', sql);
console.log('SQL file generated at supabase/insert_products.sql without ids');
