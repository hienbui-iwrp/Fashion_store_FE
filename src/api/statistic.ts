import { FormatDateYearFirst, adminBff, formatResponse } from '@/utils'

export const getStatisticAllBFF = (data: {
  start?: Date
  end?: Date
  branch?: string
}) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>/
    <soap:Body>
        <Start>${FormatDateYearFirst(data.start)}</Start>
        <End>${FormatDateYearFirst(data.end)}</End>
        ${data.branch ? `<BranchId>${data.branch}</BranchId>` : ''}
    </soap:Body>
  `

  return adminBff
    .post('/statistic-service/overall-stat', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const getRevenueBFF = (data: {
  start?: Date
  end?: Date
  branch: string[]
  gender: string[]
  type: string[]
}) => {
  const branchPayload = data.branch.reduce(
    (acc, item) => acc + '\n' + `<BranchId>${item}</BranchId>`,
    ''
  )
  const genderPayload = data.gender.reduce(
    (acc, item) => acc + '\n' + `<Gender>${item}</Gender>`,
    ''
  )
  const typePayload = data.type.reduce(
    (acc, item) => acc + '\n' + `<Type>${item}</Type>`,
    ''
  )
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <Start>${FormatDateYearFirst(data.start)}</Start>
        <End>${FormatDateYearFirst(data.end)}</End>
        ${branchPayload}
        ${genderPayload}
        ${typePayload}
    </soap:Body>
  `

  return adminBff
    .post('/statistic-service/revenue', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const getProfitBFF = (data: {
  start?: Date
  end?: Date
  branch: string[]
  gender: string[]
  type: string[]
}) => {
  const branchPayload = data.branch.reduce(
    (acc, item) => acc + '\n' + `<BranchId>${item}</BranchId>`,
    ''
  )
  const genderPayload = data.gender.reduce(
    (acc, item) => acc + '\n' + `<Gender>${item}</Gender>`,
    ''
  )
  const typePayload = data.type.reduce(
    (acc, item) => acc + '\n' + `<Type>${item}</Type>`,
    ''
  )
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body> 
        <Start>${FormatDateYearFirst(data.start)}</Start>
        <End>${FormatDateYearFirst(data.end)}</End>
        ${branchPayload}
        ${genderPayload}
        ${typePayload}
    </soap:Body>
  `

  return adminBff
    .post('/statistic-service/profit', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const getRevenue1GoodsBFF = (data: {
  start?: Date
  end?: Date
  goods: string
}) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <Start>${FormatDateYearFirst(data.start)}</Start>
        <End>${FormatDateYearFirst(data.end)}</End>
        <GoodsId>${data.goods}</GoodsId>
    </soap:Body>
  `

  return adminBff
    .post('/statistic-service/revenue-goods', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const getProfit1GoodsBFF = (data: {
  start?: Date
  end?: Date
  goods: string
}) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <Start>${FormatDateYearFirst(data.start)}</Start>
        <End>${FormatDateYearFirst(data.end)}</End>
        <GoodsId>${data.goods}</GoodsId>
    </soap:Body>
  `

  return adminBff
    .post('/statistic-service/profit-goods', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error('error:', error)
    })
}
