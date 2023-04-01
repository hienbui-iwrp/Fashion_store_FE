import { adminBff, formatResponse } from '@/utils'

export const getAllAccountBff = async () => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body/>`

  return await adminBff
    .post(`/account-service/account/get`, payload)
    .then((res: any) => {
      return formatResponse(res.data)
    })
    .catch((err: any) => {
      console.log('Error get all account: ', err)
    })
}

export const addAccountBff = async (
  username: string,
  password: string,
  role: number
) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <Username>${username}</Username>
      <Password>${password}</Password>
      <Role>${role}</Role>
  </soap:Body>`

  console.log('payload:', payload)

  return await adminBff
    .post(`/account-service/account/add`, payload)
    .then((res: any) => {
      console.log('res:', res)
      return formatResponse(res.data)
    })
    .catch((err: any) => {
      console.log('Error get all account: ', err)
    })
}

export const updateRoleBff = async (username: string, role: number) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <Username>${username}</Username>
      <Role>${role}</Role>
  </soap:Body>`

  return await adminBff
    .post(`/account-service/account/role/update`, payload)
    .then((res: any) => {
      return formatResponse(res.data)
    })
    .catch((err: any) => {
      console.log('Error get all account: ', err)
    })
}
