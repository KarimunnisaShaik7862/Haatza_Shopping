const fs = require('fs');
const path = require('path');

const shoppingDir = __dirname;
const shoppingPublic = path.join(shoppingDir, 'public');
const shoppingAssets = path.join(shoppingDir, 'assets');
const shoppingAssetsImages = path.join(shoppingAssets, 'images');

// 1. Target folders for haatza-shopping/assets/images/
const requiredCategories = [
  'home',
  'men-fashion',
  'women-fashion',
  'kids-fashion',
  'jewellery',
  'electronics',
  'beauty',
  'footwear',
  'banners',
  'products',
  'shared'
];

// Ensure all category directories exist
requiredCategories.forEach(cat => {
  const dirPath = path.join(shoppingAssetsImages, cat);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created: assets/images/${cat}/`);
  }
});

// Helper to copy file safely
function copyFileSafe(src, dest) {
  if (fs.existsSync(src)) {
    try {
      const stat = fs.statSync(src);
      if (stat.isFile()) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
        return true;
      }
    } catch (e) {
      console.error(`Error copying ${src}:`, e.message);
    }
  }
  return false;
}

// Helper to copy directory contents recursively
function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  const items = fs.readdirSync(srcDir);
  items.forEach(item => {
    const sPath = path.join(srcDir, item);
    const dPath = path.join(destDir, item);
    const stat = fs.statSync(sPath);
    if (stat.isDirectory()) {
      if (!fs.existsSync(dPath)) fs.mkdirSync(dPath, { recursive: true });
      copyDirRecursive(sPath, dPath);
    } else if (stat.isFile()) {
      fs.copyFileSync(sPath, dPath);
    }
  });
}

console.log('--- Step 1: Populating assets/images/ from public/images/ ---');
const publicImages = path.join(shoppingPublic, 'images');

if (fs.existsSync(publicImages)) {
  // 1. Banners -> assets/images/banners & assets/images/home
  const bannersDir = path.join(publicImages, 'banners');
  if (fs.existsSync(bannersDir)) {
    copyDirRecursive(bannersDir, path.join(shoppingAssetsImages, 'banners'));
    copyDirRecursive(bannersDir, path.join(shoppingAssetsImages, 'home'));
  }

  // 2. Men's Fashion -> assets/images/men-fashion
  const mensDir = path.join(publicImages, 'mens-fashion');
  if (fs.existsSync(mensDir)) {
    copyDirRecursive(mensDir, path.join(shoppingAssetsImages, 'men-fashion'));
  }

  // 3. Women's Fashion -> assets/images/women-fashion
  const womensDir = path.join(publicImages, 'womens-fashion');
  if (fs.existsSync(womensDir)) {
    copyDirRecursive(womensDir, path.join(shoppingAssetsImages, 'women-fashion'));
  }

  // 4. Products & store49 -> assets/images/products
  const productsDir = path.join(publicImages, 'products');
  if (fs.existsSync(productsDir)) {
    copyDirRecursive(productsDir, path.join(shoppingAssetsImages, 'products'));
  }
  const store49Dir = path.join(publicImages, 'store49');
  if (fs.existsSync(store49Dir)) {
    copyDirRecursive(store49Dir, path.join(shoppingAssetsImages, 'products', 'store49'));
    // Also place footwear (sneakers) into footwear
    copyFileSafe(path.join(store49Dir, 'sneakers.png'), path.join(shoppingAssetsImages, 'footwear', 'sneakers.png'));
  }

  // 5. Categories -> distribute to categories
  const categoriesDir = path.join(publicImages, 'categories');
  if (fs.existsSync(categoriesDir)) {
    copyDirRecursive(categoriesDir, path.join(shoppingAssetsImages, 'shared', 'categories'));
  }

  // 6. Promos / Gallery -> jewellery, beauty, shared
  const promosDir = path.join(publicImages, 'promos', 'gallery');
  if (fs.existsSync(promosDir)) {
    copyFileSafe(path.join(promosDir, 'floating-luxury-handbag.png'), path.join(shoppingAssetsImages, 'women-fashion', 'floating-luxury-handbag.png'));
    copyFileSafe(path.join(promosDir, 'floating-designer-sunglasses.png'), path.join(shoppingAssetsImages, 'jewellery', 'floating-designer-sunglasses.png'));
    copyFileSafe(path.join(promosDir, 'floating-skincare-serum.png'), path.join(shoppingAssetsImages, 'beauty', 'floating-skincare-serum.png'));
    copyFileSafe(path.join(promosDir, 'floating-chronograph-watch.png'), path.join(shoppingAssetsImages, 'electronics', 'floating-chronograph-watch.png'));
    copyFileSafe(path.join(promosDir, 'ghost-mannequin-blazer.png'), path.join(shoppingAssetsImages, 'men-fashion', 'ghost-mannequin-blazer.png'));
    copyFileSafe(path.join(promosDir, 'ghost-mannequin-kurta.png'), path.join(shoppingAssetsImages, 'women-fashion', 'ghost-mannequin-kurta.png'));
  }

  // 7. Kids category
  const kidsCircle = path.join(publicImages, 'mens-fashion', 'categories', 'kids-wear-circle.jpg');
  if (fs.existsSync(kidsCircle)) {
    copyFileSafe(kidsCircle, path.join(shoppingAssetsImages, 'kids-fashion', 'kids-wear-circle.jpg'));
  }

  // 8. Jewellery
  const jewelryCircle = path.join(publicImages, 'mens-fashion', 'categories', 'jewelry-circle.jpg');
  if (fs.existsSync(jewelryCircle)) {
    copyFileSafe(jewelryCircle, path.join(shoppingAssetsImages, 'jewellery', 'jewelry-circle.jpg'));
  }

  // 9. Footwear
  const footwearCircle = path.join(publicImages, 'mens-fashion', 'categories', 'footwear-circle.jpg');
  if (fs.existsSync(footwearCircle)) {
    copyFileSafe(footwearCircle, path.join(shoppingAssetsImages, 'footwear', 'footwear-circle.jpg'));
  }

  // 10. Brands & Shared
  const brandsDir = path.join(publicImages, 'brands');
  if (fs.existsSync(brandsDir)) {
    copyDirRecursive(brandsDir, path.join(shoppingAssetsImages, 'shared', 'brands'));
  }
}

console.log('--- Step 2: Verifying Haatza Shopping Public Directory ---');
// Ensure public/icons, public/images, public/favicon.svg, public/icons.svg exist
['icons', 'images'].forEach(dir => {
  const p = path.join(shoppingPublic, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

console.log('\n=============================================================');
console.log('HAATZA SHOPPING ASSETS & PUBLIC STRUCTURE VERIFIED AND READY!');
console.log('=============================================================\n');
requiredCategories.forEach(cat => {
  const p = path.join(shoppingAssetsImages, cat);
  const count = fs.existsSync(p) ? fs.readdirSync(p).length : 0;
  console.log(`- assets/images/${cat}/ (${count} items)`);
});
console.log(`- public/images/ (${fs.existsSync(publicImages) ? fs.readdirSync(publicImages).length : 0} items)`);
console.log(`- public/icons/ (${fs.existsSync(path.join(shoppingPublic, 'icons')) ? fs.readdirSync(path.join(shoppingPublic, 'icons')).length : 0} items)`);
console.log(`- public/favicon.svg: ${fs.existsSync(path.join(shoppingPublic, 'favicon.svg')) ? 'OK' : 'MISSING'}`);
console.log(`- public/icons.svg: ${fs.existsSync(path.join(shoppingPublic, 'icons.svg')) ? 'OK' : 'MISSING'}`);
console.log('=============================================================\n');

