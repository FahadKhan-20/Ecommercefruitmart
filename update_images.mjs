import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'lib/data/products.ts');

let content = fs.readFileSync(dataFilePath, 'utf8');

const imageMap = {
  'red-apples.jpg': 'https://images.unsplash.com/photo-1560806887-1295cbd3d3a4?w=400&h=400&fit=crop',
  'bananas.jpg': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
  'mangoes.jpg': 'https://images.unsplash.com/photo-1585518419759-a700ae40dd80?w=400&h=400&fit=crop',
  'oranges.jpg': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd62a21?w=400&h=400&fit=crop',
  'green-grapes.jpg': 'https://images.unsplash.com/photo-1582471884882-a66b2f39e6b0?w=400&h=400&fit=crop',
  'strawberries.jpg': 'https://images.unsplash.com/photo-1587393855258-915a805db633?w=400&h=400&fit=crop',
  'papaya.jpg': 'https://images.unsplash.com/photo-1617112848923-cc229005e2d0?w=400&h=400&fit=crop',
  'pineapple.jpg': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop',
  'watermelon.jpg': 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&h=400&fit=crop',
  'guava.jpg': 'https://images.unsplash.com/photo-1619421867175-9c5c165dcfd2?w=400&h=400&fit=crop',
  'pomegranate.jpg': 'https://images.unsplash.com/photo-1615486171448-4fd1eb95627f?w=400&h=400&fit=crop',
  'kiwi.jpg': 'https://images.unsplash.com/photo-1585059895524-72359e06138a?w=400&h=400&fit=crop',
  'lemon.jpg': 'https://images.unsplash.com/photo-1590502593747-42298799482c?w=400&h=400&fit=crop',
  'coconut.jpg': 'https://images.unsplash.com/photo-1600863953573-0498ec5b8cf0?w=400&h=400&fit=crop',

  'spinach.jpg': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
  'kale.jpg': 'https://images.unsplash.com/photo-1602154563968-3e5f412da365?w=400&h=400&fit=crop',
  'lettuce.jpg': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop',
  'coriander.jpg': 'https://images.unsplash.com/photo-1628790076046-5e580e0c062c?w=400&h=400&fit=crop',
  'mint.jpg': 'https://images.unsplash.com/photo-1550005705-24ce4cda5346?w=400&h=400&fit=crop',
  'fenugreek.jpg': 'https://images.unsplash.com/photo-1589153576007-cd0d366a6a12?w=400&h=400&fit=crop',
  'parsley.jpg': 'https://images.unsplash.com/photo-1625904835711-0eb1a742b78b?w=400&h=400&fit=crop',
  'amaranth.jpg': 'https://images.unsplash.com/photo-1608628004529-679df30fbab2?w=400&h=400&fit=crop',
  'curry-leaves.jpg': 'https://images.unsplash.com/photo-1606558452331-59114f76cc3c?w=400&h=400&fit=crop',

  'potato.jpg': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
  'onion.jpg': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop',
  'garlic.jpg': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
  'beetroot.jpg': 'https://images.unsplash.com/photo-1593265084931-1e967a5b3997?w=400&h=400&fit=crop',
  'carrot.jpg': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
  'ginger.jpg': 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&h=400&fit=crop',
  'radish.jpg': 'https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=400&h=400&fit=crop',
  'sweet-potato.jpg': 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400&h=400&fit=crop',

  'tomato.jpg': 'https://images.unsplash.com/photo-1592841494894-4012acf00a2a?w=400&h=400&fit=crop',
  'capsicum.jpg': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=400&fit=crop',
  'green-beans.jpg': 'https://images.unsplash.com/photo-1567345638290-7d7b1a2f6fb4?w=400&h=400&fit=crop',
  'cauliflower.jpg': 'https://images.unsplash.com/photo-1568584711075-3d68fe50cbdb?w=400&h=400&fit=crop',
  'broccoli.jpg': 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop',
  'cucumber.jpg': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop',
  'zucchini.jpg': 'https://images.unsplash.com/photo-1621111626040-3ab609a47dd1?w=400&h=400&fit=crop',
  'cabbage.jpg': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop',
  'green-chilli.jpg': 'https://images.unsplash.com/photo-1588123190131-1c3fac394f4b?w=400&h=400&fit=crop',
};

// Generic replacement for any /images/products/ path
content = content.replace(/image:\s*'\/images\/products\/(.*?)\/(.*?)'/g, (match, folder, filename) => {
  if (imageMap[filename]) {
    return `image: '${imageMap[filename]}'`;
  }
  return `image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop'`; // generic fallback
});

fs.writeFileSync(dataFilePath, content);
console.log('Images updated successfully');
