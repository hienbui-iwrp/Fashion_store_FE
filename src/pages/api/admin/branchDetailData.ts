// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  address: string
  manager: string
  area: number
  staff: number
  startTime: Date
  endTime: Date
  image?: string
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
        name: 'chi nhánh 1',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        manager: 'Vinh Hiển',
        area: 200,
        staff: 10,
        startTime: startTime,
        endTime: endTime,
        image:
          'https://img.freepik.com/premium-photo/women-s-fashion-store-shopping-center_1112-9608.jpg?w=2000',
      })
      break
    case '2':
      res.status(200).json({
        id: '2',
        name: 'chi nhánh 2',
        address: 'Tp.HCM',
        manager: 'Vinh Hiển',
        area: 100,
        staff: 5,
        startTime: startTime,
        endTime: endTime,
      })
      break
    case '3':
      res.status(200).json({
        id: '3',
        name: 'chi nhánh 3',
        address: 'Bình Dương',
        manager: 'Vinh Hiển',
        area: 500,
        staff: 50,
        startTime: startTime,
        endTime: endTime,
        image:
          'https://maison-decor.vn/upload/products_image/cici-clothes-shop-products-image-280-1602044693-79N2D.jpg',
      })
      break
    default:
      res.status(200).json({
        id: '110101',
        name: 'chi nhánh Tào lao',
        address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương',
        manager: 'Vinh Hiển',
        area: 10,
        staff: 1,
        startTime: startTime,
        endTime: endTime,
        image:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      })
      break
  }
}
