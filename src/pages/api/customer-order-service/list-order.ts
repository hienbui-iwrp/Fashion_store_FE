// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderProps } from '@/utils'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderProps[]>
) {
  res.status(200).json([
    {
      orderId: '1',
      paymentMethod: 'momo',
      listGoods: [{
        goodsId: '1',
        image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        name: 'Áo khoác mùa đông a',
        unitPrice: 100000,
        price: 90000,
        quantity: 1,
        size: '36',
        color: 'yellow',
        discount: 10
      }],
      totalPrice: 500000,
      totalGoods: 3,
      totalDiscount: 100000,
      isCompleted: false,
      shipFee: 30000,
      statusShips: [
        {
          status: 'Đơn hàng đã được chuẩn bị',
          time: '1/2/2022'
        },
        {
          status: 'Đơn hàng đã xuất kho Quận Bình Thạnh',
          time: '1/2/2022'
        }
      ],
      transactionDate: '01/02/2023'
    },
    {
      orderId: '2',
      paymentMethod: 'paypal',
      listGoods: [
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
          discount: 10
        },
      ],
      totalPrice: 500000,
      totalGoods: 3,
      totalDiscount: 100000,
      isCompleted: true,
      shipFee: 30000,
      statusShips: [
        {
          status: 'Đơn hàng đã được chuẩn bị',
          time: '1/2/2022'
        },
        {
          status: 'Đơn hàng đã xuất kho Quận Bình Thạnh',
          time: '1/2/2022'
        }
      ],
      transactionDate: '01/02/2023'
    },
    {
      orderId: '3',
      paymentMethod: 'offline',
      listGoods: [
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
          discount: 10
        },
      ],
      totalPrice: 500000,
      totalGoods: 3,
      totalDiscount: 100000,
      isCompleted: true,
      shipFee: 30000,
      statusShips: [
        {
          status: 'Đơn hàng đã được chuẩn bị',
          time: '1/2/2022'
        },
        {
          status: 'Đơn hàng đã xuất kho Quận Bình Thạnh',
          time: '1/2/2022'
        }
      ],
      transactionDate: '01/02/2023'
    },
  ])
}
