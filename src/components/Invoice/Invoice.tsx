import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Button, Steps, Timeline, Row, Col, Image, Space, Table, Divider, Watermark } from 'antd';
import { FormatMoney } from '@/utils/formats';
import styles from './Invoice.module.css'
import { OrderDetailProps } from '@/utils';
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from "react-to-print";
import moment from 'moment';

const { Title, Text } = Typography

interface ItemProduct {
  goodsId: string;
  name: string;
  goodsColor: string;
  goodsSize: string;
  quantity: number;
  unitPrice: number;
}

interface ItemPayment {
  key: string;
  name: string;
  content: number | string;
}

const Invoice = React.forwardRef((props: OrderDetailProps, ref: any) => {
  const [data, setData] = useState<OrderDetailProps>({
    orderId: '',
    orderCode: '',
    paymentMethod: '',
    listGoods: [{
      goodsId: '',
      image: '',
      name: '',
      unitPrice: 0,
      price: 0,
      quantity: 0,
      goodsSize: '',
      goodsColor: '',
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
    emailReceiver: '',
    address: {
      province: '',
      district: '',
      ward: '',
      street: ''
    },
    statusShips: [],
    transactionDate: '',
    expectDate: ''
  })
  let sumPromotion = 0;
  props.listGoods.forEach((goods) => {
    sumPromotion += goods.discount * goods.unitPrice;
  })
  const [tablePayment, setTablePayment] = useState<ItemPayment[]>([
    {
      key: '1',
      name: 'Tổng tiền hàng',
      content: props.totalPrice,
    },
    {
      key: '2',
      name: 'Phí vận chuyển',
      content: props.shipFee
    },
    {
      key: '3',
      name: 'Giảm giá',
      content: props.totalDiscount - sumPromotion < 0
        ? 0 : props.totalDiscount - sumPromotion
    },
    {
      key: '4',
      name: 'Tổng số tiền',
      content: props.totalOrder
    },
    {
      key: '5',
      name: 'Phương thức thanh toán',
      content: String(props.paymentMethod).toLowerCase()
    },
  ]);
  const tableProduct: ItemProduct[] = props.listGoods.map((goods, index) => {
    return {
      key: index, ...goods
    }
  });

  const columnProduct = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kích thước',
      dataIndex: 'goodsSize',
      key: 'goodsSize'
    },
    {
      title: 'Màu sắc',
      dataIndex: 'goodsColor',
      key: 'goodsColor',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (_: any, record: ItemProduct) => (
        <div className='flex justify-end'>
          {FormatMoney(record.unitPrice)}
        </div>
      )
    },
  ];

  const columnsPayment = [
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
      render: (_: any, record: ItemPayment) => (
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

  return (
    <div className="invoice w-[800px] m-auto" ref={ref}>
      <div className='px-2'>
        <div className='flex justify-between'>
          <Space direction='vertical'>
            <Title level={2}>Hóa đơn</Title>
            <Text> Mã đơn : {props.orderCode}</Text>
            <Text> Ngày : {moment().format("DD/MM/YYYY")}</Text>
          </Space>
          <Image
            alt='img'
            style={{ maxWidth: 300, width: '100%', maxHeight: 150 }}
            src='/logo-green.png'
            preview={false}
          />
        </div>
        <Space direction='vertical' className='' >
          <Text strong>CÔNG TY TNHH PTH FASHION</Text>
          <Text strong>Số điện thoại: 0867742135</Text>
          <Text strong>Địa chỉ: 268 Lý Thường Kiệt, Quận 10, Tp.HCM</Text>
        </Space>

        <hr className='border-2 my-2' />

        <Watermark
          height={80}
          width={80}
          image="/logo-green.png"
        >
          <div>
            <Table
              bordered
              pagination={false}
              className={styles.tablePayment}
              dataSource={tableProduct}
              columns={columnProduct} />
            <Title className='mt-2' level={5}>Địa chỉ nhận hàng</Title>
            <div className='flex flex-col'>
              <Text>{props.nameReceiver}</Text>
              <Text>{props.phoneReceiver}</Text>
              <Text>{`${props.address?.street}, ${props.address?.ward} , ${props.address?.district}, ${props.address?.province}`}</Text>
            </div>
          </div>
          <Table
            rowKey="name"
            bordered
            showHeader={false}
            className={styles.tablePayment}
            pagination={false}
            dataSource={tablePayment}
            columns={columnsPayment} />
        </Watermark>
      </div>
    </div>
  );
});
Invoice.displayName = 'Invoice';

export default Invoice;