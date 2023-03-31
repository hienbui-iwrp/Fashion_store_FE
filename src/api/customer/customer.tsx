import { api } from '../axios'
import { customerBff } from '@/utils';
import { CustomerInfoProps } from '@/utils';
const service = '/customer-service/customer';
const customer = '/customer';
const get = '/get';
const update = '/update';
const add = '/add';

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

export const getCustomerInfoBff = async (customerId: string) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <Username>${customerId}</Username>
    </soap:Body>
  `
  return await customerBff
    .post(service + get, payload)
    .then((res) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
        Data: xml.getElementsByTagName('Data'),
      }
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

export const updateCustomerInfoBff = async (info: CustomerInfoProps) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <Username>${info.username}</Username>
        <Email>${info.email}</Email>
        <Name>${info.name}</Name>
        <Phone>${info.phone}</Phone>
        <Gender>${info.gender}</Gender>
        <Age>${info.age}</Age>
        <Street>${info.street}</Street>
        <Ward>${info.ward}</Ward>
        <District>${info.district}</District>
        <Province>${info.province}</Province>
    </soap:Body>
  `
  return await customerBff
    .post(service + update, payload)
    .then((res) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err);
    });
};