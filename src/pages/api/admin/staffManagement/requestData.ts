// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type StaffData = {
  id?: string
  name: string
  citizenId: string
  phone: string
  address: string
  dateOfBirth: Date
  homeTown: string
  workLocation: string
  role: string
  salary: number
  startDate: Date
  account?: string
}

type Data = {
  id: string
  staff: StaffData
  status: 'accepted' | 'rejected' | 'waiting'
  type: 'add' | 'remove'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const startTime = new Date()
  startTime.setHours(8)
  startTime.setMinutes(0)

  res.status(200).json([
    {
      id: '1',
      staff: {
        id: '1',
        name: 'Vinh Hiển',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đông hòa, Dĩ An, Bình Dương',
        dateOfBirth: new Date('01/01/2001'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 1',
        role: 'Quản lý',
        salary: 10000000,
        startDate: new Date('01/01/2022'),
        account: 'vinhhien123',
      },
      status: 'waiting',
      type: 'remove',
    },
    {
      id: '2',
      staff: {
        id: '2',
        name: 'VH',
        citizenId: '543213124545',
        phone: '123456789',
        address: 'Đông hòa, Dĩ An, Bình Dương',
        dateOfBirth: new Date('01/01/2000'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 2',
        role: 'Nhân viên',
        salary: 5000000,
        startDate: new Date('01/01/2022'),
      },
      status: 'waiting',
      type: 'remove',
    },
    {
      id: '3',
      staff: {
        id: '3',
        name: 'BLVH',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đông hòa, Dĩ An, Bình Dương',
        dateOfBirth: new Date('01/01/2005'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 3',
        role: 'Nhân viên',
        salary: 7000000,
        startDate: new Date('01/01/2022'),
      },
      status: 'waiting',
      type: 'remove',
    },
    {
      id: '4',
      staff: {
        id: '4',
        name: 'H',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        dateOfBirth: new Date('12/12/2012'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 1',
        role: 'Nhân viên',
        salary: 8000000,
        startDate: new Date('01/12/2022'),
      },
      status: 'waiting',
      type: 'remove',
    },
    {
      id: '5',
      staff: {
        id: '5',
        name: 'H',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        dateOfBirth: new Date('12/12/2012'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 1',
        role: 'Nhân viên',
        salary: 8000000,
        startDate: new Date('01/12/2022'),
      },
      status: 'waiting',
      type: 'remove',
    },
    {
      id: '6',
      staff: {
        name: 'H',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        dateOfBirth: new Date('12/12/2012'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 1',
        role: 'Nhân viên',
        salary: 8000000,
        startDate: new Date('01/12/2022'),
      },
      status: 'waiting',
      type: 'add',
    },
    {
      id: '7',
      staff: {
        name: 'Vinh Hien',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        dateOfBirth: new Date('12/12/2012'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 1',
        role: 'Nhân viên',
        salary: 8000000,
        startDate: new Date('01/12/2022'),
      },
      status: 'waiting',
      type: 'add',
    },
    {
      id: '8',
      staff: {
        name: 'Hien bui',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        dateOfBirth: new Date('12/12/2012'),
        homeTown: 'Daklak',
        workLocation: 'Chi nhánh 1',
        role: 'Nhân viên',
        salary: 8000000,
        startDate: new Date('01/12/2022'),
      },
      status: 'waiting',
      type: 'add',
    },
  ])
}
