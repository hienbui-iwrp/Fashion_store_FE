import { adminBff } from '@/utils'

export const getAllAccountBff = async () => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body/>`

  return await adminBff
    .post(`/account-service/account/get`, payload)
    .then((res: any) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
        Data: xml.getElementsByTagName('Data'),
      }
    })
    .catch((err: any) => {
      console.log('Error get all account: ', err)
    })
}
