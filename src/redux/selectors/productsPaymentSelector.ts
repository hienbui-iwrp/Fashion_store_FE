import { RootState } from '@/utils/types';
import { ProductDetailDataProps } from '@/utils'

export const selectProductsPayment = (state: RootState) => {
  return state.productsPayment;
};
