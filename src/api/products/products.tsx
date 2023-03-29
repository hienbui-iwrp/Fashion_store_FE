import { styles } from '@/utils/toasts';
import { api } from '../axios';

const products = '/api/products';
const product = '/product';

export const getAllProducts = async () => {
  return await api
    .get(products, {})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductDetail = async (productId: string) => {
  return await api
    // .get(product + `/${productId}`, {})
    .get(product + `/detail`, {})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};