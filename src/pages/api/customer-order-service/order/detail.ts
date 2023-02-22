// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderDetailProps } from '@/utils'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderDetailProps>
) {
  res.status(200).json(
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
      totalOrder: 120000,
      status: 2,
      nameReceiver: 'Trần Nguyễn',
      phoneReceiver: '0987654321',
      address: {
        province: 'Ho Chi Minh',
        district: 'Quận 1',
        ward: 'phường 13',
        street: '268 Lý Thường Kiệt'
      },
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
    }
  )
}
