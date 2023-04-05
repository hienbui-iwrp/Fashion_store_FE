import { GoodsProps, adminBff, formatResponse, shareBff } from '@/utils'

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

export const getGoodsInWarehouseBFF = (id: any) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <GoodsCode>${id}</GoodsCode>
  </soap:Body>`
  return adminBff
    .post('/goods-service/goods/get-warehouse', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const addGoodsBff = (
  goods: GoodsProps,
  sizes: string[],
  colors: string[]
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
  ${sizes.reduce(
    (accSize: string, size: string) =>
      accSize +
      '\n' +
      colors.reduce(
        (accColor: string, color: string) =>
          accColor +
          '\n' +
          `
    <Element>
        <GoodsSize>${size}</GoodsSize>
        <GoodsColor>${color}</GoodsColor>
        <GoodsName>${goods.name}</GoodsName>
        <GoodsType>${goods.type}</GoodsType>
        <GoodsGender>${goods.gender}</GoodsGender>
        <GoodsAge>${goods.age}</GoodsAge>
        <Manufacturer>${goods.supplier}</Manufacturer>
        <IsForSale>${true}</IsForSale>
        <UnitPrice>${goods.price}</UnitPrice>
        <UnitCost>${goods.cost}</UnitCost>
        <Description>${goods.description}</Description>
      </Element>`,
        ''
      ),
    ''
  )}
  </soap:Body>`

  return adminBff
    .post('/goods-service/goods/add', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const updateGoodsBff = (
  id: any,
  goods: GoodsProps,
  sizes: string[],
  colors: string[]
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
  ${sizes.reduce(
    (accSize: string, size: string) =>
      accSize +
      '\n' +
      colors.reduce(
        (accColor: string, color: string) =>
          accColor +
          '\n' +
          `
    <Element>
        <GoodsCode>${id}</GoodsCode>
        <GoodsSize>${size}</GoodsSize>
        <GoodsColor>${color}</GoodsColor>
        <GoodsName>${goods.name}</GoodsName>
        <GoodsType>${goods.type}</GoodsType>
        <GoodsGender>${goods.gender}</GoodsGender>
        <GoodsAge>${goods.age}</GoodsAge>
        <Manufacturer>${goods.supplier}</Manufacturer>
        <UnitPrice>${goods.price}</UnitPrice>
        <UnitCost>${goods.cost}</UnitCost>
        <Description>${goods.description}</Description>
      </Element>`,
        ''
      ),
    ''
  )}
  </soap:Body>`

  console.log('payload :', payload)
  return adminBff
    .post('/goods-service/goods/update', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}
