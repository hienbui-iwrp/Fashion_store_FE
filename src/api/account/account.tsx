import { adminBff, formatResponse, shareBff } from '@/utils'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'
const accountService = '/bpel-account-service'

export const signInBff = async (account: {
  Username: string
  Password: string
}) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <Username>${account.Username}</Username>
        <Password>${account.Password}</Password>
    </soap:Body>
  `

  return await shareBff
    .post('/account-service/account/sign-in', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const signUpBff = async (account: {
  username: string
  email: string
  name: string
  phoneNumber: string
  password: string
}) => {
  const xmls = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <Username>${account.username}</Username>
      <Password>${account.password}</Password>
      <Email>${account.email}</Email>
      <Name>${account.name}</Name>
      <Phone>${account.phoneNumber}</Phone>
  </soap:Body>
`
  return await shareBff
    .post('/account-service/account/sign-up', xmls)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const signIn = async (account: {
  Username: string
  Password: string
}) => {
  return await axios
    .post('http://localhost:3000/account-service' + '/sign-in', { ...account })
    .then((response) => {
      console.log(response)
      return response.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getAllAccount = async () => {
  let xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
      <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callAccountService/getListAccount"/>
  </soap:Body>
</soap:Envelope>`
  return await axios
    .post(baseUrl + accountService, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      formatResponse(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

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

export const changePasswordAdminBFF = async (data: {
  username?: string
  oldPass: string
  newPass: string
}) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
<soap:Body>
    <Username>${data.username ?? ''}</Username>
    <OldPassword>${data.oldPass}</OldPassword>
    <NewPassword>${data.newPass}</NewPassword>
</soap:Body>`

  return await adminBff
    .post(`/account-service/account/change-password`, payload)
    .then((res: any) => {
      return formatResponse(res.data)
    })
    .catch((err: any) => {
      console.log('Error get all account: ', err)
    })
}
