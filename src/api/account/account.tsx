import { adminBff, bpelAccount } from '@/utils'
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

  return await adminBff
    .post('/account-service/account/sign-in', payload)
    .then((res) => {
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      console.log('check', xml.getElementsByTagName('Data'))
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
        Data: xml.getElementsByTagName('Data'),
      }
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
  return await adminBff
    .post('/account-service/account/sign-up', xmls)
    .then((res) => {
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      console.log('check', xml.getElementsByTagName('Data'))
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
        Data: xml.getElementsByTagName('Data'),
      }
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
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
        Data: xml.getElementsByTagName('Data'),
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
