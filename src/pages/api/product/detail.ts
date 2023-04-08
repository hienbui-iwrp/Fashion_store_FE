// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductDetailDataProps } from '@/utils'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductDetailDataProps>
) {
  res.status(200).json({
    goodsId: '1',
    images: [
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    ],
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    price: 90000,
    listQuantity: [
      {
        size: '36',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '36',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '37',
        color: 'trắng',
        quantity: 0,
      },
      {
        size: '37',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '37',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '37',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '38',
        color: 'trắng',
        quantity: 10,
      },
      {
        size: '38',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '38',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '38',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '39',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '39',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'đen',
        quantity: 5,
      },
    ],
    type: 'áo khoác',
    discount: 10,
    tax: 10,
    gender: 'nữ',
    age: 'adult',
    description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
  })
}
