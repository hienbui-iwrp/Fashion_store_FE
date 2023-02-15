import React, { useState } from 'react';
import { Typography, Button, Steps, Timeline, Row, Col, Image, Space, Table } from 'antd';
import styles from './CustomerOrderDetail.module.css'
import FormatMoney from '@/utils/formats';
export interface CustomerOrderDetailProps {

}

const { Title, Text } = Typography

interface OrderProps {
  orderId: string,
  paymentMethod: string;
  listGoods: GoodsOrderProps[],
  totalPrice: number,
  totalDiscount: number,
  status: string,
  shipFee: number,
  statusShip: StatusShipProps[],
  transactionDate: string,
  nameReceiver: string,
  phoneReceiver: string,
  address?: Address
}
interface Address {
  province: string,
  district: string,
  ward: string,
  road: string
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
const OrderDetail: OrderProps = {
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
  nameReceiver: 'Trần Nguyễn',
  phoneReceiver: '0987654321',
  address: {
    province: 'Ho Chi Minh',
    district: 'Quận 1',
    ward: 'phường 13',
    road: '268 Lý Thường Kiệt'
  },
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
}
interface Item {
  key: string;
  name: string;
  content: number | string;
}
const dataSource = [
  {
    key: '1',
    name: 'Tổng tiền hàng',
    content: 320000,
  },
  {
    key: '2',
    name: 'Phí vận chuyển',
    content: 30000
  },
  {
    key: '3',
    name: 'Giảm giá',
    content: 0
  },
  {
    key: '4',
    name: 'Tổng số tiền',
    content: 350000
  },
  {
    key: '5',
    name: 'Phương thức thanh toán',
    content: 2
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <div className='flex justify-end'>
        {text}
      </div>
    )
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    render: (_: any, record: Item) => (
      record.key === '5' ?
        <div className='flex justify-end'>
          {record.content === 1 && 'Thanh toán khi nhận hàng'}
          {record.content === 2 && 'Ví điện tử Momo'}
          {record.content === 3 && 'Ví điện tử VNpay'}
        </div> :
        <div className='flex justify-end'>
          {typeof record.content === 'number' && FormatMoney(record.content)}
        </div>
    )
  }
];

export default function CustomerOrderDetail(props: CustomerOrderDetailProps) {
  const [orderData, setOrderData] = useState({ ...OrderDetail })
  return (
    <div className="w-[800px] m-auto">
      <div className='flex justify-between border-b-8 border-[#F1F1F1]'>
        <Text className='font-bold'>ID Đơn hàng: {orderData.orderId}</Text>
        <Button type='text'>
          <Text className='text-red-600 underline font-bold'>Xuất hóa đơn</Text>
        </Button>
      </div>
      <div className='px-2'>
        <div className='mt-2'>
          <Steps
            current={2}
            labelPlacement="vertical"
            items={[
              {
                title: 'Chuẩn bị hàng'
              },
              {
                title: 'Chờ lấy hàng',
              },
              {
                title: 'Đang giao'
              },
              {
                title: 'Đã giao'
              },
            ]}
          />
        </div>
        <div>
          <Title level={5}>Địa chỉ nhận hàng</Title>
          <Row gutter={8}>
            <Col span={8} className='flex flex-col'>
              <Text>{orderData.nameReceiver}</Text>
              <Text>{orderData.phoneReceiver}</Text>
              <Text>{`${orderData.address?.road}, ${orderData.address?.ward} , ${orderData.address?.district}, ${orderData.address?.province}`}</Text>
            </Col>
            <Col span={16}>
              <Timeline mode='left'>
                {orderData.statusShip.map((item: StatusShipProps, index: number) => {
                  return (
                    <Timeline.Item key={index} label={item.time}>{item.status}</Timeline.Item>
                  )
                })}
              </Timeline>
            </Col>
          </Row>
          {orderData.listGoods.map((item, index) => {
            return (
              <>
                <div className="flex border-b-2 pb-1">
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
              </>
            )
          })}
        </div>
        <Table
          rowKey="name"
          className={styles.tablePrice}
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={columns} />
      </div>
    </div>
  );
}
