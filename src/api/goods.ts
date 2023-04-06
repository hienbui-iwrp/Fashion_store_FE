import {
  GoodsClassifyProps,
  GoodsProps,
  adminBff,
  formatResponse,
  shareBff,
} from '@/utils'

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

  return adminBff
    .post('/goods-service/goods/update', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const importGoodsBff = (
  goods: GoodsClassifyProps,
  quantity: string,
  supplier: string,
  warehouseId: string
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <GoodsCode>${goods.id}</GoodsCode>
      <GoodsSize>${goods.size}</GoodsSize>
      <GoodsColor>${goods.color}</GoodsColor>
      <Quantity>${quantity}</Quantity>
      <From>${supplier}</From>
      <To>${warehouseId}</To>
  </soap:Body>`

  return adminBff
    .post('/goods-service/goods/import', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const exportGoodsBff = (
  goods: GoodsClassifyProps,
  quantity: string,
  supplier: string,
  orderId: string
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <GoodsCode>${goods.id}</GoodsCode>
      <GoodsSize>${goods.size}</GoodsSize>
      <GoodsColor>${goods.color}</GoodsColor>
      <Quantity>${quantity}</Quantity>
      <From>${supplier}</From>
      <To>${orderId}</To>
  </soap:Body>`
  console.log(payload)
  return adminBff
    .post('/goods-service/goods/export', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const tranferGoodsBff = (
  goods: GoodsClassifyProps,
  quantity: string,
  warehouseIdExport: string,
  warehouseIdImport: string
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <GoodsCode>${goods.id}</GoodsCode>
      <GoodsSize>${goods.size}</GoodsSize>
      <GoodsColor>${goods.color}</GoodsColor>
      <Quantity>${quantity}</Quantity>
      <From>${warehouseIdExport}</From>
      <To>${warehouseIdImport}</To>
  </soap:Body>`

  return shareBff
    .post('/goods-service/wh-transfer', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const returnGoodsBff = (
  goods: GoodsClassifyProps,
  quantity: string,
  warehouseId: string,
  supplier: string
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
<soap:Body>
    <GoodsCode>${goods.id}</GoodsCode>
    <GoodsSize>${goods.size}</GoodsSize>
    <GoodsColor>${goods.color}</GoodsColor>
    <Quantity>${quantity}</Quantity>
    <From>${warehouseId}</From>
    <To>${supplier}</To>
</soap:Body>`

  return adminBff
    .post('/goods-service/goods/return-manufact', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}

export const customerReturnGoodsBff = (
  goods: GoodsClassifyProps,
  quantity: string,
  customerId: string,
  warehouseId: string
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
<soap:Body>
    <GoodsCode>${goods.id}</GoodsCode>
    <GoodsSize>${goods.size}</GoodsSize>
    <GoodsColor>${goods.color}</GoodsColor>
    <Quantity>${quantity}</Quantity>
    <From>${customerId}</From>
    <To>${warehouseId}</To>
</soap:Body>`

  return adminBff
    .post('/goods-service/goods/cust-return', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getGoodsBFF err: ', err)
    })
}
