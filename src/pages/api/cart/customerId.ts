// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductInCartProps } from '@/utils'
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductInCartProps[]>
) {
  res.status(200).json([
    {
      goodsId: '1',
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'Áo khoác mùa đông a',
      unitPrice: 100000,
      price: 90000,
      quantity: 1,
      size: '36',
      color: 'yellow',
      discount: 10
    },
    {
      goodsId: '2',
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'Áo khoác mùa đông a',
      unitPrice: 100000,
      price: 90000,
      quantity: 1,
      size: '36',
      color: 'yellow',
      discount: 0,
    },
    {
      goodsId: '3',
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'Áo khoác mùa đông a',
      unitPrice: 100000,
      price: 90000,
      quantity: 1,
      size: '36',
      color: 'yellow',
      discount: 10,
    }
  ])
}
