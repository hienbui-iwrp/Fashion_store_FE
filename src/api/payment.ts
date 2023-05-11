import { adminBff, formatResponse } from '@/utils'
import axios from "axios";
import { api } from './axios';
import { configVNPay } from '@/constants/config';
import moment from 'moment';

export const getOnlineOrdersBFF = () => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>  
    </soap:Body>`
  return adminBff
    .post('/order-service/admin/get-online-orders', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getOnlineOrdersBFF err: ', err)
    })
}

function sortObject(obj: any) {
  let sorted: any = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const handlePayment = async (amount: number) => {
  let date = new Date();
  let expire = new Date();
  expire.setHours(expire.getHours() + 2);
  let createDate = moment(date).format('YYYYMMDDHHmmss');
  var expireDate = moment(expire).format('YYYYMMDDHHmmss');

  let ipAddr = '127.0.0.1';
  // let ipAddr = req.headers['x-forwarded-for'] ||
  //     req.socket.remoteAddress ||
  //     req.socket.remoteAddress ||
  //     req.socket.socket.remoteAddress;

  let tmnCode = configVNPay['vnp_TmnCode'];
  let secretKey = configVNPay['vnp_HashSecret'];
  let vnpUrl = configVNPay['vnp_Url'];
  let returnUrl = configVNPay['vnp_ReturnUrl'];
  let orderId = moment(date).format('DDHHmmss');
  // let amount = req.body.amount;
  // let bankCode = req.body.bankCode;

  let locale = 'vn';
  // let locale = req.body.language;
  // if (locale === null || locale === '') {
  //     locale = 'vn';
  // }
  let currCode = 'VND';
  let vnp_Params: any = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  // vnp_Params['vnp_ExpireDate'] = expireDate;
  // if (bankCode !== null && bankCode !== '') {
  //     vnp_Params['vnp_BankCode'] = bankCode;
  // }

  vnp_Params = sortObject(vnp_Params);

  let querystring = require('qs');
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;
  console.log(vnp_Params);
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
  console.log(vnpUrl);
  // console.log(res.data)

  // res.redirect(vnpUrl)
  window.location.href = vnpUrl;
}
export const VNPay = (amount: number) => {
  handlePayment(amount);
};