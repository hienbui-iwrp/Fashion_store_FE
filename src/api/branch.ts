import { BranchProps, formatTime, adminBff, formatResponse } from '@/utils'

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
      return formatResponse(res.data)
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
      return formatResponse(res.data)
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
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getBranchStaffBff = async (id: any) => {
  const xmls = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <BranchId>${id}</BranchId>
  </soap:Body>
  `
  return await adminBff
    .post(`/branch-service/staff/get`, xmls, {
      headers: { 'Content-Type': 'text/xml' },
    })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}
