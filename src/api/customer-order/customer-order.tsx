import axios from 'axios';
import { api } from '../axios'
import { shareBffCheckWh } from '@/utils';

const service = '/api/customer-order-service'
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

export const makeOrder = async (orderData: any) => {
  const payload = `
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    	<soap:Body>
        		<ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callNewOrderService/BPELProcess1">
            			<ns1:CustomerId>${orderData.customerId}</ns1:CustomerId>
            			<ns1:PaymentMethod>${orderData.paymentMethod}</ns1:PaymentMethod>
                    ${orderData.goodsList.map((goods: any) => {
    return `<ns1:GoodsList>
                      <ns1:GoodsId>${goods.goodsId}</ns1:GoodsId>
                      <ns1:UnitPrice>${goods.unitPrice}</ns1:UnitPrice>
                      <ns1:Price>${goods.price}</ns1:Price>
                      <ns1:Quantity>${goods.quantity}</ns1:Quantity>
                      <ns1:Size>${goods.size}</ns1:Size>
                      <ns1:Color>${goods.color}</ns1:Color>
                      <ns1:Discount>${goods.discount}</ns1:Discount>
                      <ns1:Tax>${goods.tax}</ns1:Tax>
                    </ns1:GoodsList>`
  })}
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
        </ns1:Body>
    </soap:Body>
</soap:Envelope>`
  // <Note>${orderData.note ? orderData.note : ''}</Note>
  // <ExpectedDelivery>${orderData.expectedDelivery}</ExpectedDelivery>
  console.log(payload);
  return await shareBffCheckWh
    .post('', payload)
    .then((res) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
        Data: xml.getElementsByTagName('Data')[0].value,
      }
    })
    .catch((err) => {
      console.log(err);
    })
}