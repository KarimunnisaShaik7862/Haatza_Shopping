export interface FestivalSale {
  id: string;
  name: string;
  headline: string;
  discount: string;
  badge: string;
  ctaText: string;
  link: string;
}

export const FESTIVAL_PROMOTIONS_DATA: FestivalSale[] = [
  {
    id: 'sale-dussehra',
    name: 'Dussehra Mega Utsav',
    headline: 'Grand Festive Celebration Deals on Ethnic & Electronics',
    discount: 'FLAT 50% - 80% OFF',
    badge: 'FESTIVAL SPECIAL',
    ctaText: 'Explore Dussehra Deals',
    link: '/category/fashion',
  },
  {
    id: 'sale-diwali',
    name: 'Diwali Sparkle Sale',
    headline: 'Gold Coins, Smartphones, Audio & Lighting Special',
    discount: 'UP TO 75% OFF + 10% CASHBACK',
    badge: 'BIGGEST SALE',
    ctaText: 'Shop Diwali Deals',
    link: '/category/electronics',
  },
  {
    id: 'sale-pongal',
    name: 'Pongal / Sankranti Edit',
    headline: 'Traditional Silk Sarees, Cookware & Home Makeover',
    discount: 'MIN 40% - 70% OFF',
    badge: 'HARVEST OFFERS',
    ctaText: 'Explore Harvest Sale',
    link: '/category/home-living',
  },
];
