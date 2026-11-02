import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  getProductByIdOrSlug, 
  getRecommendedProducts, 
  getForYouProducts,
  ALL_LITE_PRODUCTS
} from '../data/allProductsRegistry';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { 
  Plus, Minus, Clock, ShieldCheck, Sparkles, CheckCircle2,
  Share2, Bookmark, Check, ChevronRight, Star,
  ArrowRight, Award, ShoppingCart, Zap,
  RotateCcw, Banknote, FileText, Store, ChevronDown, ChevronUp
} from 'lucide-react';
import { PriceInfoButton } from '../components/common/PriceInfoModal';
import { HaatzaLiteProductReviews } from '../components/HaatzaLiteReviews/HaatzaLiteProductReviews';

interface UnitOption {
  id: string;
  name: string;
  unit: string;
  price: number;
  mrp: number;
  discountPercentage: number;
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  'Fruits & Vegetables': 'fruits-vegetables',
  'Daily Vegetables': 'fruits-vegetables',
  'Fresh Fruits': 'fruits-vegetables',
  'Dairy & Breakfast': 'dairy-breakfast',
  'Dairy and Breakfast': 'dairy-breakfast',
  'Milk & Butter': 'dairy-breakfast',
  'Milk & Paneer': 'dairy-breakfast',
  'Snacks & Beverages': 'snacks-beverages',
  'Cold Drinks & Juices': 'snacks-beverages',
  'Chips & Crisps': 'snacks-beverages',
  'Household Cleaning': 'household-cleaning',
  'Personal Care': 'personal-care',
  'Kitchen Essentials': 'kitchen-essentials',
  'Cookware & Pans': 'kitchen-essentials',
  'Bakery & Breads': 'bakery-breads',
  'Breads & Bakery': 'bakery-breads',
  'Staples & Cooking Essentials': 'staples-cooking-essentials',
  'Staples & Cooking': 'staples-cooking-essentials',
  'Frozen Foods': 'frozen-foods',
  'Baby Care & Essentials': 'baby-care-essentials',
  'Baby Care': 'baby-care-essentials',
  'Pet Supplies': 'pet-supplies',
  'All For You': 'all-for-you',
};

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);

  // Smooth scroll to top & trigger staggered animation curve on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMounted(false);
    const timer = setTimeout(() => setIsMounted(true), 30);
    return () => clearTimeout(timer);
  }, [id]);

  // Lookup product from registry or fallback to synthesized item
  const product: HaatzaLiteProduct = useMemo(() => {
    if (!id) {
      return ALL_LITE_PRODUCTS[0];
    }
    const found = getProductByIdOrSlug(id);
    if (found) return found;

    const formattedTitle = id
      .replace(/^prod-lite-/, '')
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: id,
      slug: id,
      name: formattedTitle || 'Fresh Everyday Essential Product',
      brand: 'HAATZA LITE',
      categoryId: 'cat-lite-fruits-veg',
      categoryName: 'Fruits & Vegetables',
      subcategoryName: 'Fresh Produce',
      unit: '500 g',
      price: 149,
      mrp: 189,
      discountPercentage: 21,
      mainImage: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      ],
      description: 'Hand-selected premium daily essential, sourced directly from verified regional dark stores and dispatched in minutes with food-grade temperature protection.',
      fullDescription: 'Inspected under multi-point hygiene standards. Packed fresh with guaranteed contactless delivery.',
      instantDeliveryMinutes: 8,
      inStock: true,
      stock: 50,
      rating: 4.8,
      reviewCount: 340,
      tags: ['Daily Essentials', 'Fresh', 'Haatza Lite'],
      deliveryDays: 0,
      sellerName: 'Haatza Lite DarkStore #14',
      sellerRating: 4.9,
    };
  }, [id]);

  // Compute realistic pack size unit options
  const unitOptions: UnitOption[] = useMemo(() => {
    const rawUnit = (product.unit || '1 unit').toLowerCase();
    const basePrice = product.price;
    const baseMrp = product.mrp > product.price ? product.mrp : Math.round(product.price * 1.2);

    if (rawUnit.includes('500 ml') || rawUnit.includes('500ml')) {
      return [
        {
          id: 'unit-1',
          name: '500 ml',
          unit: '500 ml Pouch',
          price: basePrice,
          mrp: baseMrp,
          discountPercentage: Math.round(((baseMrp - basePrice) / baseMrp) * 100),
        },
        {
          id: 'unit-2',
          name: '1 L',
          unit: '1 Litre Pack',
          price: Math.round(basePrice * 1.9),
          mrp: Math.round(baseMrp * 2),
          discountPercentage: Math.round((((baseMrp * 2) - (basePrice * 1.9)) / (baseMrp * 2)) * 100),
        },
      ];
    }

    if (rawUnit.includes('1 l') || rawUnit.includes('1l') || rawUnit.includes('1 litre')) {
      return [
        {
          id: 'unit-1',
          name: '1 L',
          unit: '1 Litre Bottle',
          price: basePrice,
          mrp: baseMrp,
          discountPercentage: Math.round(((baseMrp - basePrice) / baseMrp) * 100),
        },
        {
          id: 'unit-2',
          name: '2 L Combo',
          unit: '2 Litre Twin Pack',
          price: Math.round(basePrice * 1.88),
          mrp: Math.round(baseMrp * 2),
          discountPercentage: Math.round((((baseMrp * 2) - (basePrice * 1.88)) / (baseMrp * 2)) * 100),
        },
      ];
    }

    if (rawUnit.includes('500 g') || rawUnit.includes('500g')) {
      return [
        {
          id: 'unit-1',
          name: '500 g',
          unit: '500 g Pack',
          price: basePrice,
          mrp: baseMrp,
          discountPercentage: Math.round(((baseMrp - basePrice) / baseMrp) * 100),
        },
        {
          id: 'unit-2',
          name: '1 kg',
          unit: '1 kg Value Pack',
          price: Math.round(basePrice * 1.85),
          mrp: Math.round(baseMrp * 2),
          discountPercentage: Math.round((((baseMrp * 2) - (basePrice * 1.85)) / (baseMrp * 2)) * 100),
        },
      ];
    }

    if (rawUnit.includes('1 kg') || rawUnit.includes('1kg')) {
      return [
        {
          id: 'unit-1',
          name: '1 kg',
          unit: '1 kg Pack',
          price: basePrice,
          mrp: baseMrp,
          discountPercentage: Math.round(((baseMrp - basePrice) / baseMrp) * 100),
        },
        {
          id: 'unit-2',
          name: '2 kg',
          unit: '2 kg Mega Saver',
          price: Math.round(basePrice * 1.88),
          mrp: Math.round(baseMrp * 2),
          discountPercentage: Math.round((((baseMrp * 2) - (basePrice * 1.88)) / (baseMrp * 2)) * 100),
        },
      ];
    }

    return [
      {
        id: 'unit-1',
        name: '1 pc',
        unit: product.unit || '1 unit',
        price: basePrice,
        mrp: baseMrp,
        discountPercentage: Math.max(0, Math.round(((baseMrp - basePrice) / baseMrp) * 100)),
      },
      {
        id: 'unit-2',
        name: 'Pack of 2',
        unit: `2 x (${product.unit || '1 unit'})`,
        price: Math.round(basePrice * 1.88),
        mrp: Math.round(baseMrp * 2),
        discountPercentage: Math.max(5, Math.round((((baseMrp * 2) - (basePrice * 1.88)) / (baseMrp * 2)) * 100)),
      },
    ];
  }, [product]);

  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');

  useEffect(() => {
    setSelectedUnitId('unit-1');
  }, [product.id]);

  const activeUnit = useMemo(() => {
    return unitOptions.find((u) => u.id === selectedUnitId) || unitOptions[0];
  }, [unitOptions, selectedUnitId]);

  // Gallery images with high-resolution views
  const galleryImages = useMemo(() => {
    const list: string[] = [];
    if (product.mainImage) list.push(product.mainImage);
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }

    const fallbackViews = [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80',
    ];

    while (list.length < 3) {
      const nextFallback = fallbackViews[list.length % fallbackViews.length];
      if (!list.includes(nextFallback)) {
        list.push(nextFallback);
      } else {
        break;
      }
    }

    return list;
  }, [product]);

  const [activeImage, setActiveImage] = useState<string>(product.mainImage || galleryImages[0]);

  useEffect(() => {
    setActiveImage(product.mainImage || galleryImages[0]);
  }, [product, galleryImages]);

  // Cart operations
  const currentCartProduct: HaatzaLiteProduct = useMemo(() => ({
    ...product,
    price: activeUnit.price,
    mrp: activeUnit.mrp,
    unit: activeUnit.unit,
  }), [product, activeUnit]);

  const cartItem = cart?.find((item) => item?.productId === product.id);
  const qty = cartItem ? cartItem.quantity : 0;
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(currentCartProduct, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleBuyNow = () => {
    // 1. Ensure product is in Lite cart
    if (qty === 0) {
      addToCart(currentCartProduct, 1);
    }
    // 2. Also populate shopping cart storage so CheckoutPage immediately has the item
    try {
      const shoppingCartKey = 'haatza_cart_items';
      const existing = localStorage.getItem(shoppingCartKey);
      let items = existing ? JSON.parse(existing) : [];
      if (!Array.isArray(items)) items = [];
      const itemIndex = items.findIndex((i: any) => i.productId === product.id);
      const cartProd = {
        id: product.id,
        name: product.name,
        price: activeUnit.price,
        mrp: activeUnit.mrp,
        unit: activeUnit.unit,
        image: product.mainImage || galleryImages[0],
        images: galleryImages,
        category: product.categoryName || 'Grocery',
        rating: 4.9,
        reviewsCount: 2400,
        inStock: true,
        deliveryDays: 1,
      };
      if (itemIndex >= 0) {
        items[itemIndex].quantity = Math.max(1, items[itemIndex].quantity);
      } else {
        items.push({
          id: `${product.id}-standard`,
          productId: product.id,
          product: cartProd,
          quantity: Math.max(1, qty),
          addedAt: new Date().toISOString(),
        });
      }
      localStorage.setItem(shoppingCartKey, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
    // 3. Navigate directly to cart page
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Recommendations: Similar products, Top products, People also bought
  const similarProducts = useMemo(() => {
    return getRecommendedProducts(product, 6);
  }, [product]);

  const categoryTopProducts = useMemo(() => {
    const similarIds = new Set(similarProducts.map((p) => p.id));
    similarIds.add(product.id);
    return ALL_LITE_PRODUCTS.filter(
      (p) =>
        !similarIds.has(p.id) &&
        (p.categoryName === product.categoryName || p.categoryId === product.categoryId)
    ).slice(0, 6);
  }, [product, similarProducts]);

  const peopleAlsoBought = useMemo(() => {
    const excludedIds = [product.id, ...similarProducts.map((p) => p.id), ...categoryTopProducts.map((p) => p.id)];
    return getForYouProducts(product, excludedIds, 6);
  }, [product, similarProducts, categoryTopProducts]);

  const deliveryMins = product.instantDeliveryMinutes || 8;
  const categorySlug = CATEGORY_SLUG_MAP[product.categoryName || ''] || 'fruits-vegetables';

  // Lower shelf card renderer with cinematic animations
  const renderProductCard = (p: HaatzaLiteProduct, index: number = 0, isSimilar: boolean = false) => {
    const itemCart = cart?.find((c) => c?.productId === p.id);
    const itemQty = itemCart ? itemCart.quantity : 0;
    const itemDiscount = p.discountPercentage || (p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0);
    const itemMins = p.instantDeliveryMinutes || 8;

    return (
      <div
        key={p.id}
        onClick={() => navigate(`/lite/product/${p.slug || p.id}`)}
        style={isSimilar ? { animationDelay: `${index * 85}ms` } : undefined}
        className={`group relative bg-white border border-slate-100 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between h-full select-none cursor-pointer transition-all duration-300 ease-out will-change-transform overflow-hidden ${
          isSimilar
            ? 'cinematic-similar-card'
            : 'hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.15),0_0_15px_2px_rgba(52,211,153,0.06)]'
        }`}
      >
        {/* Specular Light Reflection Sweep on Hover */}
        {isSimilar && <div className="card-glass-sheen" aria-hidden="true" />}
        <div>
          {/* Product Image Stage */}
          <div className="relative w-full aspect-square bg-white rounded-xl flex items-center justify-center p-1 sm:p-1.5 mb-2.5 overflow-hidden border border-slate-100">
            {itemDiscount > 0 && (
              <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black tracking-wide uppercase shadow-2xs">
                {itemDiscount}% OFF
              </span>
            )}
            {/* Ambient Aura underneath product on hover */}
            {isSimilar && <div className="shelf-img-aura" aria-hidden="true" />}
            <img
              src={p.mainImage}
              alt={p.name}
              loading="lazy"
              className={`w-full h-full max-h-[98%] max-w-[98%] object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] select-none will-change-transform ${
                isSimilar
                  ? 'shelf-product-img'
                  : 'group-hover:scale-104 transition-transform duration-400 ease-out'
              }`}
            />
          </div>

          {/* Delivery Speed Pill & Rating Badge */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 tracking-tight">
              <Clock className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
              <span>{itemMins} MINS</span>
            </div>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shrink-0 shadow-2xs">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{(p.rating || 4.8).toFixed(1)}</span>
            </div>
          </div>

          {/* Product Name */}
          <div 
            className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug min-h-[32px] sm:min-h-[34px] mb-1"
            title={p.name}
          >
            {p.name}
          </div>

          {/* Unit Weight */}
          <div className="text-[11px] text-slate-400 font-medium truncate mb-2">
            {p.unit || '1 unit'}
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="relative z-10 flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100 mt-auto">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
                {formatCurrency(p.price)}
              </span>
              <PriceInfoButton
                productName={p.name}
                price={p.price}
                mrp={p.mrp}
                discountPercentage={p.discountPercentage}
                unit={p.unit}
                brand={p.brand}
                size="xs"
                theme="emerald"
              />
            </div>
            {p.mrp > p.price && (
              <span className="text-[10px] text-slate-400 line-through font-medium leading-tight mt-0.5">
                {formatCurrency(p.mrp)}
              </span>
            )}
          </div>

          {/* Protected Add to Cart button */}
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            {itemQty === 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(p, 1);
                }}
                className="group/btn relative overflow-hidden h-7 sm:h-8 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[11px] uppercase tracking-wider transition-all duration-200 ease-out hover:scale-105 shadow-[0_3px_10px_rgba(16,185,129,0.32)] hover:shadow-[0_5px_15px_rgba(16,185,129,0.45)] active:scale-95 cursor-pointer flex items-center justify-center gap-1 select-none will-change-transform"
                aria-label={`Add ${p.name} to cart`}
              >
                <Plus className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/btn:rotate-90" />
                <span>ADD</span>
              </button>
            ) : (
              <div className="h-7 sm:h-8 inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-[0_3px_10px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-200 hover:scale-[1.02]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(itemCart!.id, itemQty - 1);
                  }}
                  className="px-2 h-full hover:bg-black/15 text-white transition-colors cursor-pointer active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-2.5 h-2.5 stroke-[3]" />
                </button>
                <span className="px-1.5 text-xs font-black min-w-5 text-center select-none text-white">
                  {itemQty}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(itemCart!.id, itemQty + 1);
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
    );
  };

  return (
    /* Cinematic Atmospheric Canvas with Living Ambient Aurora & Studio Mesh */
    <div className="relative select-none overflow-x-clip bg-gradient-to-b from-[#F6FAF7] via-[#EEF8F1] to-[#F5FAF6]">
      
      {/* 1. Ambient Background Aurora Mesh & Glow Layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        {/* Top-Left Glowing Emerald Nebula */}
        <div 
          className="absolute -top-36 -left-36 w-[620px] h-[620px] rounded-full bg-gradient-to-br from-emerald-400/25 via-teal-300/15 to-transparent blur-[120px] animate-pulse" 
          style={{ animationDuration: '8s' }}
        />
        {/* Top-Right Luminous Mint & Warmth Halo */}
        <div 
          className="absolute top-8 -right-32 w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-teal-400/20 via-emerald-300/20 to-transparent blur-[110px] animate-pulse" 
          style={{ animationDuration: '10s' }}
        />
        {/* Center Dynamic Core Backlight */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[780px] h-[780px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-teal-200/12 to-transparent blur-[130px]" 
        />
        {/* Bottom Ambient Fresh Glow */}
        <div 
          className="absolute -bottom-36 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-t from-emerald-300/20 via-teal-200/12 to-transparent blur-[130px]" 
        />
        
        {/* 2. Studio Dot-Matrix Micro-Pattern (Fades gracefully toward edges) */}
        <div 
          className="absolute inset-0 opacity-[0.45] mix-blend-multiply"
          style={{
            backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.22) 1.25px, transparent 1.25px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 20%, transparent 80%)'
          }}
        />

        {/* 3. Subtle Ambient Light Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/[0.025] to-transparent pointer-events-none" />
      </div>

      {/* Centering Alignment Width Block (Expanded to 1720px with reduced side space) */}
      <div className="max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6 pt-3 pb-4 sm:pt-4 sm:pb-8 space-y-4 sm:space-y-6 relative z-10">
        
        {/* Top Breadcrumb Navigation */}
        <nav 
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 font-medium flex-wrap bg-white/70 backdrop-blur-md px-3.5 py-1 sm:py-1.5 rounded-full border border-emerald-100/70 w-fit shadow-2xs"
        >
          <Link to="/lite" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <Link 
            to={`/lite/${categorySlug}`} 
            className="hover:text-emerald-700 transition-colors"
          >
            {product.categoryName || 'Groceries'}
          </Link>
          {product.subcategoryName && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-600">{product.subcategoryName}</span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* ==============================================================
            MAIN TWO-PANE CONTENT CONTAINER (Animatic & Visually Strong Hero Section)
            ============================================================== */}
        <div className="relative bg-white/95 backdrop-blur-2xl border border-emerald-100/90 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_25px_65px_-15px_rgba(16,185,129,0.14),0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_32px_75px_-12px_rgba(16,185,129,0.22),0_8px_32px_rgba(0,0,0,0.04)] transition-shadow duration-700 ease-out">
          







          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* ----------------------------------------------------------
                LEFT COLUMN (6 cols): Sticky / Static Product Image Studio Stage & Thumbnails
                ---------------------------------------------------------- */}
            <div className="order-1 lg:order-1 lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 lg:sticky lg:top-[168px] z-20 self-start">
              
              {/* Product Image Stage (Seamless Studio Pedestal with 3D Floating Depth & Living Atmosphere) */}
              <div className="relative w-full aspect-square max-w-full sm:max-w-[620px] lg:max-w-none min-h-[360px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[560px] xl:min-h-[600px] mx-auto rounded-3xl overflow-hidden group bg-gradient-to-b from-slate-50/60 via-white to-emerald-50/20 border border-emerald-100/70 shadow-[0_12px_36px_-8px_rgba(16,185,129,0.1),0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_22px_55px_-10px_rgba(16,185,129,0.2)] transition-all duration-700 ease-out flex flex-col items-center justify-center p-2 sm:p-4 select-none">
                
                {/* Central Soft Ambient Glow Halo behind the Product (Gentle Living Breath) */}
                <div 
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-300/25 via-teal-200/20 to-transparent blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-emerald-300/35" 
                  aria-hidden="true" 
                />

                {/* Sweeping Crystalline Light Sheen on Hover */}
                <div 
                  className="pointer-events-none absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/50 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20" 
                  aria-hidden="true" 
                />

                {/* Floating Product Image Container with 3D Ground Contact Shadow */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full max-h-full max-w-full object-contain filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.12)] scale-[1.08] sm:scale-[1.12] group-hover:-translate-y-2 group-hover:scale-[1.18] transition-all duration-700 ease-out select-none will-change-transform"
                  />
                  {/* Dynamic 3D Contact Shadow beneath product that diffuses on hover lift */}
                  <div 
                    className="absolute bottom-2 sm:bottom-4 w-72 sm:w-96 h-4 rounded-[100%] bg-emerald-950/15 blur-md transition-all duration-700 ease-out group-hover:scale-85 group-hover:opacity-40 group-hover:blur-lg pointer-events-none" 
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Row of Clickable Thumbnails */}
              <div className="flex items-center justify-center gap-3 overflow-x-auto pt-3 pb-2 px-1 max-w-full mx-auto w-full scrollbar-none">
                {galleryImages.map((img, idx) => {
                  const isSelected = activeImage === img;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 p-2 flex items-center justify-center bg-white transition-all duration-300 cursor-pointer shrink-0 ${
                        isSelected 
                          ? 'border-emerald-500 ring-4 ring-emerald-500/15 shadow-[0_4px_14px_rgba(16,185,129,0.25)] scale-105' 
                          : 'border-slate-200/80 hover:border-emerald-300 opacity-75 hover:opacity-100 hover:-translate-y-0.5'
                      }`}
                      aria-label={`View thumbnail ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain filter drop-shadow-2xs"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ----------------------------------------------------------
                RIGHT COLUMN (6 cols): Details, Specifications, Descriptions & Actions (Scrollable)
                ---------------------------------------------------------- */}
            <div className="order-2 lg:order-2 lg:col-span-6 flex flex-col justify-start space-y-6">
              
              {/* Item 1: Brand & Actions Header (Staggered Entrance Step 1) */}
              <div 
                style={{ transitionDelay: '50ms' }}
                className={`transition-all duration-500 ease-out ${
                  isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/90 text-xs font-black uppercase tracking-wider shadow-2xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>{product.brand || 'HAATZA LITE'} • IN STOCK</span>
                    </div>

                    {/* Cinematic Micro-Gradient Delivery Speed Tag (⏱️ 8 MINS DELIVERED) */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50/90 border border-slate-100 shadow-2xs">
                      <span className="text-xs">⏱️</span>
                      <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer text-xs font-black uppercase tracking-wider">
                        {deliveryMins} MINS DELIVERED
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="p-2 rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Share product link"
                      aria-label="Share product"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSaved(!isSaved)}
                      className="p-2 rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title={isSaved ? 'Saved to favorites' : 'Save for later'}
                      aria-label="Save product"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 2: Product Title (Staggered Entrance Step 2) */}
              <div 
                style={{ transitionDelay: '120ms' }}
                className={`transition-all duration-500 ease-out ${
                  isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-heading tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Item 3: Unit Size & Rating (Staggered Entrance Step 3) */}
              <div 
                style={{ transitionDelay: '180ms' }}
                className={`transition-all duration-500 ease-out ${
                  isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('customer-reviews');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-emerald-800 font-extrabold bg-emerald-50 hover:bg-emerald-100/90 px-3 py-1 rounded-lg border border-emerald-200/70 shadow-2xs transition-all cursor-pointer group"
                  >
                    <Star className="w-3.5 h-3.5 fill-[#00C853] text-[#00C853] group-hover:scale-110 transition-transform" />
                    <span>{product.rating || 4.8} ({product.reviewCount || 128} Customer Reviews)</span>
                  </button>
                </div>
              </div>

              {/* Item 4: Active Size Selection Pop Blocks (Interactive Tactile Cards) */}
              <div 
                style={{ transitionDelay: '250ms' }}
                className={`transition-all duration-500 ease-out space-y-2.5 ${
                  isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                  Select Unit
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {unitOptions.map((opt) => {
                    const isSelected = selectedUnitId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedUnitId(opt.id)}
                        className={`relative p-3.5 sm:p-4 rounded-2xl border-2 text-left cursor-pointer flex flex-col justify-between transition-all duration-300 ease-out group/unit ${
                          isSelected
                            ? 'border-emerald-500 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/40 text-emerald-950 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.22)] -translate-y-1 scale-[1.02]'
                            : 'border-slate-200/80 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/20 hover:-translate-y-0.5 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs sm:text-sm font-black transition-colors ${isSelected ? 'text-emerald-700' : 'text-slate-900 group-hover/unit:text-emerald-700'}`}>
                            {opt.name}
                          </span>
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3] drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300 group-hover/unit:border-emerald-400" />
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm sm:text-base font-black text-slate-900">
                              {formatCurrency(opt.price)}
                            </span>
                            {opt.mrp > opt.price && (
                              <span className="text-xs text-slate-400 line-through font-medium">
                                {formatCurrency(opt.mrp)}
                              </span>
                            )}
                          </div>
                        </div>
                        {opt.discountPercentage > 0 && (
                          <span className="mt-1.5 self-start text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md">
                            {opt.discountPercentage}% OFF
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Item 5: Price Tag & Polished Emerald Action Trigger (Staggered Entrance Step 5) */}
              <div 
                style={{ transitionDelay: '320ms' }}
                className={`transition-all duration-500 ease-out py-5 border-y border-emerald-100/70 ${
                  isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                      {formatCurrency(activeUnit.price)}
                    </span>
                    {activeUnit.mrp > activeUnit.price && (
                      <span className="text-xl sm:text-2xl text-slate-400 line-through font-medium">
                        {formatCurrency(activeUnit.mrp)}
                      </span>
                    )}
                  </div>
                  <PriceInfoButton
                    productName={product.name}
                    price={activeUnit.price}
                    mrp={activeUnit.mrp}
                    discountPercentage={activeUnit.discountPercentage}
                    unit={activeUnit.unit}
                    brand={product.brand}
                    size="md"
                    theme="emerald"
                  />
                </div>
                <div className="text-xs text-slate-400 font-medium mb-6">
                  <span>(Inclusive of all taxes)</span>
                </div>

                {/* Small, Premium, Eyecatchy Action Triggers (ADD TO CART / GLOWING STEPPER + BUY NOW) */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="group relative overflow-hidden h-10 px-5 rounded-xl bg-gradient-to-r from-[#0C831F] via-emerald-500 to-[#0C831F] hover:from-[#0fa027] hover:to-emerald-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 ease-out hover:scale-[1.02] shadow-[0_4px_16px_rgba(12,131,31,0.4),0_0_12px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_22px_rgba(12,131,31,0.6),0_0_20px_rgba(16,185,129,0.4)] border border-emerald-300/40 active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 will-change-transform"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {/* Subtle crystalline diagonal shimmer */}
                      <span className="pointer-events-none absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                      <span className="tracking-wide">ADD TO CART</span>
                    </button>
                  ) : (
                    <div className="relative inline-flex items-center h-10 w-32 bg-gradient-to-r from-[#0C831F] via-emerald-500 to-[#0C831F] text-white rounded-xl shadow-[0_4px_16px_rgba(12,131,31,0.4),0_0_12px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_22px_rgba(12,131,31,0.6),0_0_20px_rgba(16,185,129,0.4)] border border-emerald-300/50 overflow-hidden transition-all duration-200 ease-out hover:scale-[1.03]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(cartItem!.id, qty - 1)}
                        className="w-10 h-full flex items-center justify-center hover:bg-black/15 text-white active:scale-90 transition-all cursor-pointer select-none"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 stroke-[3]" />
                      </button>
                      <span className="flex-1 text-center font-black text-sm sm:text-base text-white select-none tracking-wide">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(cartItem!.id, qty + 1)}
                        className="w-10 h-full flex items-center justify-center hover:bg-black/15 text-white active:scale-90 transition-all cursor-pointer select-none"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="group relative overflow-hidden h-10 px-5 rounded-xl bg-gradient-to-r from-[#0C831F] via-emerald-500 to-[#0C831F] hover:from-[#0fa027] hover:to-emerald-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(12,131,31,0.4),0_0_12px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_22px_rgba(12,131,31,0.6),0_0_20px_rgba(16,185,129,0.4)] border border-emerald-300/40 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-[0.97] hover:scale-[1.02] will-change-transform"
                    aria-label={`Buy ${product.name} now`}
                  >
                    <span className="pointer-events-none absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <Zap className="w-3.5 h-3.5 fill-white text-white drop-shadow-xs" />
                    <span className="tracking-wide">BUY NOW</span>
                  </button>
                </div>
              </div>

              {/* Product Specifications, Details, Highlights & Description Section (Inside Left Scrollable Column) */}
              <div id="product-specifications" className="relative z-10 pt-2 space-y-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden divide-y divide-slate-100">
                  
                  {/* 1. THREE-COLUMN TRUST GUARANTEE STRIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/40 p-4 sm:p-5">
                    
                    {/* 10-Day Return */}
                    <div className="flex items-center sm:flex-col sm:text-center gap-3.5 sm:gap-2 p-2 sm:p-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 sm:mx-auto shadow-2xs">
                        <RotateCcw className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          10-Day Return
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Easy doorstep replacement or refund
                        </p>
                      </div>
                    </div>

                    {/* Cash on Delivery */}
                    <div className="flex items-center sm:flex-col sm:text-center gap-3.5 sm:gap-2 p-2 sm:p-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 sm:mx-auto shadow-2xs">
                        <Banknote className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          Cash on Delivery
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Pay when your order arrives
                        </p>
                      </div>
                    </div>

                    {/* Secured Payments */}
                    <div className="flex items-center sm:flex-col sm:text-center gap-3.5 sm:gap-2 p-2 sm:p-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 sm:mx-auto shadow-2xs">
                        <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          Secured Payments
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          100% protected transactions
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* 2. PRODUCT HIGHLIGHTS ROW & EXPANDABLE DRAWER */}
                  <div id="product-highlights" className="divide-y divide-slate-100">
                    <div 
                      onClick={() => setIsHighlightsExpanded(!isHighlightsExpanded)}
                      className="p-4 sm:p-6 flex items-center justify-between gap-4 flex-wrap cursor-pointer select-none hover:bg-slate-50/70 transition-colors group"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                          <Sparkles className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                              Product Highlights
                            </h3>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                              <Check className="w-3 h-3 stroke-[3]" /> Verified Specs
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Key features & farm-fresh material specifications
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsHighlightsExpanded(!isHighlightsExpanded);
                        }}
                        className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>{isHighlightsExpanded ? 'Collapse Highlights' : 'View Highlights'}</span>
                        {isHighlightsExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </button>
                    </div>

                    {isHighlightsExpanded && (
                      <div className="p-4 sm:p-6 bg-slate-50/30 space-y-5 animate-in fade-in duration-200">
                        
                        {/* Freshness story narrative */}
                        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-2 shadow-2xs">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Freshness & Quality Story</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                            {product.description || 'Naturally ripened daily essential cultivated in certified partner orchards. Harvested at the optimal sugar-starch equilibrium for tender creaminess, rich natural aroma, and signature wholesome flavor.'}
                          </p>
                        </div>

                        {/* Feature chips grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Natural Vitality</span>
                            </div>
                            <div className="text-[11px] text-slate-600 leading-snug font-medium">
                              Rich in natural sugars (fructose & glucose) for sustained, crash-free energy.
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Rich in Potassium & Minerals</span>
                            </div>
                            <div className="text-[11px] text-slate-600 leading-snug font-medium">
                              Natural electrolytes aid muscle recovery and balanced blood pressure.
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Digestive Wellness</span>
                            </div>
                            <div className="text-[11px] text-slate-600 leading-snug font-medium">
                              Prebiotic soluble fibers and pectin nurture daily gut health.
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Cold-Chain Inspected</span>
                            </div>
                            <div className="text-[11px] text-slate-600 leading-snug font-medium">
                              Climate-regulated pods prevent bruising and lock in natural moisture.
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>100% Chemical-Free</span>
                            </div>
                            <div className="text-[11px] text-slate-600 leading-snug font-medium">
                              Zero calcium carbide, synthetic wax, or harsh artificial ripening agents.
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Farm-to-Fork Chain</span>
                            </div>
                            <div className="text-[11px] text-slate-600 leading-snug font-medium">
                              Harvested directly from certified farms with complete batch traceability.
                            </div>
                          </div>
                        </div>

                        {/* Storage advisory tip box */}
                        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
                          <span className="text-base leading-none">💡</span>
                          <div className="text-[11px] text-slate-700 leading-relaxed font-medium">
                            <strong className="text-emerald-900 font-extrabold">Storage Advisory:</strong> Keep at room temperature in a well-ventilated fruit basket. Once fully ripe, refrigerate to prolong freshness and crisp texture.
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* 3. PRODUCT DETAILS ROW & EXPANDABLE DRAWER */}
                  <div id="product-details" className="divide-y divide-slate-100">
                    <div 
                      onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                      className="p-4 sm:p-6 flex items-center justify-between gap-4 flex-wrap cursor-pointer select-none hover:bg-slate-50/70 transition-colors group"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                          <FileText className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                            Product Details
                          </h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Deep overview, care instructions & dimensions
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDetailsExpanded(!isDetailsExpanded);
                        }}
                        className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>{isDetailsExpanded ? 'Collapse Details' : 'Expand Details'}</span>
                        {isDetailsExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </button>
                    </div>

                    {isDetailsExpanded && (
                      <div className="p-4 sm:p-6 bg-slate-50/30 space-y-5 animate-in fade-in duration-200">
                        
                        {/* In-depth narrative overview */}
                        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-2 shadow-2xs">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            In-Depth Product Overview
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                            {product.fullDescription || 'Inspected under multi-point hygiene standards. Sourced directly from verified regional dark stores and dispatched in minutes with food-grade temperature protection and guaranteed contactless delivery.'}
                          </p>
                        </div>

                        {/* Alternating Professional Specifications Matrix */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
                          <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Technical Specifications & Attributes
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              DarkStore Verified
                            </span>
                          </div>

                          <div className="divide-y divide-slate-100 text-xs">
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-slate-50/40">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Product Name</span>
                              <span className="font-bold text-slate-900 text-right">{product.name}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-white">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Brand & Producer</span>
                              <span className="font-bold text-slate-900 text-right">{product.brand || 'HAATZA LITE'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-slate-50/40">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Net Quantity</span>
                              <span className="font-bold text-emerald-800 text-right">{activeUnit.unit}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-white">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Packaging Format</span>
                              <span className="font-semibold text-slate-800 text-right">Breathable Eco-Perforated Pouch</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-slate-50/40">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Shelf Life</span>
                              <span className="font-semibold text-slate-800 text-right">3 - 4 Days from Dispatch</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-white">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Country of Origin</span>
                              <span className="font-semibold text-slate-800 text-right">India (100% Domestic Harvest)</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-slate-50/40">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Ripening Standard</span>
                              <span className="font-semibold text-emerald-700 text-right">Ethylene Chamber (0% Carbide)</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-white">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">FSSAI License</span>
                              <span className="font-mono font-bold text-slate-800 text-right text-[11px]">10018042000000</span>
                            </div>
                            <div className="flex items-center justify-between p-3 sm:px-4 bg-slate-50/40">
                              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Fulfillment Pod</span>
                              <span className="font-semibold text-slate-800 text-right">Haatza DarkStore (8-10 Mins Express)</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* 4. SOLD BY ROW & MERCHANT METRICS */}
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                          <Store className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                              Sold By
                            </h3>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                              <Check className="w-3 h-3 stroke-[3]" /> DarkStore Verified
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-semibold mt-0.5">
                            {product.sellerName || 'Haatza Lite DarkStore #14'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/lite/${categorySlug}`)}
                        className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>View Shop</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    </div>

                    {/* Seller Metrics Bar */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 font-medium">
                      <div className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200/80">
                        <Star className="w-3.5 h-3.5 fill-[#00C853] text-[#00C853]" />
                        <span>{product.sellerRating || '4.9'}</span>
                      </div>
                      <span>Merchant Rating</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-semibold text-slate-800">1000+ Positive Feedbacks</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-semibold text-slate-800">Fast Dispatch Track Record (8-10 Mins Express)</span>
                    </div>

                    {/* Doorstep Quality Promise Card */}
                    <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/60 to-emerald-50/40 border border-emerald-200/90 rounded-2xl p-4 text-xs space-y-1 shadow-2xs">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                        <span className="tracking-wide">Haatza Lite 100% Doorstep Quality Promise</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        Not completely satisfied with the freshness, aroma, or quality upon delivery? Enjoy an instant 1-tap replacement or 100% refund on your doorstep within 24 hours.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ==============================================================
            LOWER SHELVES (Floating Studio Glass Cards)
            ============================================================== */}

        {/* 1. Similar products shelf */}
        {similarProducts.length > 0 && (
          <section className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-4 sm:p-5 shadow-[0_15px_40px_-12px_rgba(16,185,129,0.08)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  Similar products
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Fresh everyday alternatives and companion picks
                </p>
              </div>
              <Link 
                to={`/lite/${categorySlug}`}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1 group"
              >
                <span>See All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {similarProducts.map((p) => renderProductCard(p))}
            </div>
          </section>
        )}

        {/* 2. Top products in this category shelf */}
        {categoryTopProducts.length > 0 && (
          <section className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-4 sm:p-5 shadow-[0_15px_40px_-12px_rgba(16,185,129,0.08)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  Top products in this category
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Most loved and reordered items in {product.categoryName || 'this aisle'}
                </p>
              </div>
              <Link 
                to={`/lite/${categorySlug}`}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1 group"
              >
                <span>See All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {categoryTopProducts.map((p) => renderProductCard(p))}
            </div>
          </section>
        )}

        {/* 3. People also bought shelf */}
        {peopleAlsoBought.length > 0 && (
          <section className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-4 sm:p-5 shadow-[0_15px_40px_-12px_rgba(16,185,129,0.08)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  People also bought
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Frequently purchased together with your daily essentials
                </p>
              </div>
              <Link 
                to="/lite"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1 group"
              >
                <span>Explore All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {peopleAlsoBought.map((p) => renderProductCard(p))}
            </div>
          </section>
        )}

        {/* ==============================================================
            CUSTOMER REVIEWS & RATINGS SECTION (At end of page before footer)
            ============================================================== */}
        <div id="customer-reviews" className="scroll-mt-24 pt-0">
          <HaatzaLiteProductReviews product={product} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
