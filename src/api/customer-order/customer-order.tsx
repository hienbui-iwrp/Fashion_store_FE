import axios from 'axios';
import { api } from '../axios'
import { customerBff, customerBpel, formatResponse, shareBffCheckWh } from '@/utils';
import { isProcessOrderBefore, namespaceCreateOrderAfter, namespaceCreateOrderBefore, namespaceGetShipFeeAfter, namespaceGetShipFeeBefore } from '@/constants/bpel';

const service = '/api/customer-order-service'; ///order-service/customer/get-list
const listOrder = '/list-order'
const orderService = '/order-service/customer';
const getList = '/get-list';
const getDetail = '/get-detail';



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

export const getListOrderBff = async (customerId: string) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <CustomerId>${customerId}</CustomerId>
    </soap:Body>
  `
  return await customerBff
    .post(orderService + getList, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data);
    })
    .catch((err) => {
      console.log('get list order err: ', err);
    });
};

export const getOrderDetailBff = async (orderId: string) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <OrderId>${orderId}</OrderId>
    </soap:Body>
  `
  return await customerBff
    .post(orderService + getDetail, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data);
    })
    .catch((err) => {
      console.log('get order detail err: ', err);
    });
};

export const getOrderDetail = async (orderId: string) => {
  return await api
    // .get(service + listOrder + `/${customerId}`, {})
    // .get(service + order + `/${orderId}`, {})
    .get(service + '/detail', {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
export const makeOrder = async (orderData: any) => {
  const payload = `
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    	<soap:Body>
        		<ns1:Body xmlns:ns1="${isProcessOrderBefore ? namespaceGetShipFeeBefore : namespaceGetShipFeeAfter}">
            			<ns1:CustomerId>${orderData.customerId}</ns1:CustomerId>
            			<ns1:PaymentMethod>${orderData.paymentMethod}</ns1:PaymentMethod>
            			<ns1:ListElements>
                    ${orderData.goodsList.map((goods: any) => {
    return `<ns1:Elements>
                      <ns1:GoodsCode>${goods.goodsId}</ns1:GoodsCode>
                      <ns1:GoodsColor>${goods.goodsColor}</ns1:GoodsColor>
                      <ns1:GoodsSize>${goods.goodsSize}</ns1:GoodsSize>
                      <ns1:Quantity>${goods.quantity}</ns1:Quantity>
                    </ns1:Elements>`
  }).join('\n')}
                  </ns1:ListElements>
            			<ns1:TotalPrice>${orderData.totalPrice}</ns1:TotalPrice>
            			<ns1:ShipFee>${orderData.shipFee}</ns1:ShipFee>
            			<ns1:TransactionDate>${orderData.transactionDate}</ns1:TransactionDate>
            			<ns1:NameReceiver>${orderData.nameReceiver}</ns1:NameReceiver>
            			<ns1:PhoneReceiver>${orderData.phoneReceiver}</ns1:PhoneReceiver>
            			<ns1:EmailReceiver>${orderData.emailReceiver}</ns1:EmailReceiver>
            			<ns1:Address>
                				<ns1:Province>${orderData.address.province}</ns1:Province>
                				<ns1:District>${orderData.address.district}</ns1:District>
                				<ns1:Ward>${orderData.address.ward}</ns1:Ward>
                				<ns1:Street>${orderData.address.street}</ns1:Street>
            </ns1:Address>
            <ExpectedDate>${orderData.expectedDate}</ExpectedDate>
        </ns1:Body>
    </soap:Body>
</soap:Envelope>`
  console.log(payload);
  return await shareBffCheckWh
    .post('', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
        Data: {
          shipFee: xml.getElementsByTagName('ShipFee')[0].value,
          expectedDate: xml.getElementsByTagName('ExpectedDate')[0].value,
        },
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

export const createOrder = async (orderData: any) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    	<soap:Body>
            			<CustomerId>${orderData.customerId}</CustomerId>
            			<PaymentMethod>${orderData.paymentMethod}</PaymentMethod>
                    ${orderData.goodsList.map((goods: any) => {
    return `<GoodsList>
                      <GoodsId>${goods.goodsId}</GoodsId>
                      <Name>${goods.name}</Name>
                      <Image>${goods.image}</Image>
                      <UnitPrice>${goods.unitPrice}</UnitPrice>
                      <Price>${goods.price}</Price>
                      <Quantity>${goods.quantity}</Quantity>
                      <Size>${goods.goodsSize}</Size>
                      <Color>${goods.goodsColor}</Color>
                      <Discount>${goods.discount / 100}</Discount>
                      <Tax>0.1</Tax>
                    </GoodsList>`
  })}
            			<TotalPrice>${orderData.totalPrice}</TotalPrice>
            			<ShipFee>${orderData.shipFee}</ShipFee>
            			<TransactionDate>${orderData.transactionDate}</TransactionDate>
            			<NameReceiver>${orderData.nameReceiver}</NameReceiver>
            			<PhoneReceiver>${orderData.phoneReceiver}</PhoneReceiver>
            			<EmailReceiver>${orderData.emailReceiver}</EmailReceiver>
            			<Address>
                				<Province>${orderData.address.province}</Province>
                				<District>${orderData.address.district}</District>
                				<Ward>${orderData.address.ward}</Ward>
                				<Street>${orderData.address.street}</Street>
            </Address>
            <ExpectedDate>${orderData.expectedDate}</ExpectedDate>
    </soap:Body>`;
  console.log(payload);
  return await customerBff
    .post('order-service/customer/make-order', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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
    })
}

export const createOrderBpel = async (orderData: any) => {
  const payload = `
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    	<soap:Body>
        		<ns1:Body xmlns:ns1="${isProcessOrderBefore ? namespaceCreateOrderBefore : namespaceCreateOrderAfter}">
                  <ns1:CustomerId>${orderData.customerId}</ns1:CustomerId>
            			<ns1:PaymentMethod>${orderData.paymentMethod}</ns1:PaymentMethod>
                    <ns1:ListElements>
                    ${orderData.goodsList.map((goods: any) => {
    return `<ns1:Elements>
                      <ns1:GoodsCode>${goods.goodsId}</ns1:GoodsCode>
                      <ns1:Name>${goods.name}</ns1:Name>
                      <ns1:Image>${goods.image}</ns1:Image>
                      <ns1:UnitPrice>${goods.unitPrice}</ns1:UnitPrice>
                      <ns1:Price>${goods.price}</ns1:Price>
                      <ns1:Quantity>${goods.quantity}</ns1:Quantity>
                      <ns1:GoodsSize>${goods.goodsSize}</ns1:GoodsSize>
                      <ns1:GoodsColor>${goods.goodsColor}</ns1:GoodsColor>
                      <ns1:Discount>${goods.discount / 100}</ns1:Discount>
                      <ns1:Tax>0.1</ns1:Tax>
                    </ns1:Elements>
                `
  })}
                  </ns1:ListElements>
            			<ns1:TotalPrice>${orderData.totalPrice}</ns1:TotalPrice>
            			<ns1:ShipFee>${orderData.shipFee}</ns1:ShipFee>
            			<ns1:TransactionDate>${orderData.transactionDate}</ns1:TransactionDate>
            			<ns1:NameReceiver>${orderData.nameReceiver}</ns1:NameReceiver>
            			<ns1:PhoneReceiver>${orderData.phoneReceiver}</ns1:PhoneReceiver>
            			<ns1:EmailReceiver>${orderData.emailReceiver}</ns1:EmailReceiver>
            			<ns1:Address>
                				<ns1:Province>${orderData.address.province}</ns1:Province>
                				<ns1:District>${orderData.address.district}</ns1:District>
                				<ns1:Ward>${orderData.address.ward}</ns1:Ward>
                				<ns1:Street>${orderData.address.street}</ns1:Street>
            </ns1:Address>
            <ns1:ExpectedDate>${orderData.expectedDate}</ns1:ExpectedDate>
            </ns1:Body>
    </soap:Body>
</soap:Envelope>`;
  console.log(payload);
  return await customerBpel
    .post('create-order', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      console.log(res.data);
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err);
    })
}