import { apiStaffService } from '@/utils'

export const getStaff = async () => {
  return await apiStaffService
    .get('/staff')
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const filterStaffByName = async (name?: any) => {
  return await apiStaffService
    .get(`/staff?name=${name}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const filterStaffById = async (id?: any) => {
  return await apiStaffService
    .get(`/staff?id=${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('error:', error)
    })
}

export const getStaffDetail = async (id: any) => {
  return await apiStaffService
    .get(`/staff/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getAttendace = async (id: any) => {
  return await apiStaffService
    .get(`/staff/attendance/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const addStaff = async (staff: any) => {
  const birthdate =
    staff.birthdate?.year() +
    '-' +
    (staff.birthdate?.month() + 1) +
    '-' +
    staff.birthdate?.date()

  const record = {
    Name: staff.name,
    Birthdate: birthdate,
    Hometown: staff.hometown,
    CitizenId: staff.citizenId,
    Phone: staff.phone,
    Street: staff.street,
    Ward: staff.ward,
    District: staff.district,
    Province: staff.province,
    WorkingPlace: staff.branchId,
    Role: staff.role,
    Gender: staff.gender,
    Salary: staff.salary,
    Email: staff.email,
  }

  return await apiStaffService
    .post(`/staff`, record)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const updateStaff = async (id: any, staff: any) => {
  const birthdate =
    staff.birthdate?.year() +
    '-' +
    (staff.birthdate?.month() + 1) +
    '-' +
    staff.birthdate?.date()

  const record = {
    Name: staff.name,
    Birthdate: birthdate,
    Hometown: staff.hometown,
    CitizenId: staff.citizenId,
    Phone: staff.phone,
    Street: staff.street,
    Ward: staff.ward,
    District: staff.district,
    Province: staff.province,
    WorkingPlace: staff.branchId,
    Role: staff.role,
    Gender: staff.gender,
    Salary: staff.salary,
    Email: staff.email,
  }

  return await apiStaffService
    .put(`/staff/${id}`, record)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const deleteStaff = async (id: any) => {
  return await apiStaffService
    .delete(`/staff/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getListRequest = async () => {
  return await apiStaffService
    .get(`/request`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const updateRequest = async (id: any, status: string) => {
  return await apiStaffService
    .put(`/request/${id}`, { Status: status })
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}
