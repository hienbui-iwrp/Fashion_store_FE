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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
            quantity: 5,
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
        discount: 0,
        gender: 'man',
        age: 'adult',
        description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`
      },
    ]
  })
}
