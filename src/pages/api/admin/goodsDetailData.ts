// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  price: number
  cost: number
  supplier: string
  gender: string
  age: string
  type: string
  image: string[]
  classify: { size: string; color: string; containedAt: DataWarehouse[] }[]
}

type DataWarehouse = {
  id: string
  name: string
  createdDate: Date
  updateDate: Date
  quantity: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req

  switch (query.id) {
    case 'g1':
      res.status(200).json({
        id: 'g1',
        image: [
          'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
        ],
        name: 'Áo khoác nam',
        cost: 150000,
        price: 220000,
        supplier: 'Bách khoa',
        gender: 'Nam',
        age: 'Người lớn',
        type: 'Áo khoác',
        classify: [
          {
            size: 'S',
            color: 'Đen',
            containedAt: [
              {
                id: 'w1',
                name: 'Kho quận 10',
                createdDate: new Date('01/01/2022'),
                updateDate: new Date('10/16/2022'),
                quantity: 10,
              },
              {
                id: 'w2',
                name: 'Kho quận 7',
                createdDate: new Date('04/01/2022'),
                updateDate: new Date('12/31/2022'),
                quantity: 15,
              },
            ],
          },
          {
            size: 'L',
            color: 'Đen',
            containedAt: [
              {
                id: 'w2',
                name: 'Kho quận 7',
                createdDate: new Date('04/01/2022'),
                updateDate: new Date('12/31/2022'),
                quantity: 10,
              },
            ],
          },
        ],
      })
      break
    default:
      res.status(200).json({
        id: 'g2',
        image: [
          'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/den2-1663927933961.jpg?v=1663927942000',
          'https://vihey.com/upload/products/product_3803.jpg',
        ],
        name: 'Áo thun',
        price: 140000,
        cost: 150000,
        supplier: 'Bách khoa',
        gender: 'Nam',
        type: 'Áo khoác',
        age: 'Người lớn',
        classify: [
          {
            size: 'S',
            color: 'Đen',
            containedAt: [
              {
                id: 'w1',
                name: 'Kho quận 10',
                createdDate: new Date('01/01/2022'),
                updateDate: new Date('10/16/2022'),
                quantity: 10,
              },
              {
                id: 'w2',
                name: 'Kho quận 7',
                createdDate: new Date('04/01/2022'),
                updateDate: new Date('12/31/2022'),
                quantity: 5,
              },
              {
                id: 'w3',
                name: 'Kho thủ đức',
                createdDate: new Date('04/01/2022'),
                updateDate: new Date('08/30/2022'),
                quantity: 15,
              },
            ],
          },
          {
            size: 'M',
            color: 'Đen',
            containedAt: [
              {
                id: 'w2',
                name: 'Kho quận 7',
                createdDate: new Date('04/01/2022'),
                updateDate: new Date('12/31/2022'),
                quantity: 10,
              },
            ],
          },
        ],
      })
      break
  }
}
