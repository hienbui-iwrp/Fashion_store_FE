import { styles } from '@/utils/toasts';
import { api } from '../axios';
import { ProductInCartProps, customerBff, formatResponse } from '@/utils';

const cartService = '/cart-service';
const get = '/get-cart';
const add = '/add-goods';
const update = '/update-goods';
const deleteGoods = '/delete-goods';
const deleteAll = '/delete-all-goods';
const cart = '/api/cart';

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

export const getCartBff = async (customerId: string) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <UserId>${customerId}</UserId>
    </soap:Body>
  `
  return await customerBff
    .post(cartService + get, payload)
    .then((res) => {
      return formatResponse(res.data);
    })
    .catch((err) => {
      console.log('get cart err: ', err);
    });
};

export const addGoodsBff = async (customerId: string, product: ProductInCartProps) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <CartId>${customerId}</CartId>
      ${`<Goods>
          <GoodsId>${product.goodsId}</GoodsId>
          <GoodsColor>${product.goodsColor}</GoodsColor>
          <GoodsSize>${product.goodsSize}</GoodsSize>
          <Quantity>${product.quantity}</Quantity>
      </Goods>`}
  </soap:Body>
  `
  console.log('payload', payload);
  return await customerBff
    .post(cartService + add, payload)
    .then((res) => {
      return formatResponse(res.data);
    })
    .catch((err) => {
      console.log('add cart err: ', err);
    });
};

export const updateCartBff = async (cartId: string, products: ProductInCartProps[]) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <CartId>${cartId}</CartId>
      ${products.map((product) => {
    return `<Goods>
          <GoodsId>${product.goodsId}</GoodsId>
          <GoodsColor>${product.goodsColor}</GoodsColor>
          <GoodsSize>${product.goodsSize}</GoodsSize>
          <Quantity>${product.quantity}</Quantity>
      </Goods>`
  }).join()}
  </soap:Body>
  `
  return await customerBff
    .post(cartService + update, payload)
    .then((res) => {
      return formatResponse(res.data);
    })
    .catch((err) => {
      console.log('update cart err: ', err);
    });
};

export const deleteGoodsBff = async (cartId: string, products: ProductInCartProps[]) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <CartId>${cartId}</CartId>
      ${products.map((product) => {
    return `<Goods>
          <GoodsId>${product.goodsId}</GoodsId>
          <GoodsColor>${product.goodsColor}</GoodsColor>
          <GoodsSize>${product.goodsSize}</GoodsSize>
      </Goods>`
  }).join()}
  </soap:Body>
  `
  return await customerBff
    .post(cartService + deleteGoods, payload)
    .then((res) => {
      return formatResponse(res.data);
    })
    .catch((err) => {
      console.log('delete goods err: ', err);
    });
};


export const deleteAllGoodsBff = async (cartId: string) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <CartId>${cartId}</CartId>
    </soap:Body>
  `
  return await customerBff
    .post(cartService + deleteAll, payload)
    .then((res) => {
      return formatResponse(res.data);
    })
    .catch((err) => {
      console.log('delete cart err: ', err);
    });
};

export const addToCart = async (product: ProductInCartProps) => {
  return await api
    // .get(product + `/${productId}`, {})
    .post(cart + `/detail`, { ...product })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};