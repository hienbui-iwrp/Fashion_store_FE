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
    },
  ])
}
