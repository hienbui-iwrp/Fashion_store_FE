import { styles } from '@/utils/toasts';
import { api } from '../axios';
import { ProductInCartProps } from '@/utils';

const cartService = '/cart-service';
const cart = '/cart';

export const getCart = async (customerId: string) => {
  return await api
    // .get(cartService + cart + `/${customerId}`, {})
    .get(cart + `/customerId`, {})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addToCart = async (product: ProductInCartProps) => {
  return await api
    // .get(product + `/${productId}`, {})
    .post(product + `/detail`, {})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};