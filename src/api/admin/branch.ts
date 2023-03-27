import {
  apiBranchService,
  bpelBranch,
  BranchProps,
  formatTime,
  adminBff,
  formatResponse,
} from '@/utils'

export const getBranchBff = async () => {
  const xmls = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <BranchId>1</BranchId>
    </soap:Body>
  `

  return await adminBff
    .post('/branch-service/get-all', xmls)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getBranchDetailBff = async (id: any) => {
  const xmls = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <BranchId>${id}</BranchId>
  </soap:Body>
  `
  return await adminBff
    .post(`/branch-service/get`, xmls)
    .then((res) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return xml.getElementsByTagName('Data')[0]
    })
    .catch((err) => {
      console.log(err)
    })
}

export const addBranchBff = async (branch: BranchProps) => {
  const xmls = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <Name>${branch?.name}</Name>
      <Street>${branch?.street}</Street>
      <Ward>${branch?.ward}</Ward>
      <District>${branch?.district}</District>
      <Province>${branch?.province}</Province>
      <Open>${branch?.openTime && formatTime(branch?.openTime) + ':00'}</Open>
      <Close>${
        branch?.closeTime && formatTime(branch?.openTime) + ':00'
      }</Close>
  </soap:Body>`

  return await adminBff
    .post(`/branch-service/add`, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const updateBranchBff = async (id: any, branch: any) => {
  const openTime = new Date(branch?.openTime ?? '')
  const closeTime = new Date(branch?.closeTime ?? '')

  const xmls = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <BranchId>${id}</BranchId>
      <Name>${branch?.name ?? ''}</Name>
      <Province>${branch?.province ?? ''}</Province>
      <District>${branch?.district ?? ''}</District>
      <Ward>${branch?.ward ?? ''}</Ward>
      <Street>${branch?.street ?? ''}</Street>
      <Open>${branch?.openTime && formatTime(openTime) + ':00'}</Open>
      <Close>${branch?.closeTime && formatTime(closeTime) + ':00'}</Close>
  </soap:Body>
  `
  return await adminBff
    .post(`/branch-service/update`, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      // console.log(xml.getElementsByTagName('StatusCode')[0]);
      // console.log(xml.getElementsByTagName('Message')[0]);
      // console.log(xml.getElementsByTagName('Data')[0]);
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteBranchBff = async (id: any) => {
  const xmls = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <BranchId>${id}</BranchId>
  </soap:Body>
  `
  return await adminBff
    .post(`/branch-service/delete`, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      // console.log(xml.getElementsByTagName('StatusCode')[0]);
      // console.log(xml.getElementsByTagName('Message')[0]);
      // console.log(xml.getElementsByTagName('Data')[0]);
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getBranchBpel = async () => {
  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callBranchService/getAllBranch"/>
                </soap:Body>
              </soap:Envelope>`

  return await bpelBranch
    .post('', xmls)
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

export const getBranchDetailBpel = async (id: any) => {
  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
    <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callBranchService/getBranchDetail">
        <ns1:BranchId>${id}</ns1:BranchId>
    </ns1:Body>
</soap:Body>
</soap:Envelope>`
  return await bpelBranch
    .post(``, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return xml.getElementsByTagName('Data')[0]
    })
    .catch((err) => {
      console.log(err)
    })
}

export const addBranchBpel = async (branch: BranchProps) => {
  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
        <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callBranchService/addBranch">
              <ns1:Name>${branch?.name}</ns1:Name>
              <ns1:Province>${branch?.province}</ns1:Province>
              <ns1:District>${branch?.district}</ns1:District>
              <ns1:Ward>${branch?.ward}</ns1:Ward>
              <ns1:Street>${branch?.street}</ns1:Street>
              <ns1:Open>${
                branch?.openTime && formatTime(branch?.openTime) + ':00'
              }</ns1:Open>
              <ns1:Close>${
                branch?.closeTime && formatTime(branch?.openTime) + ':00'
              }</ns1:Close>
    </ns1:Body>
</soap:Body>
</soap:Envelope>`
  return await bpelBranch
    .post(``, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const updateBranchBpel = async (id: any, branch: any) => {
  const openTime = new Date(branch?.openTime ?? '')
  const closeTime = new Date(branch?.closeTime ?? '')

  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
      <ns1:Body xmlns:ns1 = "http://xmlns.oracle.com/bpel_process/callBranchService/updateBranch">
        <BranchId>${id}</BranchId>
        <Name>${branch?.name ?? ''}</Name>
        <Province>${branch?.province ?? ''}</Province>
        <District>${branch?.district ?? ''}</District>
        <Ward>${branch?.ward ?? ''}</Ward>
        <Street>${branch?.street ?? ''}</Street>
        <Open>${branch?.openTime && formatTime(openTime) + ':00'}</Open>
        <Close>${branch?.closeTime && formatTime(closeTime) + ':00'}</Close>
      </ns1:Body>
      </soap:Body>
  </soap:Envelope>`
  return await bpelBranch
    .post(``, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      // console.log(xml.getElementsByTagName('StatusCode')[0]);
      // console.log(xml.getElementsByTagName('Message')[0]);
      // console.log(xml.getElementsByTagName('Data')[0]);
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteBranchBpel = async (id: any) => {
  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
      <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callBranchService/deleteBranch">
          <ns1:BranchId>${id}</ns1:BranchId>
      </ns1:Body>
  </soap:Body>
</soap:Envelope>`
  return await bpelBranch
    .post(``, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      console.log(res)
      const XMLParser = require('react-xml-parser')
      const xml = new XMLParser().parseFromString(res.data)
      // console.log(xml.getElementsByTagName('StatusCode')[0]);
      // console.log(xml.getElementsByTagName('Message')[0]);
      // console.log(xml.getElementsByTagName('Data')[0]);
      return {
        StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
        Message: xml.getElementsByTagName('Message')[0].value,
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getBranch = async () => {
  return await apiBranchService
    .get('')
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getBranchDetail = async (id: any) => {
  return await apiBranchService
    .get(`/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}
