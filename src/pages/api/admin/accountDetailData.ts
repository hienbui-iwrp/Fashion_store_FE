// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  account: string
  name: string
  phone: string
  dateOfBirth: Date
  address: string
  createdDate: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req

  switch (id) {
    case '1':
      res.status(200).json({
        id: '1',
        name: 'Vinh Hiển',
        account: 'vinhhien25',
        phone: '0123456789',
        dateOfBirth: new Date('01/01/2001'),
        address: 'Tp.HCM',
        createdDate: new Date('01/01/2022'),
      })
      break
    case '2':
      res.status(200).json({
        id: '2',
        name: 'VH',
        account: 'VH25',
        phone: '0001001011',
        dateOfBirth: new Date('01/01/2002'),
        address: 'Tp.HCM',
        createdDate: new Date('01/12/2022'),
      })
      break
    case '3':
      res.status(200).json({
        id: '3',
        name: 'BLVH',
        account: 'VH',
        phone: '98761234',
        dateOfBirth: new Date('02/03/2001'),
        address: 'Bình Dương',
        createdDate: new Date('01/01/2021'),
      })
      break
    case '4':
      res.status(200).json({
        id: '4',
        name: 'Bùi A',
        account: 'A.bui',
        phone: '999222993',
        dateOfBirth: new Date('02/03/1999'),
        address: 'Bình Dương',
        createdDate: new Date('02/03/2021'),
      })
      break
    case '5':
      res.status(200).json({
        id: '5',
        name: 'VH',
        account: 'VH25',
        phone: '0001001011',
        dateOfBirth: new Date('01/01/2002'),
        address: 'Tp.HCM',
        createdDate: new Date('01/12/2022'),
      })
      break
    default:
      res.status(200).json({
        id: '676767776',
        name: 'BLVH',
        account: 'VH',
        phone: '98761234',
        dateOfBirth: new Date('02/03/2001'),
        address: 'Bình Dương',
        createdDate: new Date('01/01/2021'),
      })
      break
  }
}
