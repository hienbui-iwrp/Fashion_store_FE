// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductsDataProps } from '@/utils'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsDataProps>
) {
  res.status(200).json({
    totalProducts: 99,
    listProduct: [
      {
        goodsId: '1',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'nữ',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '2',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 0,
        gender: 'nữ',
        age: 'baby',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '3',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'nữ',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '4',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'nữ',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '5',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'nữ',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '6',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'nữ',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '7',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'nữ',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
    ]
  })
}
