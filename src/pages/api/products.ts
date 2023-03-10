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
        gender: 'woman',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '2',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Quần khoác mùa đông a',
        unitPrice: 100000,
        price: 100000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 0,
        gender: 'woman',
        age: 'baby',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '3',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Mũ khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'man',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '4',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 150000,
        price: 135000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'jacket',
        discount: 10,
        gender: 'woman',
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
        type: 'sweater',
        discount: 10,
        gender: 'woman',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '6',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 200000,
        price: 200000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'short',
        discount: 0,
        gender: 'woman',
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
        gender: 'woman',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '8',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 1100000,
        price: 1000000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 10,
        gender: 'woman',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '9',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 2000000,
        price: 2000000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 0,
        gender: 'unisex',
        age: 'baby',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
      {
        goodsId: '10',
        images: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'],
        name: 'Áo khoác mùa đông a',
        unitPrice: 3500000,
        price: 3500000,
        quantity: 1,
        size: ['36', '37', '38'],
        color: ['yellow', 'green', 'red', 'blue'],
        type: 'áo khoác',
        discount: 0,
        gender: 'man',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
    ]
  })
}
