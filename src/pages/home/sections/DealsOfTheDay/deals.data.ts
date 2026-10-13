import { mockProducts } from '../../../../services/mock/data/products';

export const DEALS_OF_THE_DAY_DATA = mockProducts.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 40);
export default DEALS_OF_THE_DAY_DATA;
