import { api } from '../axios'
import { Paging, formatResponse, shareBff, shareBpel } from '@/utils'
import {
  isProductDefaultAfter,
  isProductDetailAfter,
  namespaceProductDefaultAfter,
  namespaceProductDefaultBefore,
  namespaceProductDetailAfter,
  namespaceProductDetailBefore,
} from '@/constants'

const products = '/api/products'
const product = '/api/product'

export const getAllProducts = async () => {
  return await api
    .get(products, {})
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getAllProductsBpel = async (page?: Paging) => {
  const pageSizeProductsDefault = 1000
  const payload = `
  <${!isProductDefaultAfter ? 'soap:' : ''}Envelope xmlns${
    !isProductDefaultAfter ? ':soap' : ''
  }="http://schemas.xmlsoap.org/soap/envelope/">
    	<${!isProductDefaultAfter ? 'soap:' : ''}Body>
        		<${!isProductDefaultAfter ? 'ns1:' : ''}Body xmlns${
    !isProductDefaultAfter ? ':ns1' : ''
  }="${
    isProductDefaultAfter
      ? namespaceProductDefaultAfter
      : namespaceProductDefaultBefore
  }">
            			<${!isProductDefaultAfter ? 'ns1:' : ''}PageSize>${
    page?.pageSize ? page?.pageSize : pageSizeProductsDefault
  }</${!isProductDefaultAfter ? 'ns1:' : ''}PageSize>
            			<${!isProductDefaultAfter ? 'ns1:' : ''}PageNumber>${
    page?.offset ? page?.offset : 1
  }</${!isProductDefaultAfter ? 'ns1:' : ''}PageNumber>
        </${!isProductDefaultAfter ? 'ns1:' : ''}Body>
    </${!isProductDefaultAfter ? 'soap:' : ''}Body>
</${!isProductDefaultAfter ? 'soap:' : ''}Envelope>
    `
  console.log(payload)
  return await shareBpel
    .post(`/products-default`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
}

export const getAllProductsBff = async (page?: Paging) => {
  const pageSizeProductsDefault = 1000
  const payload = `
  <soap:Body>
  <PageSize>${
    page?.pageSize ? page?.pageSize : pageSizeProductsDefault
  }</PageSize>
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
}

export const searchProductsBff = async (
  productName: string,
  pageSize?: number
) => {
  const pageSizeDefault = 100
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
<soap:Body>
    <Query>${productName}</Query>
    <PageSize>${pageSize ? pageSize : pageSizeDefault}</PageSize>
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
}

export const getNewProductsBff = async (pageSize?: number) => {
  const typeNewProducts = 2
  const pageSizeDefault = 4
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
}

export const getBestSellerProductsBff = async (pageSize?: number) => {
  const typeBestSeller = 1
  const pageSizeDefault = 4
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
}

export const getProductDetail = async (productId: string) => {
  return await api
    .get(product + `/detail`, {})
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getProductDetailBpel = async (productId: string) => {
  const payload = `
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    	<soap:Body>
        		<ns1:Body xmlns:ns1="${
              isProductDetailAfter
                ? namespaceProductDetailAfter
                : namespaceProductDetailBefore
            }">
            			<ns1:GoodsId>${productId}</ns1:GoodsId>
        </ns1:Body>
    </soap:Body>
</soap:Envelope>
    `
  return await shareBpel
    .post(`/products-detail`, payload)
    .then((res) => {
      console.log(res.data)
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getAllProducts err: ', err)
    })
}

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
}
