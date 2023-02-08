// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  price: number
  cost: number
  supplier: string
  gender: string
  type: string
  age: string
  color: string
  size: string
  image: string[]
  quantity?: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: 'g1',
      image: [
        'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
      ],
      name: 'Áo khoác nam',
      cost: 150000,
      price: 220000,
      supplier: 'Bách khoa',
      gender: 'Nam',
      type: 'Áo khoác',
      age: 'Người lớn',
      color: 'Đen',
      size: 'S',
      quantity: 10,
    },
    {
      id: 'g1',
      image: [
        'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
      ],
      name: 'Áo khoác nam',
      cost: 150000,
      price: 220000,
      supplier: 'Bách khoa',
      gender: 'Nam',
      type: 'Áo khoác',
      age: 'Người lớn',
      color: 'Đen',
      size: 'L',
      quantity: 15,
    },
    {
      id: 'g1',
      image: [
        'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
      ],
      name: 'Áo khoác nam',
      cost: 150000,
      price: 220000,
      supplier: 'Bách khoa',
      gender: 'Nam',
      type: 'Áo khoác',
      age: 'Người lớn',
      color: 'Đen',
      size: 'M',
      quantity: 10,
    },
    {
      id: 'g1',
      image: [
        'https://bucket.nhanh.vn/store/7136/ps/20210223/23252021102512_IMG_2460.jpg',
      ],
      name: 'Áo khoác nam',
      cost: 150000,
      price: 220000,
      supplier: 'Bách khoa',
      gender: 'Nam',
      type: 'Áo khoác',
      age: 'Người lớn',
      color: 'Đen',
      size: 'XL',
      quantity: 30,
    },
    {
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
      color: 'Đen',
      size: 'S',
      quantity: 10,
    },
    {
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
      color: 'Đen',
      size: 'M',
      quantity: 20,
    },
  ])
}
