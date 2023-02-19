import { BranchProps, RequestProps, StaffProps } from '../types'
import timeToDate from './timeToDate'

export const formatBranchData = (data: any): BranchProps => {
  const _data: BranchProps = {
    id: data?.BranchCode,
    name: data?.BranchName,
    street: data?.BranchStreet,
    ward: data?.BranchWard,
    district: data?.BranchDistrict,
    province: data?.BranchProvince,
    createdAt: new Date(data.CreatedAt),
    openTime: timeToDate(data?.OpenTime),
    closeTime: timeToDate(data?.CloseTime),
    manager: data?.Manager,
    image: data?.Image,
  }

  return _data
}

export const formatStaffData = (data: any): StaffProps => {
  return {
    id: data?.StaffId,
    name: data?.StaffName,
    role: data?.Role,
    branchId: data?.BranchId,
    citizenId: data?.CitizenId,
    phone: data?.PhoneNumber,
    street: data?.Street,
    ward: data?.Ward,
    district: data?.District,
    province: data?.Province,
    birthdate: new Date(data?.Birthdate),
    hometown: data?.Hometown,
    salary: data?.Salary,
    startDate: new Date(data?.StartDate),
    account: data?.Account,
    status: data?.Status,
    email: data?.Email,
    gender: data?.Gender,
  }
}

export const formatRequestData = (data: any): RequestProps => {
  return {
    id: data.Id,
    staffId: data.StaffId,
    status: data.Status,
    type: data.RequestType,
    date: new Date(data.RequestDate),
  }
}
