// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  street: string
  ward: string
  distict: string
  province: string
  capacity: string
  empty: string
  manager: string
  staff: number
  createdDate: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: 'k1',
      name: 'Kho 1',
      street: 'Lý thường kiệt',
      ward: 'Phường 14',
      distict: 'quận 10',
      province: 'Tp.HCM',
      capacity: '5000',
      empty: '2000',
      manager: 'VH',
      staff: 7,
      createdDate: new Date('01/12/2022'),
    },
    {
      id: 'k2',
      name: 'Kho 2',
      street: 'Lý thường kiệt',
      ward: 'Phường 14',
      distict: 'quận 10',
      province: 'Tp.HCM',
      capacity: '1000',
      empty: '100',
      manager: 'VH',
      staff: 3,
      createdDate: new Date('01/12/2022'),
    },
  ])
}
