// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  branch: string
  createdDate: Date
  goods: Goods[]
  tax: number
  discount: number
  staff?: string
  user?: string
  nameUser?: string
  street?: string
  ward?: string
  district?: string
  province?: string
  ship?: number
}

type Goods = {
  name: string
  price: number
  quantity: number
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
    case 'o1':
      res.status(200).json({
        id: 'o1',
        branch: 'b1',
        staff: 'Văn A',
        goods: [
          {
            name: 'Áo khoác',
            price: 100000,
            quantity: 1,
          },
        ],
        tax: 20000,
        discount: 0,
        createdDate: new Date('01/01/2022'),
      })
      break

    case 'oo1':
      res.status(200).json({
        id: 'oo1',
        branch: 'b1',
        user: 'u1',
        nameUser: 'Văn A',
        goods: [
          {
            name: 'Áo khoác',
            price: 100000,
            quantity: 1,
          },
        ],
        street: 'Lý Thường Kiệt',
        ward: 'Phường 14',
        district: 'Quận 10',
        province: 'TP. HCM',
        tax: 20000,
        discount: 0,
        ship: 20000,
        createdDate: new Date('01/01/2022'),
      })
      break
    case 'oo2':
      res.status(200).json({
        id: 'oo2',
        branch: 'b1',
        user: 'u2',
        nameUser: 'Văn Anh',
        goods: [
          {
            name: 'Áo khoác',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Áo thun',
            price: 120000,
            quantity: 1,
          },
        ],
        street: 'Lý Thường Kiệt',
        ward: 'Phường 14',
        district: 'Quận 10',
        province: 'TP. HCM',
        tax: 20000,
        discount: 0,
        ship: 20000,
        createdDate: new Date('01/01/2022'),
      })
      break

    default:
      res.status(200).json({
        id: 'o2',
        branch: 'b1',
        staff: 'Văn Anh',
        goods: [
          {
            name: 'Áo khoác',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Áo thun',
            price: 120000,
            quantity: 1,
          },
        ],
        tax: 20000,
        discount: 0,
        createdDate: new Date('01/12/2022'),
      })
      break
  }
}
