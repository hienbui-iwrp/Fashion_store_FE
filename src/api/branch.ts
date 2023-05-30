import { BranchProps, formatTime, adminBff, formatResponse } from '@/utils'

export const getBranchBff = async () => {
  const xmls = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <BranchId>1</BranchId>
    </soap:Body>
  `

  return await adminBff
    .post('/branch-service/get-all', xmls, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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
    .post(`/branch-service/get`, xmls, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
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
      <Close>${branch?.closeTime && formatTime(branch?.closeTime) + ':00'
    }</Close>
  </soap:Body>`

  return await adminBff
    .post(`/branch-service/add`, xmls, {
      headers: { 'Content-Type': 'text/xml', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
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
      headers: { 'Content-Type': 'text/xml', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
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
      headers: { 'Content-Type': 'text/xml', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
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
      headers: { 'Content-Type': 'text/xml', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}
