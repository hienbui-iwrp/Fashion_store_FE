import { RootState } from '@/utils/types';
import { ProductDetailDataProps } from '@/utils'

export const selectProducts = (state: RootState) => {
  return state.products;
};

export const selectProductsByCategory = (category: string[], state: RootState) => {
  return state.products.filter((item: ProductDetailDataProps) =>  category.includes(item.type));
};
