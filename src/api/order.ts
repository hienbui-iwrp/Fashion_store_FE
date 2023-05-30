import { adminBff, formatResponse } from '@/utils'

export const getOnlineOrdersBFF = () => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>  
    </soap:Body>`
  return adminBff
    .post('/order-service/admin/get-online-orders', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getOnlineOrdersBFF err: ', err)
    })
}

export const getOfflineOrdersBFF = () => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>  
    </soap:Body>`
  return adminBff
    .post('/order-service/admin/get-offline-orders', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getOnlineOrdersBFF err: ', err)
    })
}

export const getOrdersDetailBFF = (id: any) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>  
        <OrderId>${id}</OrderId>
    </soap:Body>`
  return adminBff
    .post('/order-service/admin/get-order-detail', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getOnlineOrdersBFF err: ', err)
    })
}

export const getOrderCustomerBFF = async (customerId: string) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <CustomerId>${customerId}</CustomerId>
    </soap:Body>
  `
  return adminBff
    .post('/order-service/admin/customer-order', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getOrderCustomerBFF err: ', err)
    })
}
