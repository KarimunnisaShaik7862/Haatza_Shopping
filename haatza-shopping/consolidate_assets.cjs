const fs = require('fs');
const path = require('path');

const shoppingDir = __dirname;
const rootDir = path.resolve(__dirname, '..');
const targetImages = path.join(shoppingDir, 'public', 'images');
const rootImages = path.join(rootDir, 'public', 'images');

// 1. Ensure required subdirectories exist
const subdirs = [
  'banners',
  'categories',
  'top-categories',
  'mens-fashion',
  'mens-fashion/categories',
  'mens-fashion/trending',
  'womens-fashion',
  'store49',
  'products/store49',
  'promos',
  'promos/gallery',
  'brands',
  'shared'
];

[targetImages, rootImages].forEach(base => {
  subdirs.forEach(sd => {
    const p = path.join(base, sd);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  });
});

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
      console.error('Error copying ' + src + ' to ' + dest, e.message);
    }
  }
  return false;
}

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

console.log('--- Step 1: Consolidating from src/assets into public/images ---');
const srcAssets = path.join(shoppingDir, 'src', 'assets');
if (fs.existsSync(srcAssets)) {
  copyDirRecursive(path.join(srcAssets, 'images', 'banners'), path.join(targetImages, 'banners'));
  copyDirRecursive(path.join(srcAssets, 'images', 'mens-fashion'), path.join(targetImages, 'mens-fashion'));
  copyDirRecursive(path.join(srcAssets, 'images', 'store49'), path.join(targetImages, 'store49'));
  copyDirRecursive(path.join(srcAssets, 'images', 'store49'), path.join(targetImages, 'products', 'store49'));
  copyDirRecursive(path.join(srcAssets, 'images', 'womens-fashion'), path.join(targetImages, 'womens-fashion'));
  copyDirRecursive(path.join(srcAssets, 'promos'), path.join(targetImages, 'promos'));
}

console.log('--- Step 2: Consolidating from root assets/ into public/images ---');
const rootAssets = path.join(shoppingDir, 'assets');
if (fs.existsSync(rootAssets)) {
  copyDirRecursive(path.join(rootAssets, 'images', 'home'), path.join(targetImages, 'banners'));
  copyDirRecursive(path.join(rootAssets, 'images', 'men-fashion'), path.join(targetImages, 'mens-fashion'));
  copyDirRecursive(path.join(rootAssets, 'images', 'store49'), path.join(targetImages, 'store49'));
  copyDirRecursive(path.join(rootAssets, 'images', 'store49'), path.join(targetImages, 'products', 'store49'));
  copyDirRecursive(path.join(rootAssets, 'images', 'women-fashion'), path.join(targetImages, 'womens-fashion'));
  copyDirRecursive(path.join(rootAssets, 'images', 'shared'), path.join(targetImages, 'shared'));
}

console.log('--- Step 3: Consolidating from public/assets into public/images ---');
const publicAssets = path.join(shoppingDir, 'public', 'assets');
if (fs.existsSync(publicAssets)) {
  copyDirRecursive(path.join(publicAssets, 'promos'), path.join(targetImages, 'promos'));
  copyDirRecursive(path.join(publicAssets, 'images', 'mens-fashion'), path.join(targetImages, 'mens-fashion'));
  copyDirRecursive(path.join(publicAssets, 'images', "men's fashion"), path.join(targetImages, 'mens-fashion'));
}

console.log('--- Step 4: Ensuring specific banner placement ---');
copyFileSafe(path.join(shoppingDir, 'public', 'images', 'premium-mens-fashion-style-banner.png'), path.join(targetImages, 'mens-fashion', 'premium-mens-fashion-style-banner.png'));
copyFileSafe(path.join(shoppingDir, 'public', 'images', 'Premium Men’s Fashion Banner.png'), path.join(targetImages, 'mens-fashion', 'premium-mens-fashion-banner.png'));
copyFileSafe(path.join(shoppingDir, 'public', 'images', 'Premium Men’s Fashion Banner.png'), path.join(targetImages, 'mens-fashion', 'Premium Men’s Fashion Banner.png'));
copyFileSafe(path.join(shoppingDir, 'public', 'images', 'banners', '49-store1.png'), path.join(targetImages, 'banners', '49-store1.png'));

console.log('--- Step 5: Mirroring public/images to root project public/images ---');
copyDirRecursive(targetImages, rootImages);

console.log('--- Step 6: Verifying essential files exist in targetImages ---');
const essentials = [
  'banners/home-page-girl.png',
  'banners/glossy-blue-super-savings-banner.png',
  'banners/49-store1.png',
  'store49/shirt.png',
  'store49/sunglasses.png',
  'store49/sneakers.png',
  'mens-fashion/premium-mens-fashion-style-banner.png',
  'mens-fashion/categories/clothing-circle.jpg',
  'womens-fashion/hero-banner.png',
  'promos/gallery/ghost-mannequin-kurta.png',
  'promos/gallery/floating-designer-sunglasses.png'
];

let allExist = true;
essentials.forEach(rel => {
  const p = path.join(targetImages, rel);
  const exists = fs.existsSync(p);
  console.log(`Checking ${rel}: ${exists ? 'OK' : 'MISSING'}`);
  if (!exists) allExist = false;
});

if (!allExist) {
  console.error('WARNING: Some essential files were not found! Will not delete duplicate folders.');
  process.exit(1);
}

console.log('--- Step 7: Cleaning up the 3 duplicate asset directories ---');
function removeDirRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Removed: ${dirPath}`);
  }
}

// 1. Remove haatza-shopping/assets/
removeDirRecursive(rootAssets);
// 2. Remove haatza-shopping/public/assets/
removeDirRecursive(publicAssets);
// 3. Remove haatza-shopping/src/assets/
removeDirRecursive(srcAssets);

// Clean loose root banner copies in public/images if they exist
const loose1 = path.join(shoppingDir, 'public', 'images', 'premium-mens-fashion-style-banner.png');
const loose2 = path.join(shoppingDir, 'public', 'images', 'Premium Men’s Fashion Banner.png');
if (fs.existsSync(loose1)) fs.unlinkSync(loose1);
if (fs.existsSync(loose2)) fs.unlinkSync(loose2);

console.log('\n============================================================');
console.log('SUCCESS: All media consolidated into single public/images/ folder!');
console.log('The 3 duplicate folders (assets/, public/assets/, src/assets/) have been deleted.');
console.log('============================================================\n');

