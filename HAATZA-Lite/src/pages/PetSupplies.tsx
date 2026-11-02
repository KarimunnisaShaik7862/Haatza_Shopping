import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Dedicated curated catalog for Pet Supplies
export const PET_SUPPLIES_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-pedigree-adult-dog',
    slug: 'pedigree-adult-dry-dog-food-chicken-vegetables-3kg',
    name: 'Pedigree Adult Complete Dry Dog Food - Chicken & Vegetables',
    brand: 'PEDIGREE',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-dog',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Dog Food & Chews',
    description: 'Balanced nutrition with 37 essential nutrients, quality protein, and dietary fiber for digestive health.',
    fullDescription: 'Clinically proven to provide shinier coat in 6 weeks with zinc and Omega-6. Strengthens teeth and bones of adult dogs.',
    price: 849,
    mrp: 990,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 9420,
    stock: 110,
    inStock: true,
    unit: '3 kg Bag',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dog Food', 'Pedigree', 'Kibble', 'Pet Nutrition', 'Chicken'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-royal-canin-mini',
    slug: 'royal-canin-mini-adult-complete-dog-kibble-2kg',
    name: 'Royal Canin Mini Adult Complete Dog Kibble (Small Breeds)',
    brand: 'ROYAL CANIN',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-dog',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Dog Food & Chews',
    description: 'Formulated for small breed adult dogs (up to 10 kg). Tailored energy and EPA-DHA for coat brilliance.',
    fullDescription: 'Custom small kibble size tailored to the miniature jaws of small dogs. Helps reduce tartar formation via calcium chelators.',
    price: 1390,
    mrp: 1650,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 4820,
    stock: 65,
    inStock: true,
    unit: '2 kg Bag',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&q=80'],
    tags: ['Royal Canin', 'Dog Food', 'Small Breed', 'Gourmet Pet'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-whiskas-wet-cat-food',
    slug: 'whiskas-adult-wet-cat-food-ocean-fish-in-jelly-4pk',
    name: 'Whiskas Adult Wet Cat Food Pouches - Ocean Fish in Jelly (Pack of 4)',
    brand: 'WHISKAS',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-cat',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Cat Food & Litter',
    description: 'Tender morsels of real ocean fish chunks in succulent savoury jelly. Irresistible flavour cats love.',
    fullDescription: 'Supports urinary tract health and optimal daily hydration. Enriched with Vitamin A and taurine for sharp feline vision.',
    price: 195,
    mrp: 220,
    discountPercentage: 11,
    rating: 4.9,
    reviewCount: 6140,
    stock: 140,
    inStock: true,
    unit: '340 g (4 x 85g Pouches)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cat Food', 'Whiskas', 'Wet Food', 'Ocean Fish', 'Pouches'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-jerhigh-chicken-treats',
    slug: 'jerhigh-real-chicken-meat-dog-chew-sticks-100g',
    name: 'JerHigh Real Pure Chicken Meat Gourmet Dog Chew Sticks',
    brand: 'JERHIGH',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-dog',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Dog Food & Chews',
    description: 'Premium soft chew sticks made from 100% human-grade real chicken breast meat prepared under sterile conditions.',
    fullDescription: 'Delectable training reward enriched with Vitamin E to support natural body defenses and glossy coat sheen.',
    price: 215,
    mrp: 260,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 3820,
    stock: 90,
    inStock: true,
    unit: '100 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80'],
    tags: ['JerHigh', 'Dog Treats', 'Chicken Sticks', 'Training Treats'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-intersand-cat-litter',
    slug: 'intersand-simple-odour-clumping-cat-litter-5kg',
    name: 'Intersand Clumping Natural Bentonite Cat Litter (Baby Powder Scent)',
    brand: 'INTERSAND',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-cat',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Cat Food & Litter',
    description: '99.9% dust-free ultra-fast clumping sodium bentonite clay litter with superior odor neutralization.',
    fullDescription: 'Forms firm instant scoops when touched by moisture. Gentle on cat paws and keeps homes smelling pristine.',
    price: 520,
    mrp: 650,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 3210,
    stock: 80,
    inStock: true,
    unit: '5 kg Bag',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cat Litter', 'Clumping Clay', 'Intersand', 'Odor Control'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-himalaya-erina-shampoo',
    slug: 'himalaya-erina-ep-anti-tick-flea-pet-shampoo-200ml',
    name: 'Himalaya Erina-EP Anti-Tick & Flea Natural Pet Shampoo',
    brand: 'HIMALAYA',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-grooming',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Pet Grooming & Hygiene',
    description: 'Ayurvedic pet formula infused with Eucalyptus and Neem to prevent tick infestation, fleas, and lice.',
    fullDescription: 'Gentle on pet skin, prevents fur tangles and soothes itching caused by ectoparasites. Safe for dogs and cats.',
    price: 199,
    mrp: 240,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 4210,
    stock: 100,
    inStock: true,
    unit: '200 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Pet Shampoo', 'Himalaya', 'Anti Tick', 'Dog Grooming', 'Neem'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-drools-calcium-bones',
    slug: 'drools-absolute-calcium-bone-treats-pack-of-40',
    name: 'Drools Absolute Calcium Dental Dog Bone Treats (Pack of 40)',
    brand: 'DROOLS',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-dog',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Dog Food & Chews',
    description: 'Chewable calcium supplement bones with optimum 2:1 Calcium to Phosphorus ratio for skeletal strength.',
    fullDescription: 'Scrapes plaque and tartar from teeth as dogs chew. Highly palatable vanilla-milk flavour loved by all breeds.',
    price: 349,
    mrp: 425,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 5120,
    stock: 120,
    inStock: true,
    unit: 'Jar of 40 Treats',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Drools', 'Calcium Bones', 'Dog Chews', 'Dental Care'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-whiskas-dry-cat-food',
    slug: 'whiskas-dry-cat-food-ocean-fish-flavour-1-2kg',
    name: 'Whiskas Adult 1+ Dry Cat Food - Ocean Fish Flavour',
    brand: 'WHISKAS',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-cat',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Cat Food & Litter',
    description: 'Crunchy outer pockets with soft creamy center rich in Omega-3 and 6 for a glossy feline coat.',
    fullDescription: 'Specially designed pocket kibble that cleans teeth as cats chew. Contains taurine to support healthy cardiac function.',
    price: 399,
    mrp: 470,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 4120,
    stock: 95,
    inStock: true,
    unit: '1.2 kg Pouch',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80'],
    tags: ['Whiskas', 'Cat Kibble', 'Dry Cat Food', 'Ocean Fish'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-choostix-rawhide-bones',
    slug: 'choostix-pressed-rawhide-dental-chew-bones-pack-of-4',
    name: 'Choostix Pressed Natural Rawhide Chew Bones for Dogs (Pack of 4)',
    brand: 'CHOOSTIX',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-dog',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Dog Food & Chews',
    description: '100% natural compressed rawhide bones that satisfy innate dog chewing instincts and relieve anxiety.',
    fullDescription: 'Long-lasting chews that reduce destructive chewing around the house while promoting healthy gums and fresh breath.',
    price: 185,
    mrp: 230,
    discountPercentage: 20,
    rating: 4.7,
    reviewCount: 2980,
    stock: 85,
    inStock: true,
    unit: 'Pack of 4 Bones (6 Inch)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80'],
    tags: ['Rawhide Bones', 'Choostix', 'Dog Chew', 'Dental Chews'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-bark-out-loud-wipes',
    slug: 'bark-out-loud-hypoallergenic-pet-grooming-wipes-100',
    name: 'Bark Out Loud Hypoallergenic Pet Grooming Wipes (100 Wipes)',
    brand: 'BARK OUT LOUD',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-grooming',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Pet Grooming & Hygiene',
    description: 'Alcohol-free and paraben-free moist wipes with aloe vera, vitamin E, and chamomile for paw and coat cleaning.',
    fullDescription: 'Effortlessly cleans muddy paws, messy faces, and fur after daily walks. Neutralizes wet dog odors instantly.',
    price: 289,
    mrp: 350,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 2190,
    stock: 75,
    inStock: true,
    unit: 'Pack of 100 Wipes',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Pet Wipes', 'Paw Cleaning', 'Bark Out Loud', 'Grooming'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sheba-tuna-pouch',
    slug: 'sheba-fine-flakes-wet-cat-food-tuna-and-salmon-70g',
    name: 'Sheba Deluxe Wet Cat Food Pouch - Shredded Tuna & Salmon in Gravy',
    brand: 'SHEBA',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-cat',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Cat Food & Litter',
    description: 'Gourmet dining for discerning cats: delicate flakes of hand-flaked real tuna and wild salmon in rich gravy.',
    fullDescription: 'Indulgent culinary treat designed even for the fussiest felines. High in moisture and omega fish oils.',
    price: 85,
    mrp: 95,
    discountPercentage: 11,
    rating: 4.9,
    reviewCount: 3120,
    stock: 120,
    inStock: true,
    unit: '70 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sheba', 'Gourmet Cat Food', 'Tuna Salmon', 'Cat Treat'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-purina-supercoat-dog',
    slug: 'purina-supercoat-all-breed-adult-dry-dog-food-3kg',
    name: 'Purina Supercoat All Breed Adult Complete Dry Dog Food',
    brand: 'PURINA',
    categoryId: 'cat-lite-pet',
    subcategoryId: 'sub-l-dog',
    categoryName: 'Pet Supplies',
    subcategoryName: 'Dog Food & Chews',
    description: 'Crafted by Australian pet nutritionists with real Australian meat and Smartblend formula.',
    fullDescription: 'Zero artificial colours or flavours. Formulated with high-quality protein to support strong lean muscles.',
    price: 945,
    mrp: 1150,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 2840,
    stock: 65,
    inStock: true,
    unit: '3 kg Bag',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80'],
    tags: ['Purina', 'Supercoat', 'Dog Kibble', 'Smartblend'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const PetSupplies: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = PET_SUPPLIES_CATALOG;

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      <HaatzaLiteCategoryShowcase title="Pet Supplies">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
          {displayedProducts.map((product, index) => {
            const cartItem = cart.find((item) => item.productId === product.id);
            const qty = cartItem ? cartItem.quantity : 0;
            const packSize = product.unit || '1 unit';
            const discount = product.discountPercentage || (product.mrp > product.price 
              ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
              : 0);
            const deliveryMins = product.instantDeliveryMinutes || 8;

            return (
              <div
                key={product.id}
                style={{
                  opacity: isMounted ? 1 : 0,
                  transform: isMounted ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 400ms ease-out ${index * 25}ms, transform 400ms ease-out ${index * 25}ms`,
                  willChange: 'opacity, transform',
                }}
                className={!isMounted ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
              >
                <div
                  onClick={() => navigate(`/lite/product/${product.id || product.slug}`)}
                  className="group haatza-neon-aura-card relative bg-white border border-slate-100/90 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between h-full select-none cursor-pointer shadow-xs"
                >
                  <div>
                    <div className="relative w-full aspect-square bg-[#F5F7F6] rounded-xl flex items-center justify-center p-1 sm:p-1.5 mb-2.5 overflow-hidden border border-slate-100/80">
                      {discount > 0 && (
                        <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black tracking-wide uppercase shadow-2xs">
                          {discount}% OFF
                        </span>
                      )}

                      <Link
                        to={`/lite/product/${product.id || product.slug}`}
                        className="relative z-0 w-full h-full flex items-center justify-center cursor-pointer"
                      >
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          width="140"
                          height="140"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full max-h-[98%] max-w-[98%] object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] group-hover:scale-104 transition-transform duration-400 ease-out select-none will-change-transform"
                        />
                      </Link>
                    </div>

                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 tracking-tight">
                        <Clock className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                        <span>{deliveryMins} MINS</span>
                      </div>
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shrink-0 shadow-2xs">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span>{(product.rating || 4.8).toFixed(1)}</span>
                      </div>
                    </div>

                    <Link
                      to={`/lite/product/${product.id || product.slug}`}
                      className="block text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug min-h-[32px] sm:min-h-[34px] mb-1"
                      title={product.name}
                    >
                      {product.name}
                    </Link>

                    <div className="text-[11px] text-slate-400 font-medium truncate mb-2">
                      {packSize}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100 mt-auto">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
                          {formatCurrency(product.price)}
                        </span>
                        <PriceInfoButton
                          productName={product.name}
                          price={product.price}
                          mrp={product.mrp}
                          discountPercentage={discount}
                          unit={packSize}
                          brand={product.brand}
                          size="xs"
                          theme="emerald"
                        />
                      </div>
                      {product.mrp > product.price && (
                        <span className="text-[10px] text-slate-400 line-through font-medium leading-tight mt-0.5">
                          {formatCurrency(product.mrp)}
                        </span>
                      )}
                    </div>

                    <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="group/btn relative overflow-hidden h-7 sm:h-8 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[11px] uppercase tracking-wider transition-all duration-200 ease-out hover:scale-105 shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_14px_rgba(16,185,129,0.45)] active:scale-95 cursor-pointer flex items-center justify-center gap-1 select-none will-change-transform"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <Plus className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/btn:rotate-90" />
                          <span>ADD</span>
                        </button>
                      ) : (
                        <div className="h-7 sm:h-8 inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-[0_2px_8px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-200 hover:scale-[1.02]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateQuantity(cartItem!.id, qty - 1);
                            }}
                            className="px-2 h-full hover:bg-black/15 text-white transition-colors cursor-pointer active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-2.5 h-2.5 stroke-[3]" />
                          </button>
                          <span className="px-1.5 text-xs font-black min-w-5 text-center select-none text-white">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateQuantity(cartItem!.id, qty + 1);
                            }}
                            className="px-2 h-full hover:bg-black/15 text-white transition-colors cursor-pointer active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-2.5 h-2.5 stroke-[3]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </HaatzaLiteCategoryShowcase>
    </div>
  );
};

export default PetSupplies;
