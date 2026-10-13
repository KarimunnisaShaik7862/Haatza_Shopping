export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  badge?: string;
}

export const MAIN_NAVIGATION_CATEGORIES: NavCategory[] = [
  { id: 'cat-fashion', name: "Men's Fashion", slug: 'fashion', iconName: 'Shirt' },
  { id: 'cat-women-fashion', name: "Women's Ethnic", slug: 'women-fashion', iconName: 'Sparkles', badge: 'Trending' },
  { id: 'cat-mobiles', name: 'Mobiles & Audio', slug: 'mobiles', iconName: 'Smartphone' },
  { id: 'cat-electronics', name: 'Electronics', slug: 'electronics', iconName: 'Laptop' },
  { id: 'cat-home-living', name: 'Home & Living', slug: 'home-living', iconName: 'Home' },
  { id: 'cat-appliances', name: 'Smart Appliances', slug: 'appliances', iconName: 'Tv' },
  { id: 'cat-beauty', name: 'Luxury Beauty', slug: 'beauty', iconName: 'Heart', badge: 'Hot' },
  { id: 'cat-footwear', name: 'Sneakers & Shoes', slug: 'footwear', iconName: 'Footprints' },
  { id: 'cat-grocery', name: 'Daily Groceries', slug: 'groceries', iconName: 'ShoppingBag' },
];

export const DESTINATION_LINKS = [
  { id: 'haatza', name: 'HAATZA Marketplace', path: '/haatza' },
  { id: 'lite', name: 'LITE Quick Commerce', path: '/lite', badge: '10-15 Min' },
  { id: 'nest', name: 'NEST Home Services', path: '/nest' },
];
