import React from 'react';
import { ProductGallery as BaseProductGallery } from '../../components/products/ProductGallery';

export interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = (props) => {
  return <BaseProductGallery {...props} />;
};

export default ProductGallery;
