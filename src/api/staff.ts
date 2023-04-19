import { adminBff, formatResponse } from '@/utils'

export const getStaffBff = async (keyword?: any) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <StaffId>${keyword ?? ''}</StaffId>
      <StaffName>${keyword ?? ''}</StaffName>
  </soap:Body>
  `

  return await adminBff
    .post('staff-service/get-staff', payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const getAttendaceBff = async (id: any) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <StaffId>${id}</StaffId>
  </soap:Body>
  `
  return await adminBff
    .post(`staff-service/get-staff-attendance`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getStaffDetailBFF = async (id: any) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <StaffId>${id}</StaffId>
  </soap:Body>
  `
  return await adminBff
    .post(`staff-service/get-staff-detail`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const addStaffBFF = async (staff: any) => {
  const birthdate =
    staff.birthdate?.year() +
    '-' +
    (staff.birthdate?.month() + 1) +
    '-' +
    staff.birthdate?.date()

  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <Name>${staff.name}</Name>
      <Birthdate>${birthdate}</Birthdate>
      <Hometown>${staff.hometown}</Hometown>
      <CitizenId>${staff.citizenId}</CitizenId>
      <Phone>${staff.phone}</Phone>
      <Street>${staff.street}</Street>
      <Ward>${staff.ward}</Ward>
      <District>${staff.district}</District>
      <Province>${staff.province}</Province>
      <WorkingPlace>${staff.branchId}</WorkingPlace>
      <Role>${staff.role}</Role>
      <Gender>${staff.gender}</Gender>
      <Salary>${staff.salary}</Salary>
      <Email>${staff.email}</Email>
  </soap:Body>
  `

  return await adminBff
    .post(`/staff-service/add-staff`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const updateStaffBFF = async (id: any, staff: any) => {
  const birthdate =
    staff.birthdate?.year() +
    '-' +
    (staff.birthdate?.month() + 1) +
    '-' +
    staff.birthdate?.date()

  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
  <Name>${staff.name}</Name>
      <StaffId>${id}</StaffId>
      <Birthdate>${birthdate}</Birthdate>
      <Hometown>${staff.hometown}</Hometown>
      <CitizenId>${staff.citizenId}</CitizenId>
      <Phone>${staff.phone}</Phone>
      <Street>${staff.street}</Street>
      <Ward>${staff.ward}</Ward>
      <District>${staff.district}</District>
      <Province>${staff.province}</Province>
      <WorkingPlace>${staff.branchId}</WorkingPlace>
      <Role>${staff.role}</Role>
      <Gender>${staff.gender}</Gender>
      <Salary>${staff.salary}</Salary>
  </soap:Body>
  `

  return await adminBff
    .post(`/staff-service/update-staff`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getListRequestBFF = async () => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body/>
  `
  return await adminBff
    .post(`/staff-service/get-request-list`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const updateRequestBFF = async (id: any, status: string) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <RequestId>${id}</RequestId>
        <Status>${status}</Status>
    </soap:Body>
  `
  return await adminBff
    .post(`/staff-service/update-request-status`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const deleteStaffBFF = async (id: any) => {
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <StaffId>${id}</StaffId>
    </soap:Body>
  `
  return await adminBff
    .post(`/staff-service/delete-staff`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
