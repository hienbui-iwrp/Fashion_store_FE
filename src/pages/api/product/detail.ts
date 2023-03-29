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
    quantity: 111,
    size: ['36', '37', '38'],
    color: ['yellow', 'green', 'red', 'blue'],
    type: 'áo khoác',
    discount: 10,
    tax: 10,
    gender: 'nữ',
    age: 'adult',
    description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
  })
}
