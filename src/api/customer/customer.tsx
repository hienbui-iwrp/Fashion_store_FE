import { api } from '../axios'
import { CustomerInfoProps } from '@/utils';
const service = '/customer-service'
const customer = '/customer'

export const getCustomerInfo = async () => {
  return await api
    // .get(service + customer + `/${customerId}`)
    .get(service + customer, {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCustomerInfo = async (info: CustomerInfoProps) => {
  return await api
    // .get(service + customer + `/${customerId}`)
    .post(service + customer, { ...info })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCustomerInfo = async (info: CustomerInfoProps) => {
  return await api
    // .get(service + customer + `/${customerId}`)
    .put(service + customer, { ...info })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};