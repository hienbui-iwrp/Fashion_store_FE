// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  citizenId: string
  phone: string
  address: string
  dateOfBirth: Date
  homeTown: string
  workingLocation: string
  role: string
  salary: number
  startDate: Date
  account?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req
  console.log(req)

  const startTime = new Date()
  startTime.setHours(8)
  startTime.setMinutes(0)
  const endTime = new Date()
  endTime.setHours(23)
  startTime.setMinutes(0)

  switch (id) {
    case '1':
      res.status(200).json({
        id: '1',
        name: 'Vinh Hiển',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đông hòa, Dĩ An, Bình Dương',
        dateOfBirth: new Date('01/01/2001'),
        homeTown: 'Daklak',
        workingLocation: 'Chi nhánh 1',
        role: 'Quản lý',
        salary: 10000000,
        startDate: new Date('01/01/2022'),
        account: 'vinhhien123',
      })
      break
    case '2':
      res.status(200).json({
        id: '2',
        name: 'VH',
        citizenId: '543213124545',
        phone: '123456789',
        address: 'Đông hòa, Dĩ An, Bình Dương',
        dateOfBirth: new Date('01/01/2000'),
        homeTown: 'Daklak',
        workingLocation: 'Chi nhánh 2',
        role: 'Nhân viên',
        salary: 5000000,
        startDate: new Date('01/01/2022'),
      })
      break
    case '3':
      res.status(200).json({
        id: '1',
        name: 'BLVH',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đông hòa, Dĩ An, Bình Dương',
        dateOfBirth: new Date('01/01/2005'),
        homeTown: 'Daklak',
        workingLocation: 'Chi nhánh 3',
        role: 'Nhân viên',
        salary: 7000000,
        startDate: new Date('01/01/2022'),
      })
      break
    default:
      res.status(200).json({
        id: '110101',
        name: 'H',
        citizenId: '19293563365',
        phone: '000100100',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        dateOfBirth: new Date('12/12/2012'),
        homeTown: 'Daklak',
        workingLocation: 'Chi nhánh 1',
        role: 'Nhân viên',
        salary: 8000000,
        startDate: new Date('01/12/2022'),
      })
      break
  }
}
