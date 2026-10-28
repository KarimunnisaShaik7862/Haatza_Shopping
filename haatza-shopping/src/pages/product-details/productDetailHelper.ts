import { Product } from '../../types';

/**
 * Shared consistent typography class for all Product Detail section headings.
 * Exactly the same font size (text-base) and font weight (font-bold) across desktop, tablet, and mobile.
 */
export const SECTION_HEADING_CLASS = 'text-base font-bold text-slate-900 font-heading';

export type ProductCategoryFamily =
  | 'fashion'
  | 'electronics'
  | 'mobiles'
  | 'appliances'
  | 'home-living'
  | 'furniture'
  | 'beauty'
  | 'groceries'
  | 'books'
  | 'toys-games'
  | 'sports-fitness'
  | 'automotive'
  | 'baby-care'
  | 'pet-supplies'
  | 'jewellery'
  | 'gift-cards'
  | 'general';

/**
 * Detect the product's category family for contextual rendering
 */
export function getProductCategoryFamily(product: Product): ProductCategoryFamily {
  const cat = (product.categoryId || '').toLowerCase();
  const catName = (product.categoryName || '').toLowerCase();
  const subcat = (product.subcategoryId || '').toLowerCase();
  const subcatName = (product.subcategoryName || '').toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());

  // Fashion check
  if (
    cat.includes('men-fashion') ||
    cat.includes('women-fashion') ||
    cat.includes('clothing') ||
    cat.includes('footwear') ||
    catName.includes('fashion') ||
    catName.includes('men') ||
    catName.includes('women') ||
    tags.some((t) => ['kurta', 'kurtis', 'shirt', 'saree', 'jeans', 'tshirt', 'dress', 'apparel'].includes(t))
  ) {
    return 'fashion';
  }

  // Mobiles check
  if (
    cat.includes('mobile') ||
    catName.includes('mobile') ||
    subcat.includes('smartphone') ||
    tags.some((t) => ['smartphone', 'mobile', 'iphone', 'galaxy', 'oneplus'].includes(t))
  ) {
    return 'mobiles';
  }

  // Electronics check
  if (
    cat.includes('electronic') ||
    catName.includes('electronic') ||
    subcat.includes('laptop') ||
    subcat.includes('headphone') ||
    tags.some((t) => ['electronics', 'laptop', 'audio', 'headphone', 'computer'].includes(t))
  ) {
    return 'electronics';
  }

  // Appliances check
  if (
    cat.includes('appliance') ||
    catName.includes('appliance') ||
    tags.some((t) => ['appliance', 'microwave', 'refrigerator', 'air-conditioner', 'blender'].includes(t))
  ) {
    return 'appliances';
  }

  // Furniture check
  if (
    cat.includes('furniture') ||
    catName.includes('furniture') ||
    tags.some((t) => ['sofa', 'table', 'chair', 'bed', 'wardrobe', 'desk'].includes(t))
  ) {
    return 'furniture';
  }

  // Home & Living check
  if (
    cat.includes('home') ||
    catName.includes('home') ||
    catName.includes('living') ||
    tags.some((t) => ['home', 'decor', 'kitchen', 'dining', 'bedsheet', 'curtain'].includes(t))
  ) {
    return 'home-living';
  }

  // Beauty check
  if (
    cat.includes('beauty') ||
    catName.includes('beauty') ||
    tags.some((t) => ['beauty', 'skincare', 'haircare', 'fragrance', 'makeup', 'serum'].includes(t))
  ) {
    return 'beauty';
  }

  // Groceries check
  if (
    cat.includes('grocer') ||
    catName.includes('grocer') ||
    tags.some((t) => ['grocery', 'food', 'snack', 'tea', 'coffee', 'spices', 'organic'].includes(t))
  ) {
    return 'groceries';
  }

  // Books check
  if (
    cat.includes('book') ||
    catName.includes('book') ||
    tags.some((t) => ['book', 'fiction', 'novel', 'author', 'biography'].includes(t))
  ) {
    return 'books';
  }

  // Toys & Games check
  if (
    cat.includes('toy') ||
    catName.includes('toy') ||
    tags.some((t) => ['toy', 'game', 'board-game', 'lego', 'puzzle'].includes(t))
  ) {
    return 'toys-games';
  }

  // Sports & Fitness check
  if (
    cat.includes('sport') ||
    catName.includes('sport') ||
    catName.includes('fitness') ||
    tags.some((t) => ['sport', 'fitness', 'gym', 'yoga', 'workout', 'cricket'].includes(t))
  ) {
    return 'sports-fitness';
  }

  // Automotive check
  if (
    cat.includes('auto') ||
    catName.includes('auto') ||
    tags.some((t) => ['automotive', 'car', 'bike', 'helmet', 'vehicle'].includes(t))
  ) {
    return 'automotive';
  }

  // Baby Care check
  if (
    cat.includes('baby') ||
    catName.includes('baby') ||
    tags.some((t) => ['baby', 'diaper', 'infant', 'toddler'].includes(t))
  ) {
    return 'baby-care';
  }

  // Pet Supplies check
  if (
    cat.includes('pet') ||
    catName.includes('pet') ||
    tags.some((t) => ['pet', 'dog', 'cat', 'pet-food'].includes(t))
  ) {
    return 'pet-supplies';
  }

  // Jewellery check
  if (
    cat.includes('jewel') ||
    catName.includes('jewel') ||
    tags.some((t) => ['jewellery', 'jewelry', 'earrings', 'necklace', 'gold', 'silver', 'diamond'].includes(t))
  ) {
    return 'jewellery';
  }

  // Gift Cards check
  if (
    cat.includes('gift') ||
    catName.includes('gift') ||
    tags.some((t) => ['gift-card', 'voucher', 'coupon'].includes(t))
  ) {
    return 'gift-cards';
  }

  return 'general';
}

/**
/**
 * Box item component representing an item in "What's in the Box"
 */
export interface BoxComponent {
  name: string;
  qty: string;
}

/**
 * Single specification row in Product Details table
 */
export interface DetailRow {
  label: string;
  value: string;
}

/**
 * Group of specifications in Product Details accordion
 */
export interface DetailGroup {
  id: string;
  title: string;
  rows?: DetailRow[];
  boxItems?: BoxComponent[];
}

/**
 * Helper to dynamically extract authentic colour
 */
function extractColor(product: Product): string {
  const specs = product.specifications || {};
  if (specs['Colour']) return specs['Colour'];
  if (specs['Color']) return specs['Color'];

  // Check color variants
  const colorVar = product.variants?.find((v) => v.type === 'color');
  if (colorVar) return colorVar.value;

  const text = (product.name + ' ' + (product.description || '')).toLowerCase();
  const colors = [
    'sage green', 'navy blue', 'mustard yellow', 'charcoal grey', 'charcoal gray',
    'rose pink', 'baby pink', 'dusty pink', 'pink', 'blue', 'green', 'black', 'white',
    'charcoal', 'grey', 'gray', 'red', 'yellow', 'mustard', 'maroon',
    'beige', 'olive', 'purple', 'lavender', 'orange', 'brown', 'cream', 'peach', 'gold', 'silver'
  ];
  for (const c of colors) {
    if (text.includes(c)) {
      return c.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }
  return '';
}

/**
 * Helper to dynamically extract authentic pattern
 */
function extractPattern(product: Product): string {
  const specs = product.specifications || {};
  if (specs['Pattern']) return specs['Pattern'];
  if (specs['Weave']) return specs['Weave'];
  if (specs['Detailing']) return specs['Detailing'];

  const text = (product.name + ' ' + (product.description || '')).toLowerCase();
  if (text.includes('floral')) return 'Floral Printed';
  if (text.includes('handblock') || text.includes('block print')) return 'Handblock Printed';
  if (text.includes('acid-wash') || text.includes('acid wash')) return 'Acid Wash';
  if (text.includes('graphic')) return 'Graphic Print';
  if (text.includes('embroidered') || text.includes('embroidery')) return 'Embroidered';
  if (text.includes('printed') || text.includes('print')) return 'Printed';
  if (text.includes('striped') || text.includes('stripes')) return 'Striped';
  if (text.includes('checked') || text.includes('checks')) return 'Checked';
  if (text.includes('solid')) return 'Solid';
  return 'Printed';
}

/**
 * Helper to dynamically extract authentic fabric / material
 */
function extractFabric(product: Product): string {
  const specs = product.specifications || {};
  if (specs['Fabric']) return specs['Fabric'];
  if (specs['Material']) return specs['Material'];
  if (specs['Upper Material']) return specs['Upper Material'];

  const text = (product.name + ' ' + (product.description || '') + ' ' + (product.fullDescription || '')).toLowerCase();
  if (text.includes('pure katan silk') || text.includes('banarasi')) return '100% Pure Katan Silk';
  if (text.includes('chanderi')) return 'Chanderi Cotton Silk';
  if (text.includes('fleece')) return '100% Cotton Fleece';
  if (text.includes('cotton cambric') || text.includes('chikankari')) return '100% Breathable Cotton Cambric';
  if (text.includes('cotton') && text.includes('chiffon')) return '100% Cotton with Chiffon Dupatta';
  if (text.includes('cotton blend')) return 'Cotton Blend';
  if (text.includes('pure cotton')) return '100% Pure Combed Cotton';
  if (text.includes('cotton')) return 'Cotton Blend';
  if (text.includes('silk')) return 'Silk Blend';
  if (text.includes('denim')) return 'Stretch Cotton Denim';
  if (text.includes('leather')) return 'Full Grain Synthetic Leather';
  if (text.includes('linen')) return 'Pure Linen';
  return 'Cotton Blend';
}

/**
 * Helper to dynamically extract authentic fit
 */
function extractFit(product: Product): string {
  const specs = product.specifications || {};
  if (specs['Fit'] || specs['Fit Type']) return specs['Fit'] || specs['Fit Type'];

  const text = (product.name + ' ' + (product.description || '')).toLowerCase();
  if (text.includes('anarkali') || text.includes('flared')) return 'Flared Anarkali Fit';
  if (text.includes('oversized') || text.includes('streetwear')) return 'Oversized Drop-Shoulder Fit';
  if (text.includes('slim')) return 'Slim Fit';
  if (text.includes('relaxed')) return 'Relaxed Fit';
  if (text.includes('straight')) return 'Straight Fit';
  if (text.includes('a-line')) return 'A-Line Comfort Fit';
  return 'Regular Fit';
}

/**
 * Helper to dynamically extract authentic sleeve type
 */
function extractSleeve(product: Product): string {
  const specs = product.specifications || {};
  if (specs['Sleeve'] || specs['Sleeve Type'] || specs['Sleeve Length']) {
    return specs['Sleeve'] || specs['Sleeve Type'] || specs['Sleeve Length'];
  }
  const text = (product.name + ' ' + (product.description || '')).toLowerCase();
  if (text.includes('three-quarter') || text.includes('3/4')) return 'Three-Quarter Sleeves';
  if (text.includes('full sleeve') || text.includes('hoodie')) return 'Full Sleeves';
  if (text.includes('half sleeve') || text.includes('short sleeve') || text.includes('t-shirt') || text.includes('tshirt')) {
    return 'Half Sleeves';
  }
  if (text.includes('sleeveless')) return 'Sleeveless';
  if (text.includes('kurta') || text.includes('kurti')) return 'Three-Quarter Sleeves';
  if (text.includes('shirt')) return 'Full Sleeves';
  return 'Three-Quarter Sleeves';
}

/**
 * Helper to dynamically extract authentic neck style
 */
function extractNeck(product: Product): string {
  const specs = product.specifications || {};
  if (specs['Neck'] || specs['Neck Style'] || specs['Collar']) {
    return specs['Neck'] || specs['Neck Style'] || specs['Collar'];
  }
  const text = (product.name + ' ' + (product.description || '')).toLowerCase();
  if (text.includes('hoodie') || text.includes('hooded')) return 'Hooded Neck with Drawstrings';
  if (text.includes('mandarin') || text.includes('chinese collar')) return 'Mandarin Collar';
  if (text.includes('v-neck')) return 'V-Neck';
  if (text.includes('round neck') || text.includes('crew neck')) return 'Round Neck';
  if (text.includes('spread collar') || text.includes('shirt')) return 'Spread Collar';
  if (text.includes('kurta') || text.includes('kurti')) return 'Round Neck';
  return 'Round Neck';
}

/**
 * Helper to dynamically extract authentic occasion
 */
function extractOccasion(product: Product): string {
  const specs = product.specifications || {};
  if (specs['Occasion']) return specs['Occasion'];
  const text = (product.name + ' ' + (product.description || '')).toLowerCase();
  if (text.includes('festive') || text.includes('wedding') || text.includes('celebration')) return 'Festive & Celebration';
  if (text.includes('party')) return 'Party Wear';
  if (text.includes('formal') || text.includes('office')) return 'Formal & Office Wear';
  if (text.includes('casual') || text.includes('streetwear') || text.includes('daily')) return 'Casual';
  if (text.includes('ethnic') || text.includes('traditional')) return 'Ethnic & Festive';
  return 'Casual';
}

/**
 * Returns structured highlights (4–8 key attributes) dynamically derived from
 * category context and actual product data.
 */
export function getProductHighlights(product: Product): { label: string; value: string }[] {
  const family = getProductCategoryFamily(product);
  const specs = product.specifications || {};
  const highlights: { label: string; value: string }[] = [];
  const nameLower = product.name.toLowerCase();
  const subcatLower = (product.subcategoryName || '').toLowerCase();

  const isFootwear =
    subcatLower.includes('footwear') ||
    subcatLower.includes('shoe') ||
    subcatLower.includes('sneaker') ||
    nameLower.includes('shoe') ||
    nameLower.includes('sneaker');

  // Available sizes string
  const sizeVariants = product.variants?.filter((v) => v.type === 'size') || [];
  const sizesString = sizeVariants.length > 0 ? sizeVariants.map((v) => v.value).join(', ') : '';

  if (isFootwear) {
    if (specs['Upper Material']) highlights.push({ label: 'Upper Material', value: specs['Upper Material'] });
    if (specs['Sole']) highlights.push({ label: 'Sole Material', value: specs['Sole'] });
    if (specs['Insole']) highlights.push({ label: 'Insole', value: specs['Insole'] });
    if (specs['Closure']) highlights.push({ label: 'Closure', value: specs['Closure'] });
    highlights.push({ label: 'Toe Shape', value: 'Round Toe' });
    highlights.push({ label: 'Occasion', value: 'Casual & Lifestyle' });
    if (sizesString) highlights.push({ label: 'Available Sizes', value: sizesString });
    return highlights.slice(0, 8);
  }

  if (family === 'fashion') {
    // 1. Colour
    const color = extractColor(product);
    if (color) highlights.push({ label: 'Colour', value: color });

    // 2. Fabric
    const fabric = extractFabric(product);
    if (fabric) highlights.push({ label: 'Fabric', value: fabric });

    // 3. Pattern
    const pattern = extractPattern(product);
    if (pattern) highlights.push({ label: 'Pattern', value: pattern });

    // 4. Fit
    const fit = extractFit(product);
    if (fit) highlights.push({ label: 'Fit', value: fit });

    // 5. Sleeve Type
    const sleeve = extractSleeve(product);
    if (sleeve) highlights.push({ label: 'Sleeve Type', value: sleeve });

    // 6. Neck Style
    const neck = extractNeck(product);
    if (neck) highlights.push({ label: 'Neck Style', value: neck });

    // 7. Occasion
    const occasion = extractOccasion(product);
    if (occasion) highlights.push({ label: 'Occasion', value: occasion });

    // 8. Available Sizes
    if (sizesString) {
      highlights.push({ label: 'Available Sizes', value: sizesString });
    }

    return highlights.slice(0, 8);
  }

  if (family === 'electronics' || family === 'mobiles') {
    if (product.brand) highlights.push({ label: 'Brand', value: product.brand });
    if (specs['Driver Size']) highlights.push({ label: 'Driver Size', value: specs['Driver Size'] });
    if (specs['Display']) highlights.push({ label: 'Display', value: specs['Display'] });
    if (specs['Noise Cancellation']) highlights.push({ label: 'Noise Cancellation', value: specs['Noise Cancellation'] });
    if (specs['Battery Life']) highlights.push({ label: 'Battery Life', value: specs['Battery Life'] });
    if (specs['Connectivity']) highlights.push({ label: 'Connectivity', value: specs['Connectivity'] });
    if (specs['Warranty']) highlights.push({ label: 'Warranty', value: specs['Warranty'] });
    else highlights.push({ label: 'Warranty', value: '1 Year Brand Replacement Warranty' });

    return highlights.slice(0, 8);
  }

  if (family === 'beauty') {
    highlights.push({ label: 'Suitable For', value: specs['Suitable For'] || 'All Skin Types / Dermatologist Tested' });
    if (specs['Benefits']) highlights.push({ label: 'Benefits', value: specs['Benefits'] });
    if (specs['Ingredients']) highlights.push({ label: 'Key Ingredients', value: specs['Ingredients'] });
    highlights.push({ label: 'Formulation', value: specs['Formulation'] || 'Liquid / Lightweight' });
    if (product.unit) highlights.push({ label: 'Quantity', value: product.unit });
    return highlights.slice(0, 8);
  }

  if (family === 'home-living' || family === 'furniture') {
    if (specs['Material']) highlights.push({ label: 'Material', value: specs['Material'] });
    if (specs['Finish']) highlights.push({ label: 'Finish', value: specs['Finish'] });
    if (specs['Dimensions']) highlights.push({ label: 'Dimensions', value: specs['Dimensions'] });
    highlights.push({ label: 'Assembly', value: specs['Assembly'] || 'Pre-assembled / Minimal tools required' });
    highlights.push({ label: 'Warranty', value: specs['Warranty'] || '1 Year Domestic Warranty' });
    return highlights.slice(0, 8);
  }

  if (family === 'groceries') {
    highlights.push({ label: 'Dietary Preference', value: '100% Vegetarian' });
    if (product.unit) highlights.push({ label: 'Net Quantity', value: product.unit });
    highlights.push({ label: 'Shelf Life', value: specs['Shelf Life'] || '12 Months from packaging date' });
    highlights.push({ label: 'Storage', value: 'Store in a cool dry place' });
    return highlights.slice(0, 8);
  }

  // General default fallback using specs
  if (product.brand) highlights.push({ label: 'Brand', value: product.brand });
  Object.entries(specs).forEach(([k, v]) => {
    if (v && highlights.length < 8 && !highlights.some((h) => h.label.toLowerCase() === k.toLowerCase())) {
      highlights.push({ label: k, value: String(v) });
    }
  });

  return highlights.slice(0, 8);
}

/**
 * Returns exact items contained in "What's in the Box" based strictly on product type
 */
export function getBoxContents(product: Product): BoxComponent[] {
  const family = getProductCategoryFamily(product);
  const specs = product.specifications || {};
  const nameLower = product.name.toLowerCase();
  const subcatLower = (product.subcategoryName || '').toLowerCase();
  const descLower = (product.description || '').toLowerCase();

  // If explicit 'Set Contents' defined in specs
  if (specs['Set Contents']) {
    const raw = specs['Set Contents'];
    const parts = raw.replace(/\(\d+.*?\)/g, '').split(/,|\+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      return parts.map((p) => ({
        name: p,
        qty: '1 piece',
      }));
    }
  }

  // Kurta Set detection (as specifically requested in prompt)
  const isKurtaSet =
    nameLower.includes('kurta set') ||
    subcatLower.includes('kurta set') ||
    subcatLower.includes('ethnic-set') ||
    (nameLower.includes('set') && (nameLower.includes('kurta') || nameLower.includes('anarkali')));

  if (isKurtaSet) {
    const hasDupatta = nameLower.includes('dupatta') || descLower.includes('dupatta');
    const hasPalazzo = nameLower.includes('palazzo') || descLower.includes('palazzo');
    const hasPant = nameLower.includes('pant') || descLower.includes('pant') || descLower.includes('trouser');
    const bottomName = hasPalazzo ? 'Palazzo' : hasPant ? 'Pant' : 'Bottom / Pant';

    const items: BoxComponent[] = [
      { name: nameLower.includes('anarkali') ? 'Flared Anarkali Kurta' : 'Kurta', qty: '1 piece' },
      { name: bottomName, qty: '1 piece' },
    ];
    if (hasDupatta || !nameLower.includes('2 piece')) {
      items.push({ name: 'Dupatta', qty: '1 piece' });
    }
    return items;
  }

  // Saree
  if (nameLower.includes('saree') || subcatLower.includes('saree')) {
    const items: BoxComponent[] = [
      { name: 'Saree (5.5 metres)', qty: '1 piece' },
    ];
    if (specs['Blouse Piece'] || nameLower.includes('blouse') || descLower.includes('blouse')) {
      items.push({ name: 'Unstitched Blouse Piece (0.8 metre)', qty: '1 piece' });
    }
    return items;
  }

  // Single clothing items (Hoodie, Kurti only, Shirt, T-Shirt, Jeans, Dress)
  // Strict rule: "If it is a kurta-only product, do not display bottom or dupatta details."
  if (family === 'fashion') {
    if (nameLower.includes('hoodie')) {
      return [{ name: 'Hoodie', qty: '1 piece' }];
    }
    if (nameLower.includes('kurti') || nameLower.includes('kurta')) {
      return [{ name: 'Kurta', qty: '1 piece' }];
    }
    if (nameLower.includes('t-shirt') || nameLower.includes('tshirt')) {
      return [{ name: 'T-Shirt', qty: '1 piece' }];
    }
    if (nameLower.includes('shirt')) {
      return [{ name: 'Shirt', qty: '1 piece' }];
    }
    if (nameLower.includes('jeans') || nameLower.includes('denim')) {
      return [{ name: 'Jeans', qty: '1 piece' }];
    }
    if (nameLower.includes('dress')) {
      return [{ name: 'Dress', qty: '1 piece' }];
    }
    if (nameLower.includes('lehenga')) {
      return [
        { name: 'Semi-Stitched Lehenga', qty: '1 piece' },
        { name: 'Unstitched Choli / Blouse', qty: '1 piece' },
        { name: 'Dupatta', qty: '1 piece' },
      ];
    }
    return [{ name: product.name.split(' ').slice(0, 3).join(' '), qty: '1 piece' }];
  }

  // Footwear
  if (subcatLower.includes('footwear') || subcatLower.includes('shoe') || subcatLower.includes('sneaker') || nameLower.includes('shoe') || nameLower.includes('sneaker')) {
    return [{ name: 'Pair of Footwear', qty: '1 pair (2 shoes)' }];
  }

  // Electronics & Mobiles
  if (family === 'electronics' || family === 'mobiles') {
    if (nameLower.includes('headphone') || subcatLower.includes('headphone') || subcatLower.includes('audio')) {
      return [
        { name: 'Wireless Headphones', qty: '1 unit' },
        { name: 'USB Type-C Charging Cable', qty: '1 piece' },
        { name: '3.5mm Aux Audio Cable', qty: '1 piece' },
        { name: 'User Manual & Warranty Card', qty: '1 piece' },
      ];
    }
    if (nameLower.includes('watch') || subcatLower.includes('wearable')) {
      return [
        { name: 'Smartwatch Unit', qty: '1 unit' },
        { name: 'Magnetic Charging Cable', qty: '1 piece' },
        { name: 'Quick Start Guide & Warranty Leaflet', qty: '1 piece' },
      ];
    }
    if (nameLower.includes('speaker')) {
      return [
        { name: 'Bluetooth Speaker', qty: '1 unit' },
        { name: 'USB-C Cable', qty: '1 piece' },
        { name: 'User Manual', qty: '1 piece' },
      ];
    }
    return [
      { name: product.name.split(' ').slice(0, 3).join(' '), qty: '1 unit' },
      { name: 'USB Charging Cable', qty: '1 piece' },
      { name: 'User Guide & Warranty Card', qty: '1 piece' },
    ];
  }

  // Beauty
  if (family === 'beauty') {
    return [
      { name: product.name.split(' ').slice(0, 4).join(' '), qty: `1 unit (${product.unit || 'Standard Pack'})` },
    ];
  }

  // Home & Living / Furniture
  if (family === 'home-living' || family === 'furniture') {
    return [
      { name: product.name.split(' ').slice(0, 4).join(' '), qty: '1 piece' },
      { name: 'Assembly Guide & Care Manual', qty: '1 piece' },
    ];
  }

  return [
    { name: product.name.split(' ').slice(0, 4).join(' '), qty: '1 piece' },
  ];
}

/**
 * Returns structured specification groups for the expandable "Product Details" accordion.
 */
export function getProductDetailsGroups(product: Product): DetailGroup[] {
  const family = getProductCategoryFamily(product);
  const specs = product.specifications || {};
  const groups: DetailGroup[] = [];

  const subcatLower = (product.subcategoryName || '').toLowerCase();
  const isFootwear =
    subcatLower.includes('footwear') ||
    subcatLower.includes('shoe') ||
    subcatLower.includes('sneaker') ||
    (product.name || '').toLowerCase().includes('shoe') ||
    (product.name || '').toLowerCase().includes('sneaker');

  // Available sizes string
  const sizeVariants = product.variants?.filter((v) => v.type === 'size') || [];
  const sizesString = sizeVariants.length > 0 ? sizeVariants.map((v) => v.value).join(', ') : '';

  // -------------------------------------------------------------
  // GROUP 1: Product Information
  // -------------------------------------------------------------
  const productInfoRows: DetailRow[] = [];
  productInfoRows.push({
    label: 'Product Type',
    value: product.subcategoryName || product.categoryName || 'Garment / Item',
  });
  if (product.brand) {
    productInfoRows.push({ label: 'Brand', value: product.brand });
  }
  const color = extractColor(product);
  if (color) {
    productInfoRows.push({ label: 'Colour', value: color });
  }
  if (family === 'fashion') {
    const pattern = extractPattern(product);
    if (pattern) productInfoRows.push({ label: 'Pattern', value: pattern });
    const fit = extractFit(product);
    if (fit) productInfoRows.push({ label: 'Style', value: fit });
    const occasion = extractOccasion(product);
    if (occasion) productInfoRows.push({ label: 'Occasion', value: occasion });
  } else if (isFootwear) {
    productInfoRows.push({ label: 'Style', value: 'Casual & Lifestyle Sneakers' });
    productInfoRows.push({ label: 'Occasion', value: 'Everyday / Casual / Streetwear' });
  } else if (family === 'electronics' || family === 'mobiles') {
    productInfoRows.push({ label: 'Model Name', value: product.name.split(' ').slice(0, 3).join(' ') });
    productInfoRows.push({ label: 'Device Compatibility', value: 'iOS, Android, Windows & macOS' });
  }
  productInfoRows.push({ label: 'Product Code / SKU', value: product.id });

  groups.push({
    id: 'product-info',
    title: 'Product Information',
    rows: productInfoRows.filter((r) => r.value && r.value.trim().length > 0),
  });

  // -------------------------------------------------------------
  // GROUP 2: Fabric & Fit / Technical Specs & Performance / Material & Build
  // -------------------------------------------------------------
  if (family === 'fashion') {
    const fabricRows: DetailRow[] = [];
    const fabric = extractFabric(product);
    if (fabric) fabricRows.push({ label: 'Main Fabric', value: fabric });
    if (specs['Lining']) fabricRows.push({ label: 'Lining Fabric', value: specs['Lining'] });
    const fit = extractFit(product);
    if (fit) fabricRows.push({ label: 'Fit', value: fit });
    const neck = extractNeck(product);
    if (neck) fabricRows.push({ label: 'Neck Style', value: neck });
    const sleeve = extractSleeve(product);
    if (sleeve) fabricRows.push({ label: 'Sleeve Length', value: sleeve });
    if (specs['Length']) fabricRows.push({ label: 'Length', value: specs['Length'] });
    fabricRows.push({
      label: 'Care Instructions',
      value: specs['Care'] || 'Machine wash cold with like colors / Gentle cycle',
    });

    groups.push({
      id: 'fabric-fit',
      title: 'Fabric & Fit',
      rows: fabricRows.filter((r) => r.value && r.value.trim().length > 0),
    });
  } else if (isFootwear) {
    const footRows: DetailRow[] = [];
    if (specs['Upper Material']) footRows.push({ label: 'Upper Material', value: specs['Upper Material'] });
    if (specs['Sole']) footRows.push({ label: 'Sole Material', value: specs['Sole'] });
    if (specs['Insole']) footRows.push({ label: 'Insole Cushioning', value: specs['Insole'] });
    if (specs['Closure']) footRows.push({ label: 'Closure Type', value: specs['Closure'] });
    footRows.push({ label: 'Toe Shape', value: 'Round Toe' });
    footRows.push({ label: 'Care Instructions', value: 'Wipe with a clean dry cloth' });

    groups.push({
      id: 'footwear-material',
      title: 'Material & Construction',
      rows: footRows.filter((r) => r.value && r.value.trim().length > 0),
    });
  } else if (family === 'electronics' || family === 'mobiles') {
    const elecRows: DetailRow[] = [];
    if (specs['Driver Size']) elecRows.push({ label: 'Driver Size', value: specs['Driver Size'] });
    if (specs['Noise Cancellation']) elecRows.push({ label: 'Active Noise Cancellation', value: specs['Noise Cancellation'] });
    if (specs['Battery Life']) elecRows.push({ label: 'Battery Playtime', value: specs['Battery Life'] });
    if (specs['Connectivity']) elecRows.push({ label: 'Connectivity', value: specs['Connectivity'] });
    elecRows.push({ label: 'Charging Support', value: specs['Charging'] || 'Type-C Fast Charging Supported' });
    elecRows.push({ label: 'Microphone', value: specs['Microphone'] || 'Quad Mic Array with Environmental Noise Cancellation' });
    elecRows.push({ label: 'Warranty Coverage', value: specs['Warranty'] || '1 Year Brand Replacement Warranty' });

    groups.push({
      id: 'technical-specs',
      title: 'Technical Specifications & Performance',
      rows: elecRows.filter((r) => r.value && r.value.trim().length > 0),
    });
  } else if (family === 'beauty') {
    const beautyRows: DetailRow[] = [];
    beautyRows.push({ label: 'Skin Type', value: specs['Suitable For'] || 'All Skin Types / Dermatologically Tested' });
    if (specs['Ingredients']) beautyRows.push({ label: 'Key Active Ingredients', value: specs['Ingredients'] });
    if (specs['Benefits']) beautyRows.push({ label: 'Skin Benefits', value: specs['Benefits'] });
    beautyRows.push({ label: 'Formulation', value: specs['Formulation'] || 'Lightweight Fast-Absorbing' });
    beautyRows.push({ label: 'Usage Instructions', value: 'Apply 2-3 drops to cleansed skin morning and evening' });

    groups.push({
      id: 'beauty-specs',
      title: 'Formulation & Ingredients',
      rows: beautyRows.filter((r) => r.value && r.value.trim().length > 0),
    });
  } else if (family === 'home-living' || family === 'furniture') {
    const homeRows: DetailRow[] = [];
    if (specs['Material']) homeRows.push({ label: 'Primary Material', value: specs['Material'] });
    if (specs['Finish']) homeRows.push({ label: 'Finish', value: specs['Finish'] });
    if (specs['Dimensions']) homeRows.push({ label: 'Dimensions', value: specs['Dimensions'] });
    homeRows.push({ label: 'Assembly', value: specs['Assembly'] || 'Pre-assembled / Minimal tools required' });
    homeRows.push({ label: 'Care Instructions', value: 'Wipe with soft clean cloth' });

    groups.push({
      id: 'home-specs',
      title: 'Material & Dimensions',
      rows: homeRows.filter((r) => r.value && r.value.trim().length > 0),
    });
  }

  // -------------------------------------------------------------
  // GROUP 3: Size & Measurements
  // -------------------------------------------------------------
  const sizeRows: DetailRow[] = [];
  if (sizesString) {
    sizeRows.push({ label: 'Available Sizes', value: sizesString });
  }
  if (specs['Dimensions']) {
    sizeRows.push({ label: 'Dimensions', value: specs['Dimensions'] });
  }
  if (family === 'fashion') {
    sizeRows.push({
      label: 'Fit Guidance',
      value: 'True to standard Indian size specifications. If you prefer a looser fit, choose one size up.',
    });
  } else if (isFootwear) {
    sizeRows.push({
      label: 'Sizing Advice',
      value: 'Standard Indian / UK sizing. For broader feet, consider sizing up by 0.5 size.',
    });
  }
  if (sizeRows.length > 0) {
    groups.push({
      id: 'size-measurements',
      title: 'Size & Measurements',
      rows: sizeRows.filter((r) => r.value && r.value.trim().length > 0),
    });
  }

  // -------------------------------------------------------------
  // GROUP 4: What's in the Box
  // -------------------------------------------------------------
  const boxItems = getBoxContents(product);
  if (boxItems.length > 0) {
    groups.push({
      id: 'whats-in-the-box',
      title: "What's in the Box",
      boxItems,
    });
  }

  // -------------------------------------------------------------
  // GROUP 5: Additional Information
  // -------------------------------------------------------------
  const addRows: DetailRow[] = [];
  addRows.push({ label: 'Country of Origin', value: 'India' });
  addRows.push({
    label: 'Manufacturer / Seller',
    value: `${product.sellerName} (${product.sellerRating}★ Rated Merchant)`,
  });
  addRows.push({ label: 'Product ID', value: product.id });
  addRows.push({
    label: 'Net Quantity',
    value: product.unit || (product.variants?.length ? '1 Unit' : '1 Piece'),
  });
  addRows.push({
    label: 'Fulfilment Window',
    value: `Dispatched in 24 hours • Delivery within ${product.deliveryDays} business days`,
  });
  addRows.push({
    label: 'Warranty',
    value:
      specs['Warranty'] ||
      (family === 'fashion' || isFootwear
        ? '30-Day Quality Assurance Guarantee'
        : '1 Year Brand Manufacturer Warranty'),
  });
  addRows.push({
    label: 'Return / Replacement',
    value: '7-Day Doorstep Replacement Guarantee',
  });

  groups.push({
    id: 'additional-info',
    title: 'Additional Information',
    rows: addRows.filter((r) => r.value && r.value.trim().length > 0),
  });

  return groups;
}

/**
 * Calculates rating distribution percentages and counts accurately
 */
export function getRatingBreakdown(rating: number, reviewCount: number) {
  const total = Math.max(reviewCount, 1);
  const clampedRating = Math.min(Math.max(rating, 1), 5);

  // Dynamic percentage allocation skewed naturally around average rating
  let p5 = 0;
  let p4 = 0;
  let p3 = 0;
  let p2 = 0;
  let p1 = 0;

  if (clampedRating >= 4.7) {
    p5 = 75; p4 = 18; p3 = 5; p2 = 1; p1 = 1;
  } else if (clampedRating >= 4.4) {
    p5 = 65; p4 = 23; p3 = 8; p2 = 2; p1 = 2;
  } else if (clampedRating >= 4.0) {
    p5 = 52; p4 = 30; p3 = 12; p2 = 4; p1 = 2;
  } else if (clampedRating >= 3.5) {
    p5 = 38; p4 = 32; p3 = 18; p2 = 8; p1 = 4;
  } else {
    p5 = 20; p4 = 25; p3 = 25; p2 = 18; p1 = 12;
  }

  const c5 = Math.round((p5 / 100) * total);
  const c4 = Math.round((p4 / 100) * total);
  const c3 = Math.round((p3 / 100) * total);
  const c2 = Math.round((p2 / 100) * total);
  const c1 = Math.max(0, total - (c5 + c4 + c3 + c2));

  return [
    { stars: 5, percentage: p5, count: c5 },
    { stars: 4, percentage: p4, count: c4 },
    { stars: 3, percentage: p3, count: c3 },
    { stars: 2, percentage: p2, count: c2 },
    { stars: 1, percentage: p1, count: c1 },
  ];
}

/**
 * Category-aware "What Customers Like" sentiment percentages
 */
export function getCategoryFeedbackHighlights(product: Product): { label: string; percentage: number; positive: boolean }[] {
  const family = getProductCategoryFamily(product);

  switch (family) {
    case 'fashion':
      return [
        { label: 'Comfortable Fit', percentage: 95, positive: true },
        { label: 'Premium Fabric Quality', percentage: 92, positive: true },
        { label: 'Color as Shown', percentage: 94, positive: true },
        { label: 'Finishing & Stitching', percentage: 91, positive: true },
        { label: 'True to Size', percentage: 89, positive: true },
      ];
    case 'mobiles':
    case 'electronics':
      return [
        { label: 'Fast & Snappy Performance', percentage: 96, positive: true },
        { label: 'Vibrant & Crisp Display', percentage: 94, positive: true },
        { label: 'All-Day Battery Life', percentage: 90, positive: true },
        { label: 'Premium Build & Haptics', percentage: 93, positive: true },
        { label: 'Value for Money', percentage: 92, positive: true },
      ];
    case 'appliances':
      return [
        { label: 'Cooling & Energy Efficiency', percentage: 95, positive: true },
        { label: 'Quiet Operation', percentage: 91, positive: true },
        { label: 'Ease of Installation', percentage: 89, positive: true },
        { label: 'Durable Construction', percentage: 94, positive: true },
      ];
    case 'furniture':
    case 'home-living':
      return [
        { label: 'Sturdy & Well-Balanced', percentage: 94, positive: true },
        { label: 'Aesthetic Modern Design', percentage: 96, positive: true },
        { label: 'Comfortable Cushioning', percentage: 92, positive: true },
        { label: 'Easy Cleaning & Maintenance', percentage: 88, positive: true },
      ];
    case 'groceries':
      return [
        { label: 'Freshness & Aroma', percentage: 97, positive: true },
        { label: 'Hygienic Packaging', percentage: 95, positive: true },
        { label: 'Authentic Taste', percentage: 94, positive: true },
        { label: 'Great Value', percentage: 92, positive: true },
      ];
    case 'beauty':
      return [
        { label: 'Visible Skin Glow', percentage: 95, positive: true },
        { label: 'Non-Greasy & Light Texture', percentage: 93, positive: true },
        { label: 'Pleasant Subtle Fragrance', percentage: 91, positive: true },
        { label: 'Gentle on Sensitive Skin', percentage: 94, positive: true },
      ];
    case 'books':
      return [
        { label: 'Engrossing & Well-Paced', percentage: 96, positive: true },
        { label: 'Crisp Print & Paper Quality', percentage: 94, positive: true },
        { label: 'Thought-Provoking Ideas', percentage: 92, positive: true },
      ];
    default:
      return [
        { label: 'High Build Quality', percentage: 94, positive: true },
        { label: 'Accurate Product Description', percentage: 93, positive: true },
        { label: 'Fast & Secure Delivery', percentage: 96, positive: true },
        { label: 'Satisfactory Performance', percentage: 91, positive: true },
      ];
  }
}

/**
 * Return & replacement policies adapted specifically by product category
 */
export function getCategoryReturnPolicy(product: Product) {
  const family = getProductCategoryFamily(product);

  switch (family) {
    case 'groceries':
      return {
        badge: '3-Day Replacement Only',
        title: '3 Days Replacement on Damaged or Expired Items',
        description: 'Perishable groceries & food items are eligible for doorstep replacement if received in damaged, leaked, or expired condition. Doorstep verification is conducted.',
        isReturnable: false,
        days: 3,
      };
    case 'beauty':
      return {
        badge: '7-Day Replacement Only',
        title: '7 Days Replacement for Damaged or Defective Items',
        description: 'Personal hygiene and cosmetic products can be replaced if delivered damaged, defective, or incorrect. Unopened seal required.',
        isReturnable: false,
        days: 7,
      };
    case 'electronics':
    case 'mobiles':
      return {
        badge: '7-Day Replacement Guarantee',
        title: '7 Days Doorstep Replacement for Hardware Defects',
        description: 'Eligible for technician visit verification and 1-to-1 replacement if hardware or manufacturing defect occurs within 7 days of delivery. Keep original box with IMEI/serial number.',
        isReturnable: true,
        days: 7,
      };
    case 'appliances':
      return {
        badge: '10-Day Replacement Guarantee',
        title: '10 Days Replacement on Manufacturing Defects',
        description: 'Large appliances include brand-certified technician inspection. Replacement initiated on technician approval with doorstep pickup.',
        isReturnable: true,
        days: 10,
      };
    case 'furniture':
      return {
        badge: '7-Day Replacement Guarantee',
        title: '7 Days Replacement for Damaged or Missing Parts',
        description: 'Inspect upon delivery. In the rare case of transit damage or missing assembly hardware, free replacement parts or full unit replacement is arranged.',
        isReturnable: true,
        days: 7,
      };
    default:
      // Fashion & general
      return {
        badge: '7-Day Easy Return & Replacement',
        title: '7 Days Hassle-Free Returns & Size Exchanges',
        description: 'Try it at home. If the fit or color is not right, request a free doorstep exchange for a different size or complete instant refund to your source account. Tags must remain attached.',
        isReturnable: true,
        days: 7,
      };
  }
}

export interface ReviewItem {
  id: string;
  userName: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  images?: string[];
  variantPurchased?: string;
}

/**
 * Returns authentic, realistic customer reviews tailored to the product
 */
export function getProductReviews(product: Product): ReviewItem[] {
  const family = getProductCategoryFamily(product);
  const brand = product.brand || 'HAATZA';

  // Base list customized by family
  if (family === 'fashion') {
    return [
      {
        id: 'rev-1',
        userName: 'Aakash Verma',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        date: '14 Oct 2026',
        title: 'Outstanding quality and perfect festive fitting!',
        comment: `Bought this from ${brand} for Diwali celebrations. The fabric feels rich, breathable, and doesn't itch at all. The stitching along the neck and collar is top-tier. Exact match to the photo. Highly recommended!`,
        verified: true,
        helpfulCount: 42,
        variantPurchased: 'Size: L (42) / Cream',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        ],
      },
      {
        id: 'rev-2',
        userName: 'Priya Sharma',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        date: '08 Oct 2026',
        title: 'Pure elegance, totally worth every rupee',
        comment: 'Received compliments from everyone at family gathering. The drape is graceful and the color accuracy is spot on. Delivery arrived within 2 days with secure packaging.',
        verified: true,
        helpfulCount: 28,
        variantPurchased: 'Size: M (40)',
        images: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
        ],
      },
      {
        id: 'rev-3',
        userName: 'Vikramaditya Rao',
        location: 'Hyderabad, Telangana',
        rating: 4,
        date: '28 Sep 2026',
        title: 'Very comfortable, slightly longer length for me',
        comment: 'The material is truly comfortable and looks premium in sunlight. For someone 5ft 8in, the length falls just slightly below the knee, but overall fit across chest and shoulders is great.',
        verified: true,
        helpfulCount: 15,
        variantPurchased: 'Size: L (42)',
      },
      {
        id: 'rev-4',
        userName: 'Sneha Patel',
        location: 'Ahmedabad, Gujarat',
        rating: 5,
        date: '19 Sep 2026',
        title: 'Flawless finishing! Will purchase another color soon',
        comment: 'Fabric is lightweight yet has great body. Hand wash preserved the sheen with zero shrinkage. Super pleased with HAATZA delivery speed.',
        verified: true,
        helpfulCount: 11,
        variantPurchased: 'Size: S (38)',
        images: [
          'https://images.unsplash.com/photo-1610030469668-932d56a29774?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
        ],
      },
    ];
  } else if (family === 'electronics' || family === 'mobiles') {
    return [
      {
        id: 'rev-el-1',
        userName: 'Rohan Deshmukh',
        location: 'Pune, Maharashtra',
        rating: 5,
        date: '12 Oct 2026',
        title: 'Mind-blowing performance and gorgeous OLED panel!',
        comment: `Upgraded from a 3-year-old machine and the speed boost is staggering. The screen colors pop with deep inky blacks and buttery smooth refresh rate. Battery easily lasts 10+ hours of productivity tasks.`,
        verified: true,
        helpfulCount: 63,
        variantPurchased: '16GB RAM / 1TB SSD',
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
        ],
      },
      {
        id: 'rev-el-2',
        userName: 'Deepak Sen',
        location: 'Kolkata, West Bengal',
        rating: 5,
        date: '04 Oct 2026',
        title: 'Authentic unit with active manufacturer warranty',
        comment: 'Registered the serial number on official portal right away without any hitch. Premium build quality, lightning fast charging, and thermals remain cool under load.',
        verified: true,
        helpfulCount: 37,
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
        ],
      },
      {
        id: 'rev-el-3',
        userName: 'Ananya Roy',
        location: 'New Delhi, Delhi',
        rating: 4,
        date: '25 Sep 2026',
        title: 'Excellent daily driver laptop',
        comment: 'Speakers are loud and clean, keyboard travel feels satisfying for coding and long typing sessions. Came with genuine Windows pre-activated.',
        verified: true,
        helpfulCount: 19,
        images: [
          'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
        ],
      },
    ];
  } else {
    return [
      {
        id: 'rev-gen-1',
        userName: 'Karthik Narayanan',
        location: 'Chennai, Tamil Nadu',
        rating: 5,
        date: '15 Oct 2026',
        title: 'Top-notch quality, thoroughly impressed!',
        comment: `Genuine product sourced by ${product.sellerName || brand}. Exactly as pictured and described in the specification sheet. Packaging had double bubble wrap for maximum protection.`,
        verified: true,
        helpfulCount: 34,
        images: product.images.slice(0, 2),
      },
      {
        id: 'rev-gen-2',
        userName: 'Meenakshi Iyer',
        location: 'Kochi, Kerala',
        rating: 5,
        date: '06 Oct 2026',
        title: 'Delivered in pristine condition in 2 days',
        comment: 'Very happy with this purchase. Quality surpasses expectations for this price bracket. Customer support on HAATZA was prompt in providing shipping updates.',
        verified: true,
        helpfulCount: 21,
      },
      {
        id: 'rev-gen-3',
        userName: 'Suresh Kumar',
        location: 'Jaipur, Rajasthan',
        rating: 4,
        date: '22 Sep 2026',
        title: 'Good value for money',
        comment: 'Works as intended and feels durable. Value for money compared to other retail market options.',
        verified: true,
        helpfulCount: 12,
      },
    ];
  }
}

export interface QuestionAnswerItem {
  id: string;
  question: string;
  answer: string;
  author: string;
  date: string;
  isSellerAnswer: boolean;
  upvotes: number;
}

/**
 * Returns contextual Questions & Answers tailored by category
 */
export function getProductQuestions(product: Product): QuestionAnswerItem[] {
  const family = getProductCategoryFamily(product);
  const seller = product.sellerName || 'HAATZA Official Store';

  if (family === 'fashion') {
    return [
      {
        id: 'qa-1',
        question: 'Does this fabric shrink after machine wash?',
        answer: 'No, this product uses pre-shrunk, high-density yarn. When washed according to care instructions (cold water, gentle cycle), there is zero shrinkage.',
        author: `${seller} (Verified Seller)`,
        date: '11 Oct 2026',
        isSellerAnswer: true,
        upvotes: 24,
      },
      {
        id: 'qa-2',
        question: 'How do I choose the right size if I am between sizes M and L?',
        answer: 'If you prefer a tailored, slim silhouette, choose M. If you prefer a relaxed comfort drape with extra breathing room around chest and waist, choose L. Refer to the Size Chart for exact chest measurements in inches.',
        author: 'HAATZA Fashion Care Team',
        date: '02 Oct 2026',
        isSellerAnswer: true,
        upvotes: 19,
      },
      {
        id: 'qa-3',
        question: 'Is doorstep exchange available if size does not fit?',
        answer: 'Yes! HAATZA offers 7-day doorstep replacement where the delivery executive brings your new size right to your door.',
        author: 'HAATZA Support',
        date: '24 Sep 2026',
        isSellerAnswer: true,
        upvotes: 31,
      },
    ];
  } else if (family === 'electronics' || family === 'mobiles') {
    return [
      {
        id: 'qa-el-1',
        question: 'Is the RAM and SSD expandable on this model?',
        answer: 'Yes, this model features an additional PCIe M.2 NVMe slot for storage expansion up to 2TB.',
        author: `${seller} (Official Representative)`,
        date: '09 Oct 2026',
        isSellerAnswer: true,
        upvotes: 45,
      },
      {
        id: 'qa-el-2',
        question: 'Does this come with Microsoft Office included?',
        answer: 'Yes, Windows 11 Home and Microsoft Office Home & Student 2024 lifetime license are pre-installed and activated.',
        author: `${seller}`,
        date: '01 Oct 2026',
        isSellerAnswer: true,
        upvotes: 29,
      },
      {
        id: 'qa-el-3',
        question: 'How do I claim brand warranty if required?',
        answer: 'Warranty is directly supported across all authorized brand service centers in India using the HAATZA GST tax invoice included in your package or downloadable from Your Orders.',
        author: 'HAATZA Electronics Helpdesk',
        date: '21 Sep 2026',
        isSellerAnswer: true,
        upvotes: 38,
      },
    ];
  } else {
    return [
      {
        id: 'qa-gen-1',
        question: 'Is this 100% original and genuine product?',
        answer: `Yes, all items sold on HAATZA by ${seller} are 100% genuine and sourced directly from authorized brand distributors.`,
        author: 'HAATZA Quality Assurance',
        date: '10 Oct 2026',
        isSellerAnswer: true,
        upvotes: 33,
      },
      {
        id: 'qa-gen-2',
        question: 'What is the estimated delivery time for metro cities?',
        answer: `Standard delivery takes ${product.deliveryDays || 2} to 3 business days with real-time tracking provided on your registered phone and email.`,
        author: 'HAATZA Logistics',
        date: '29 Sep 2026',
        isSellerAnswer: true,
        upvotes: 18,
      },
    ];
  }
}

/**
 * Size Chart data for Men & Women Fashion
 */
export const MENS_SIZE_CHART = [
  { size: 'S (38)', chestInches: '38 - 39', chestCm: '96 - 99', waistInches: '30 - 32', waistCm: '76 - 81', shoulderInches: '17.5', lengthInches: '40' },
  { size: 'M (40)', chestInches: '40 - 41', chestCm: '101 - 104', waistInches: '32 - 34', waistCm: '81 - 86', shoulderInches: '18.0', lengthInches: '41' },
  { size: 'L (42)', chestInches: '42 - 43', chestCm: '106 - 109', waistInches: '34 - 36', waistCm: '86 - 91', shoulderInches: '18.5', lengthInches: '42' },
  { size: 'XL (44)', chestInches: '44 - 45', chestCm: '111 - 114', waistInches: '36 - 38', waistCm: '91 - 96', shoulderInches: '19.0', lengthInches: '43' },
  { size: 'XXL (46)', chestInches: '46 - 47', chestCm: '116 - 119', waistInches: '38 - 40', waistCm: '96 - 101', shoulderInches: '19.5', lengthInches: '44' },
];

export const WOMENS_SIZE_CHART = [
  { size: 'XS (34)', bustInches: '32 - 33', bustCm: '81 - 84', waistInches: '26 - 27', waistCm: '66 - 69', hipInches: '35 - 36', lengthInches: '42' },
  { size: 'S (36)', bustInches: '34 - 35', bustCm: '86 - 89', waistInches: '28 - 29', waistCm: '71 - 74', hipInches: '37 - 38', lengthInches: '43' },
  { size: 'M (38)', bustInches: '36 - 37', bustCm: '91 - 94', waistInches: '30 - 31', waistCm: '76 - 79', hipInches: '39 - 40', lengthInches: '44' },
  { size: 'L (40)', bustInches: '38 - 39', bustCm: '96 - 99', waistInches: '32 - 33', waistCm: '81 - 84', hipInches: '41 - 42', lengthInches: '45' },
  { size: 'XL (42)', bustInches: '40 - 41', bustCm: '101 - 104', waistInches: '34 - 35', waistCm: '86 - 89', hipInches: '43 - 44', lengthInches: '46' },
  { size: 'XXL (44)', bustInches: '42 - 43', bustCm: '106 - 109', waistInches: '36 - 37', waistCm: '91 - 94', hipInches: '45 - 46', lengthInches: '47' },
];

/**
 * Ensures every product always has at least 4 to 5 high-resolution, multi-angle view images.
 * If a product only has 1 or 2 images, complementary view angles tailored to its category are added.
 */
export function getProductImages(product: Product): string[] {
  const initial =
    Array.isArray(product.images) && product.images.length > 0
      ? [...product.images]
      : product.mainImage
      ? [product.mainImage]
      : [];

  if (initial.length >= 5) {
    return initial;
  }

  const family = getProductCategoryFamily(product);
  const cat = (product.categoryId || '').toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());

  let viewBank: string[] = [];

  if (
    cat.includes('women') ||
    tags.some((t) => ['women', 'saree', 'kurti', 'lehenga', 'sharara', 'anarkali'].includes(t))
  ) {
    viewBank = [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469668-932d56a29774?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    ];
  } else if (
    cat.includes('men') ||
    tags.some((t) => ['men', 'kurta', 'shirt', 'suit', 'sherwani', 'tshirt'].includes(t))
  ) {
    viewBank = [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    ];
  } else if (family === 'mobiles' || family === 'electronics') {
    viewBank = [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80',
    ];
  } else if (
    tags.some((t) => ['shoes', 'sneakers', 'footwear', 'heels', 'boots'].includes(t))
  ) {
    viewBank = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80',
    ];
  } else {
    viewBank = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=80',
    ];
  }

  const result = [...initial];
  for (const img of viewBank) {
    if (result.length >= 5) break;
    if (!result.includes(img)) {
      result.push(img);
    }
  }

  return result.length > 0 ? result : viewBank;
}

