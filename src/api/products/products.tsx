import { styles } from '@/utils/toasts';
import { api } from '../axios';
import { Paging, formatResponse, shareBff } from '@/utils';

const products = '/api/products';
const product = '/api/product';

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

export const getAllProductsBff = async (page: Paging) => {
  const payload = `
  <soap:Body>
  <PageSize>${page.pageSize}</PageSize>
  <PageNumber>${page.offset}</PageNumber>
</soap:Body>
    `
  return await shareBff
    .post(`/goods-service/goods-default`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
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

export const getProductDetailBff = async (productId: string) => {
  const payload = `
  <soap:Body>
  <GoodsId>${productId}</GoodsId>
</soap:Body>
    `
  return await shareBff
    .post(`/goods-service/products-detail`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
};