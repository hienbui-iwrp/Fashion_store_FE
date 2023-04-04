import { adminBff, formatResponse } from '@/utils'

export const getWarehouseBFF = () => {
  return adminBff
    .post('/goods-service/goods', '')
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}
