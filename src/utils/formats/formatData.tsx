import { AccountProps, BranchProps, RequestProps, StaffProps } from '../types'
import timeToDate from './timeToDate'

export const formatBranchDataXML = (data: any): BranchProps => {
  const _data: BranchProps = {
    id: data.getElementsByTagName('BranchCode')[0].value,
    name: data.getElementsByTagName('BranchName')[0].value,
    street: data.getElementsByTagName('BranchStreet')[0].value,
    ward: data.getElementsByTagName('BranchWard')[0].value,
    district: data.getElementsByTagName('BranchDistrict')[0].value,
    province: data.getElementsByTagName('BranchProvince')[0].value,
    createdAt: new Date(data.getElementsByTagName('CreatedAt')[0].value),
    openTime: timeToDate(data.getElementsByTagName('OpenTime')[0].value),
    closeTime: timeToDate(data.getElementsByTagName('CloseTime')[0].value),
    manager: data.getElementsByTagName('Manager')[0].value,
    image: data.getElementsByTagName('Image')[0]?.value,
  }

  return _data
}

export const formatBranchDataXML2 = (data: any): BranchProps => {
  const _data: BranchProps = {
    id: data.getElementsByTagName('BranchId')[0].value,
    name: data.getElementsByTagName('Name')[0].value,
    street: data.getElementsByTagName('Street')[0].value,
    ward: data.getElementsByTagName('Ward')[0].value,
    district: data.getElementsByTagName('District')[0].value,
    province: data.getElementsByTagName('Province')[0].value,
    createdAt: new Date(data.getElementsByTagName('CreatedAt')[0].value),
    openTime: timeToDate(data.getElementsByTagName('Open')[0].value),
    closeTime: timeToDate(data.getElementsByTagName('Close')[0].value),
    manager: data.getElementsByTagName('Manager')[0].value,
    image: data.getElementsByTagName('Image')[0]?.value,
  }

  return _data
}

export const formatAccountDataXML = (data: any): AccountProps => {
  const _data: any = {
    id: data.getElementsByTagName('Id')[0].value,
    username: data.getElementsByTagName('Username')[0].value,
    role: data.getElementsByTagName('Role')[0].value,
    phoneNumber: data.getElementsByTagName('PhoneNumber')[0].value,
    startDate: new Date(data.getElementsByTagName('StartDate')[0].value),
    street: data.getElementsByTagName('Street')[0].value,
    ward: data.getElementsByTagName('Ward')[0].value,
    district: data.getElementsByTagName('District')[0].value,
    province: data.getElementsByTagName('Province')[0].value,
    name: data.getElementsByTagName('Name')[0].value,
    isActivated: data.getElementsByTagName('isActivated')[0].value,
    createdAt: new Date(data.getElementsByTagName('CreatedAt')[0].value),
  }
  return _data
}

// ----------OLD------------
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
