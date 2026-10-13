import { Category, DestinationType } from '../types';
import { mockCategories } from './mock/data/categories';

export const categoryService = {
  async getCategories(destination?: DestinationType): Promise<Category[]> {
    if (destination) {
      return mockCategories.filter((c) => c.destination === destination);
    }
    return [...mockCategories];
  },

  async getFeaturedCategories(destination?: DestinationType): Promise<Category[]> {
    let list = mockCategories.filter((c) => c.isFeatured);
    if (destination) {
      list = list.filter((c) => c.destination === destination);
    }
    return list;
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (slug === 'under-49') {
      return {
        id: 'cat-under-49',
        slug: 'under-49',
        name: '₹49 Store',
        iconName: 'Tag',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        destination: 'haatza',
        itemCount: 18,
        description: 'Unbeatable budget finds! Everyday essentials, hair accessories, braided laces, and lifestyle steals for ₹49.',
        subcategories: [
          { id: 'sub-49-all', name: 'All ₹49 Deals', slug: 'under-49' },
          { id: 'sub-49-fash', name: 'Fashion & Accessories', slug: 'fashion' },
          { id: 'sub-49-gadgets', name: 'Desk & Gadgets', slug: 'electronics' },
          { id: 'sub-49-beauty', name: 'Beauty Care', slug: 'beauty' },
          { id: 'sub-49-home', name: 'Home Essentials', slug: 'home-living' },
        ],
        isFeatured: true,
      };
    }

    if (slug === 'deals') {
      return {
        id: 'cat-deals',
        slug: 'deals',
        name: 'Deals of the Day',
        iconName: 'Zap',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        destination: 'haatza',
        itemCount: 35,
        description: 'Handpicked daily discounted bestsellers across electronics, fashion, beauty and home.',
        subcategories: [],
        isFeatured: true,
      };
    }

    const found = mockCategories.find((c) => c.slug === slug || c.id === slug);
    return found ? { ...found } : null;
  },
};
