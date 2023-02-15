import React, { useState, useEffect } from 'react';
import { Tabs, Typography, Image, Row, Col, Space } from 'antd';
import Link from 'next/link'
import type { TabsProps } from 'antd';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import styles from './CustomerOrders.module.css'

export interface CustomerOrdersProps {
}
interface OrderProps {
  orderId: string,
  paymentMethod: string;
  listGoods: GoodsOrderProps[],
  totalPrice: number,
  totalDiscount: number,
  status: string,
  shipFee: number,
  statusShip: StatusShipProps[],
  transactionDate: string
}
interface GoodsOrderProps {
  goodsId: string,
  size: string,
  color: string,
  goodsName: string,
  quantity: number,
  price: number,
  tax: number,
  toMoney: number,
  discount: number,
  image: string
}
interface StatusShipProps {
  status: string,
  time: string
}
const { Title, Text } = Typography;

const listOrderItems: OrderProps[] = [
  {
    orderId: '1',
    paymentMethod: 'online',
    listGoods: [{
      goodsId: '1',
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      goodsName: 'Áo khoác thời trang mùa đông 2208B7013',
      price: 100000,
      tax: 5,
      toMoney: 110000,
      quantity: 1,
      size: '36',
      color: 'yellow',
      discount: 10
    }],
    totalPrice: 500000,
    totalDiscount: 100000,
    status: 'string',
    shipFee: 30000,
    statusShip: [
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
    orderId: '22321A',
    paymentMethod: 'online',
    listGoods: [
      {
        goodsId: '1',
        image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsName: 'Áo khoác thời trang mùa đông 2208B7013',
        price: 100000,
        tax: 5,
        toMoney: 110000,
        quantity: 1,
        size: '36',
        color: 'yellow',
        discount: 10
      },
      {
        goodsId: '12',
        image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsName: 'Áo khoác thời trang mùa đông 2208B7013',
        price: 100000,
        tax: 5,
        toMoney: 110000,
        quantity: 1,
        size: '36',
        color: 'yellow',
        discount: 10
      }
    ],
    totalPrice: 500000,
    totalDiscount: 100000,
    status: 'string',
    shipFee: 30000,
    statusShip: [
      {
        status: 'Đơn hàng đã được chuẩn bị',
        time: '1/2/2022'
      },
      {
        status: 'Đơn hàng đã xuất kho Quận Bình Tân',
        time: '1/2/2022'
      }
    ],
    transactionDate: '01/02/2023'
  }
]

function OrderItem(props: OrderProps) {
  return (
    <div className='px-2 pb-4 pt-1 border-t-8 border-[#F1F1F1]'>
      <Link href={`/manage-orders/${props.orderId}`}>
        <div className='flex justify-between items-center'>
          <Text strong className='text-xl pr-4'>
            Đơn #{props.orderId}
          </Text>
          <Text strong className='text-red-600'>
            {props.statusShip[props.statusShip.length - 1].status}
          </Text>
          <Link href='/cart'>
            <ButtonClientPrimary name='Mua lại' />
          </Link>
        </div>
        {props.listGoods.map((item, index) => {
          return (
            <div key={index}>
              <hr className='my-1 font-bold' />
              <div className="flex">
                <Image width={100} height={120} preview={false} className='rounded-xl' src={item.image} alt='' />
                <div className='flex-1 pl-4'>
                  <Row className='flex-1'>
                    <Col span={19}>
                      <Text>
                        {item.goodsName}
                      </Text>
                      <div className='mt-2'>
                        <Space>
                          <Text className='text-[#A9A9A9] flex w-28'>Màu sắc:</Text>
                          <Text className='w-16'>{item.color}</Text>
                        </Space>
                      </div>
                      <div className='mt-2'>
                        <Space>
                          <Text className='text-[#A9A9A9] flex w-28'>Size:</Text>
                          <Text className=' w-16'>{item.size}</Text>
                        </Space>
                      </div>
                      <div className='mt-2'>
                        <Space>
                          <Text className='text-[#A9A9A9] flex w-28'>Số lượng:</Text>
                          <Text className=' w-16'>{item.quantity}</Text>
                        </Space>
                      </div>
                    </Col>
                    <Col span={5}>
                      <div className='flex justify-between items-center mt-8'>
                        {item.discount === 0 ?
                          <Text strong className="text-lg">{item.toMoney} đ</Text> :
                          <div className='flex flex-col leading-none'>
                            <Text strong className="text-lg text-red-600 leading-none">{(item.toMoney * (1 - item.discount / 100)).toFixed(0)} đ</Text>
                            <div>
                              <Text strong className="text-xs line-through text-gray-400 pr-1 leading-none">{item.toMoney} đ</Text>
                              <Text strong className="text-xs leading-none">-{item.discount}%</Text>
                            </div>
                          </div>
                        }
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          )
        })}
      </Link>
    </div>
  )
}

export default function CustomerOrders(props: CustomerOrdersProps) {

  const onChangeTabs = (key: string) => {
    console.log(key);
  };
  const [received, setReceived] = useState(
    <div>
      Chưa có đơn hàng nào đã được nhận
    </div>
  )
  const [nonReceived, setNonReceived] = useState(
    <div>
      Chưa có đơn hàng nào chưa nhận
    </div>
  )
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'CHƯA NHẬN HÀNG',
      children: nonReceived,
    },
    {
      key: '2',
      label: 'ĐÃ NHẬN HÀNG',
      children: received,
    },
  ]

  useEffect(() => {
    if (listOrderItems.length > 0) {
      setNonReceived(
        <div>
          {listOrderItems.map((item, index) => {
            return (
              <OrderItem key={index} {...item} />
            )
          })}
        </div>
      )
    }
    if (listOrderItems.length > 0) {
      setReceived(
        <div>
          {listOrderItems.map((item, index) => {
            return (
              <OrderItem key={index} {...item} />
            )
          })}
        </div>
      )
    }
  }, [])

  return (
    <div className={styles.customerOrders}>
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChangeTabs} />
    </div>
  );
}
