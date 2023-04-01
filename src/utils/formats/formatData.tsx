import {
  AccountProps,
  BranchProps,
  RequestProps,
  StaffProps,
  AttendanceProps,
  CustomerInfoProps,
  EventProps,
} from '../types'
import timeToDate from './timeToDate'

export const formatResponse = (data: any) => {
  const XMLParser = require('react-xml-parser')
  const xml = new XMLParser().parseFromString(data)

  return {
    StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
    Message: xml.getElementsByTagName('Message')[0].value,
    Data: xml.getElementsByTagName('Data'),
  }
}

export const formatUserDataXML = (data: any): CustomerInfoProps => {
  const _data: CustomerInfoProps = {
    username: data.getElementsByTagName('Username')[0].value,
    name: data.getElementsByTagName('Name')[0].value,
    email: data.getElementsByTagName('Email')[0].value,
    phone: data.getElementsByTagName('Phone')[0].value,
    street: data.getElementsByTagName('Street')[0].value,
    ward: data.getElementsByTagName('Ward')[0].value,
    district: data.getElementsByTagName('District')[0].value,
    province: data.getElementsByTagName('Province')[0].value,
    age: Number(data.getElementsByTagName('Age')[0].value),
    gender: data.getElementsByTagName('Gender')[0].value,
  }

  return _data
}

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

export const formatStaffDataXML = (data: any): StaffProps => {
  const _data = data.getElementsByTagName('Data')[0]
  return {
    id: _data.getElementsByTagName('StaffId')[0]?.value,
    name: _data.getElementsByTagName('StaffName')[0]?.value,
    role: _data.getElementsByTagName('Role')[0]?.value,
    branchId: _data.getElementsByTagName('BranchId')[0]?.value,
    citizenId: _data.getElementsByTagName('CitizenId')[0]?.value,
    phone: _data.getElementsByTagName('PhoneNumber')[0]?.value,
    street: _data.getElementsByTagName('Street')[0]?.value,
    ward: _data.getElementsByTagName('Ward')[0]?.value,
    district: _data.getElementsByTagName('District')[0]?.value,
    province: _data.getElementsByTagName('Province')[0]?.value,
    hometown: _data.getElementsByTagName('Hometown')[0]?.value,
    salary: _data.getElementsByTagName('Salary')[0]?.value,
    status: _data.getElementsByTagName('Status')[0]?.value,
    email: _data.getElementsByTagName('Email')[0]?.value,
    gender: _data.getElementsByTagName('Gender')[0]?.value,
    birthdate: new Date(_data.getElementsByTagName('Birthdate')[0]?.value),
    startDate: new Date(_data.getElementsByTagName('StartDate')[0]?.value),
  }
}

export const formatAttendanceDataXML = (data: any): AttendanceProps => {
  const _data = data.getElementsByTagName('Data')[0]

  return {
    date: new Date(_data.getElementsByTagName('AttendanceDate')[0]?.value),
    checkIn: new Date(_data.getElementsByTagName('CheckinTime')[0]?.value),
    checkOut: _data
      .getElementsByTagName('CheckoutTime')[0]
      ?.getElementsByTagName('Valid')[0].value
      ? new Date(
          _data
            .getElementsByTagName('CheckoutTime')[0]
            ?.getElementsByTagName('Time')[0].value
        )
      : undefined,
  }
}

export const formatRequestDataXML = (data: any): RequestProps => {
  return {
    id: data.getElementsByTagName('Id')[0]?.value,
    staffId: data.getElementsByTagName('StaffId')[0]?.value,
    status: data.getElementsByTagName('Status')[0]?.value,
    type: data.getElementsByTagName('RequestType')[0]?.value,
    date: new Date(data.getElementsByTagName('RequestDate')[0]?.value),
  }
}

export const formatEventDataXML = (data: any): EventProps => {
  return {
    id: data.getElementsByTagName('Id')[0]?.value,
    name: data.getElementsByTagName('Name')[0]?.value,
    discount: parseFloat(data.getElementsByTagName('Discount')[0]?.value),
    startTime: data.getElementsByTagName('StartTime')[0]?.value,
    endTime: data.getElementsByTagName('EndTime')[0]?.value,
    image: data.getElementsByTagName('Image')[0]?.value,
    goods: data.getElementsByTagName('Goods').map((item: any) => item.value),
  }
}
