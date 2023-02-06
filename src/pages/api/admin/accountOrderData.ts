// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  status: string
  total: number
  createdDate: Date
  goods: { id: string; name: string; price: number; quantity: number }[]
  tax: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: '1',
      status: 'Đang giao',
      total: 400000,
      createdDate: new Date('01/01/2022'),
      tax: 40000,
      goods: [
        { id: '1', name: 'Áo khoác', price: 200000, quantity: 1 },
        { id: '2', name: 'Áo thun', price: 100000, quantity: 2 },
      ],
    },
    {
      id: '2',
      status: 'Đang giao',
      total: 200000,
      createdDate: new Date('01/01/2022'),
      tax: 40000,
      goods: [{ id: '1', name: 'Áo khoác', price: 200000, quantity: 1 }],
    },
    {
      id: '3',
      status: 'Đã xong',
      total: 300000,
      createdDate: new Date('01/01/2022'),
      tax: 40000,
      goods: [{ id: '2', name: 'Áo thun', price: 100000, quantity: 3 }],
    },
  ])
}
