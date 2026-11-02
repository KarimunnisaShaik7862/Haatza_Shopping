import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { haatzaLiteProducts } from './liteData';
import { KITCHEN_ESSENTIALS_CATALOG } from '../pages/KitchenEssentials';
import { DAIRY_BREAKFAST_CATALOG } from '../pages/DairyBreakfast';
import { SNACKS_BEVERAGES_CATALOG } from '../pages/SnacksBeverages';
import { HOUSEHOLD_CLEANING_CATALOG } from '../pages/HouseholdCleaning';
import { PERSONAL_CARE_CATALOG } from '../pages/PersonalCare';
import { ADDITIONAL_PRODUCE } from '../pages/FruitsVegetables';
import { ALL_FOR_YOU_CATALOG } from '../pages/AllForYou';
import { BAKERY_BREADS_CATALOG } from '../pages/BakeryBreads';
import { STAPLES_COOKING_CATALOG } from '../pages/StaplesCookingEssentials';
import { FROZEN_FOODS_CATALOG } from '../pages/FrozenFoods';
import { BABY_CARE_CATALOG } from '../pages/BabyCareEssentials';
import { PET_SUPPLIES_CATALOG } from '../pages/PetSupplies';

// Master unified array of all products across Haatza Lite
const RAW_PRODUCTS: HaatzaLiteProduct[] = [
  ...haatzaLiteProducts,
  ...KITCHEN_ESSENTIALS_CATALOG,
  ...DAIRY_BREAKFAST_CATALOG,
  ...SNACKS_BEVERAGES_CATALOG,
  ...HOUSEHOLD_CLEANING_CATALOG,
  ...PERSONAL_CARE_CATALOG,
  ...ADDITIONAL_PRODUCE,
  ...ALL_FOR_YOU_CATALOG,
  ...BAKERY_BREADS_CATALOG,
  ...STAPLES_COOKING_CATALOG,
  ...FROZEN_FOODS_CATALOG,
  ...BABY_CARE_CATALOG,
  ...PET_SUPPLIES_CATALOG,
];

// Deduplicate strictly by product id and slug
const seenIds = new Set<string>();
export const ALL_LITE_PRODUCTS: HaatzaLiteProduct[] = RAW_PRODUCTS.filter((product) => {
  if (!product || !product.id) return false;
  const key = `${product.id}__${product.slug || ''}`;
  if (seenIds.has(key) || seenIds.has(product.id)) {
    return false;
  }
  seenIds.add(key);
  seenIds.add(product.id);
  if (product.slug) seenIds.add(product.slug);
  return true;
});

// Lookup by id or slug
export const getProductByIdOrSlug = (idOrSlug: string): HaatzaLiteProduct | null => {
  if (!idOrSlug) return null;
  const normalized = idOrSlug.trim().toLowerCase();
  return (
    ALL_LITE_PRODUCTS.find(
      (p) =>
        p.id?.toLowerCase() === normalized ||
        p.slug?.toLowerCase() === normalized
    ) || null
  );
};

// Recommended products (same category or related, excluding current)
export const getRecommendedProducts = (
  currentProduct?: HaatzaLiteProduct | null,
  limit = 6
): HaatzaLiteProduct[] => {
  if (!currentProduct) {
    return ALL_LITE_PRODUCTS.slice(0, limit);
  }

  // Same category first
  const sameCategory = ALL_LITE_PRODUCTS.filter(
    (p) =>
      p.id !== currentProduct.id &&
      p.slug !== currentProduct.slug &&
      ((currentProduct.categoryId && p.categoryId === currentProduct.categoryId) ||
        (currentProduct.categoryName && p.categoryName === currentProduct.categoryName))
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Supplement with top rated items if needed
  const others = ALL_LITE_PRODUCTS.filter(
    (p) =>
      p.id !== currentProduct.id &&
      p.slug !== currentProduct.slug &&
      !sameCategory.some((item) => item.id === p.id)
  );

  return [...sameCategory, ...others].slice(0, limit);
};

// "For You" popular/trending picks (across diverse categories, excluding current)
export const getForYouProducts = (
  currentProduct?: HaatzaLiteProduct | null,
  excludeIds: string[] = [],
  limit = 6
): HaatzaLiteProduct[] => {
  const excludeSet = new Set(excludeIds);
  if (currentProduct) {
    excludeSet.add(currentProduct.id);
    if (currentProduct.slug) excludeSet.add(currentProduct.slug);
  }

  const trendingOrBestseller = ALL_LITE_PRODUCTS.filter(
    (p) => !excludeSet.has(p.id) && (p.isBestseller || p.isTrending || p.rating >= 4.7)
  );

  if (trendingOrBestseller.length >= limit) {
    return trendingOrBestseller.slice(0, limit);
  }

  const remainder = ALL_LITE_PRODUCTS.filter(
    (p) => !excludeSet.has(p.id) && !trendingOrBestseller.some((item) => item.id === p.id)
  );

  return [...trendingOrBestseller, ...remainder].slice(0, limit);
};
