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
