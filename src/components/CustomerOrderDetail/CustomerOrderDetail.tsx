import React, { useEffect, useState, useRef } from 'react';
import Invoice from '@/components/Invoice';
import { useRouter } from 'next/router';
import { Typography, Button, Steps, Timeline, Row, Col, Image, Space, Table, Modal } from 'antd';
import styles from './CustomerOrderDetail.module.css'
import { FormatMoney } from '@/utils/formats';
import { getOrderDetail } from '@/api/customer-order';
import { OrderDetailProps } from '@/utils';
import { useReactToPrint } from 'react-to-print';
import Loading from '@/components/Loading';
import { checkLogin } from '@/utils/check';

export interface CustomerOrderDetailProps {

}

const { Title, Text } = Typography

const OrderDetail: OrderDetailProps = {
  orderId: '',
  paymentMethod: '',
  listGoods: [{
    goodsId: '',
    image: '',
    name: '',
    unitPrice: 0,
    price: 0,
    quantity: 0,
    size: '',
    color: '',
    discount: 0
  }],
  totalPrice: 0,
  totalGoods: 0,
  totalDiscount: 0,
  isCompleted: false,
  shipFee: 0,
  totalOrder: 0,
  status: 0,
  nameReceiver: '',
  phoneReceiver: '',
  address: {
    province: '',
    district: '',
    ward: '',
    street: ''
  },
  statusShips: [],
  transactionDate: ''
}
interface Item {
  key: string;
  name: string;
  content: number | string;
}
//@ts-ignore
// const ComponentToPrint = React.forwardRef((props, ref) => {
//   return (
//     <div ref={ref}>My cool content here!</div>
//   );
// });
export default function CustomerOrderDetail(props: CustomerOrderDetailProps) {
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [data, setData] = useState<OrderDetailProps>({
    orderId: '',
    paymentMethod: '',
    listGoods: [{
      goodsId: '',
      image: '',
      name: '',
      unitPrice: 0,
      price: 0,
      quantity: 0,
      size: '',
      color: '',
      discount: 0
    }],
    totalPrice: 0,
    totalGoods: 0,
    totalDiscount: 0,
    isCompleted: false,
    shipFee: 0,
    totalOrder: 0,
    status: 0,
    nameReceiver: '',
    phoneReceiver: '',
    address: {
      province: '',
      district: '',
      ward: '',
      street: ''
    },
    statusShips: [],
    transactionDate: ''
  })
  const [tablePayment, setTablePayment] = useState<Item[]>([
    {
      key: '1',
      name: 'Tổng tiền hàng',
      content: 0,
    },
    {
      key: '2',
      name: 'Phí vận chuyển',
      content: 0
    },
    {
      key: '3',
      name: 'Giảm giá',
      content: 0
    },
    {
      key: '4',
      name: 'Tổng số tiền',
      content: 0
    },
    {
      key: '5',
      name: 'Phương thức thanh toán',
      content: 'offline'
    },
  ]);

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
            {record.content === 'offline' && 'Thanh toán khi nhận hàng'}
            {record.content === 'momo' && 'Ví điện tử Momo'}
            {record.content === 'vnpay' && 'Ví điện tử VNpay'}
          </div> :
          <div className='flex justify-end'>
            {typeof record.content === 'number' && FormatMoney(record.content)}
          </div>
      )
    }
  ];
  const route = useRouter();
  const orderId = route.asPath.split('/').at(-1);
  console.log(orderId);
  const fetchData = () => {
    getOrderDetail(orderId || '')
      .then((res) => {
        setData(res?.data);
        setTablePayment([
          { ...tablePayment[0], content: res?.data.totalPrice },
          { ...tablePayment[1], content: res?.data.shipFee },
          { ...tablePayment[2], content: res?.data.totalDiscount },
          { ...tablePayment[3], content: res?.data.totalOrder },
          { ...tablePayment[4], content: res?.data.paymentMethod },
        ])
        setLoading(false)
      })
  }
  useEffect(() => {
    checkLogin(router)
    fetchData();
  }, [])

  const [orderData, setOrderData] = useState({ ...OrderDetail })
  return (
    loading ? <Loading /> :
      <div className="w-[800px] m-auto">
        <Modal
          title={null}
          closable
          open={isModalOpen}
          onCancel={handleCancel}
          width={'fit-content'}
          footer={null}
        >
          <Button type='text' onClick={handlePrint}>
            <Text className='text-red-600 underline font-bold'>In hóa đơn</Text>
          </Button>
          <Invoice {...data} ref={componentRef} />
        </Modal>
        <div className='flex justify-between border-b-8 border-[#F1F1F1]'>
          <Text className='font-bold'>ID Đơn hàng: {data.orderId}</Text>
          <Button type='text' onClick={showModal}>
            <Text className='text-red-600 underline font-bold'>Xuất hóa đơn</Text>
          </Button>
        </div>
        <div className='px-2'>
          <div className='mt-2'>
            <Steps
              current={data.status}
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
                <Text>{data.nameReceiver}</Text>
                <Text>{data.phoneReceiver}</Text>
                <Text>{`${data.address?.street}, ${data.address?.ward} , ${data.address?.district}, ${data.address?.province}`}</Text>
              </Col>
              <Col span={16}>
                <Timeline mode='left'>
                  {data.statusShips.map((item, index: number) => {
                    return (
                      <Timeline.Item key={index} label={item.time}>{item.status}</Timeline.Item>
                    )
                  })}
                </Timeline>
              </Col>
            </Row>
            {data.listGoods.map((item, index) => {
              return (
                <>
                  <div className="flex border-b-2 pb-1">
                    <Image width={100} height={120} preview={false} className='rounded-xl' src={item.image} alt='' />
                    <div className='flex-1 pl-4'>
                      <Row className='flex-1'>
                        <Col span={19}>
                          <Text>
                            {item.name}
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
                              <Text strong className="text-lg">{item.price} đ</Text> :
                              <div className='flex flex-col leading-none'>
                                <Text strong className="text-lg text-red-600 leading-none">{item.price} đ</Text>
                                <div>
                                  <Text strong className="text-xs line-through text-gray-400 pr-1 leading-none">{item.unitPrice} đ</Text>
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
            dataSource={tablePayment}
            columns={columns} />
        </div>
      </div>
  );
}
