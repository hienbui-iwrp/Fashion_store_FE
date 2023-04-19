import { styles } from '@/utils/toasts';
import { api } from '../axios';
import { Paging, formatResponse, shareBff, shareBpel } from '@/utils';

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

export const getAllProductsBpel = async (page?: Paging) => {
  const pageSizeProductsDefault = 1000;
  const payload = `
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    	<soap:Body>
        		<ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/CallProductDefault/CallProductDefault">
            			<ns1:PageSize>${page?.pageSize ? page?.pageSize : pageSizeProductsDefault}</ns1:PageSize>
            			<ns1:PageNumber>${page?.offset ? page?.offset : 1}</ns1:PageNumber>
        </ns1:Body>
    </soap:Body>
</soap:Envelope>
    `
  return await shareBpel
    .post(`/products-default`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
};

export const getAllProductsBff = async (page?: Paging) => {
  const pageSizeProductsDefault = 1000;
  const payload = `
  <soap:Body>
  <PageSize>${page?.pageSize ? page?.pageSize : pageSizeProductsDefault}</PageSize>
  <PageNumber>${page?.offset ? page?.offset : 1}</PageNumber>
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

export const searchProductsBff = async (productName: string, pageSize?: number) => {
  const pageSizeDefault = 100;
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
<soap:Body>
    <Query>${productName}</Query>
    <PageSize>${pageSize ? pageSize : pageSizeDefault}</PageSize>
</soap:Body>
    `;
  return await shareBff
    .post(`/goods-service/goods-search`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
};

export const getNewProductsBff = async (pageSize?: number) => {
  const typeNewProducts = 2;
  const pageSizeDefault = 4;
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
<soap:Body>
    <PageSize>${pageSize ? pageSize : pageSizeDefault}</PageSize>
    <Category>${typeNewProducts}</Category>
</soap:Body>
    `
  return await shareBff
    .post(`/goods-service/goods-search`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
};

export const getBestSellerProductsBff = async (pageSize?: number) => {
  const typeBestSeller = 1;
  const pageSizeDefault = 4;
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
<soap:Body>
    <PageSize>${pageSize ? pageSize : pageSizeDefault}</PageSize>
    <Category>${typeBestSeller}</Category>
</soap:Body>
    `
  return await shareBff
    .post(`/goods-service/goods-search`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
};

export const getProductDetail = async (productId: string) => {
  return await api
    .get(product + `/detail`, {})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductDetailBpel = async (productId: string) => {
  const payload = `
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    	<soap:Body>
        		<ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/CallProductService/CallProductService">
            			<ns1:GoodsId>${productId}</ns1:GoodsId>
        </ns1:Body>
    </soap:Body>
</soap:Envelope>
    `
  return await shareBpel
    .post(`/products-detail`, payload)
    .then((res) => {
      console.log(res.data);
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
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