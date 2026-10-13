import { DestinationType } from './product.types';

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  itemCount?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  image: string;
  destination: DestinationType;
  itemCount: number;
  description: string;
  subcategories: SubCategory[];
  isFeatured?: boolean;
}
