import { api } from '../axios'

const service = '/customer-order-service'
const listOrder = '/list-order'
const order = '/order'

export const getListOrder = async (customerId: string) => {
  return await api
    // .get(service + listOrder + `/${customerId}`, {})
    .get(service + listOrder, {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOrderDetail = async (orderId: string) => {
  return await api
    // .get(service + listOrder + `/${customerId}`, {})
    // .get(service + order + `/${orderId}`, {})
    .get(service + order + '/detail', {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}