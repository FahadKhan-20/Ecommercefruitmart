const fs = require('fs');
let content = fs.readFileSync('lib/products.ts', 'utf8');
content = content.replace(/\s*id:\s*['"][^'"]+['"],/g, '');
fs.writeFileSync('lib/products.ts', content);
console.log('Removed IDs from products.ts');
