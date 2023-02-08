// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  discount: number
  startTime: Date
  endTime: Date
  goods: Goods[]
  image: string
}
type Goods = {
  id: string
  name: string
  cost: number
  price?: number
  supplier?: string
  gender?: string
  type?: string
  age?: string
  color: string
  size: string
  image?: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
  } = req
  console.log(req.query)

  switch (id) {
    case 'e1':
      res.status(200).json({
        id: 'e1',
        name: 'Tuần lễ Giáng sinh',
        startTime: new Date('12/20/2022 00:00'),
        discount: 20,
        endTime: new Date('12/27/2022 23:59'),
        image: 'https://hc.com.vn/i/ecommerce/media/ckeditor_2925202.jpg',
        goods: [
          {
            id: 'g1',
            image: [
              'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
            ],
            name: 'Áo khoác nam',
            cost: 220000,
            color: 'Đen',
            size: 'S',
          },
          {
            id: 'g2',
            image: [
              'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/den2-1663927933961.jpg?v=1663927942000',
            ],
            name: 'Áo thun',
            cost: 140000,
            color: 'Đen',
            size: 'S',
          },
          {
            id: 'g1',
            image: [
              'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
            ],
            name: 'Áo khoác nam',
            cost: 320000,
            color: 'Đen',
            size: 'M',
          },
          {
            id: 'g2',
            image: [
              'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/den2-1663927933961.jpg?v=1663927942000',
            ],
            name: 'Áo thun',
            cost: 130000,
            color: 'Đen',
            size: 'M',
          },
        ],
      })
      break
    default:
      res.status(200).json({
        id: 'e2',
        name: 'Xuân Quý Mão',
        startTime: new Date('01/22/2023'),
        discount: 15,
        endTime: new Date('01/25/2023'),
        image: 'https://hc.com.vn/i/ecommerce/media/ckeditor_2925202.jpg',
        goods: [
          {
            id: 'g1',
            image: [
              'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
            ],
            name: 'Áo khoác nam',
            cost: 220000,
            color: 'Đen',
            size: 'M',
          },
          {
            id: 'g2',
            image: [
              'https://bizweb.dktcdn.net/thumb/large/100/415/697/products/den2-1663927933961.jpg?v=1663927942000',
            ],
            name: 'Áo thun',
            cost: 140000,
            color: 'Đen',
            size: 'M',
          },
        ],
      })
      break
  }
}
