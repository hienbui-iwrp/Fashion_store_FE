import { formatResponse, shareBff } from '@/utils'

export const getGoodsBFF = () => {
  return shareBff
    .post('/goods-service/goods', '')
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const getGoodsDetailBFF = (id: any) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <GoodsCode>${id}</GoodsCode>
  </soap:Body>`
  return shareBff
    .post('/goods-service/goods-detail', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}
