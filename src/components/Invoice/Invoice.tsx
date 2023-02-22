import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Button, Steps, Timeline, Row, Col, Image, Space, Table } from 'antd';
import FormatMoney from '@/utils/formats';
import { OrderDetailProps } from '@/utils';
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from "react-to-print";

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
// export const ComponentToPrint = React.forwardRef((props, ref) => {
//   return (
//     <div ref={ref}>My cool content here!</div>
//   );
// });
const Invoice = React.forwardRef((props: OrderDetailProps, ref: any) => {
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
  // const route = useRouter();
  // const orderId = route.asPath.split('/').at(-1);
  // console.log(orderId);
  // const fetchData = () => {
  //   getOrderDetail(orderId || '')
  //     .then((res) => {
  //       setData(res?.data);
  //       setTablePayment([
  //         {...tablePayment[0], content: res?.data.totalPrice},
  //         {...tablePayment[1], content: res?.data.shipFee},
  //         {...tablePayment[2], content: res?.data.totalDiscount},
  //         {...tablePayment[3], content: res?.data.totalOrder},
  //         {...tablePayment[4], content: res?.data.paymentMethod},
  //       ])
  //     })
  // }
  // useEffect(() => {
  //   fetchData();
  // }, [])

  const [orderData, setOrderData] = useState({ ...OrderDetail })
  return (
    <div className="w-[800px] m-auto" ref={ref}>
      <div className='px-2'>
        <div>
          <Title level={5}>Địa chỉ nhận hàng</Title>
          <div className='flex flex-col'>
          <Text>{props.nameReceiver}</Text>
          <Text>{props.phoneReceiver}</Text>
          <Text>{`${props.address?.street}, ${props.address?.ward} , ${props.address?.district}, ${props.address?.province}`}</Text>
          </div>
        </div>
        <Table
          rowKey="name"
          bordered
          pagination={false}
          dataSource={tablePayment}
          columns={columns} />
      </div>
    </div>
  );
});
Invoice.displayName = 'Invoice';

export default Invoice;
// export  function Invoice(props: {data: OrderDetailProps, ref: any}) {
//   const [data, setData] = useState<OrderDetailProps>({
//     orderId: '',
//     paymentMethod: '',
//     listGoods: [{
//       goodsId: '',
//       image: '',
//       name: '',
//       unitPrice: 0,
//       price: 0,
//       quantity: 0,
//       size: '',
//       color: '',
//       discount: 0
//     }],
//     totalPrice: 0,
//     totalGoods: 0,
//     totalDiscount: 0,
//     isCompleted: false,
//     shipFee: 0,
//     totalOrder: 0,
//     status: 0,
//     nameReceiver: '',
//     phoneReceiver: '',
//     address: {
//       province: '',
//       district: '',
//       ward: '',
//       street: ''
//     },
//     statusShips: [],
//     transactionDate: ''
//   })
//   const [tablePayment, setTablePayment] = useState<Item[]>([
//     {
//       key: '1',
//       name: 'Tổng tiền hàng',
//       content: 0,
//     },
//     {
//       key: '2',
//       name: 'Phí vận chuyển',
//       content: 0
//     },
//     {
//       key: '3',
//       name: 'Giảm giá',
//       content: 0
//     },
//     {
//       key: '4',
//       name: 'Tổng số tiền',
//       content: 0
//     },
//     {
//       key: '5',
//       name: 'Phương thức thanh toán',
//       content: 'offline'
//     },
//   ]);

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text: string) => (
//         <div className='flex justify-end'>
//           {text}
//         </div>
//       )
//     },
//     {
//       title: 'Content',
//       dataIndex: 'content',
//       key: 'content',
//       render: (_: any, record: Item) => (
//         record.key === '5' ?
//           <div className='flex justify-end'>
//             {record.content === 'offline' && 'Thanh toán khi nhận hàng'}
//             {record.content === 'momo' && 'Ví điện tử Momo'}
//             {record.content === 'vnpay' && 'Ví điện tử VNpay'}
//           </div> :
//           <div className='flex justify-end'>
//             {typeof record.content === 'number' && FormatMoney(record.content)}
//           </div>
//       )
//     }
//   ];
//   // const route = useRouter();
//   // const orderId = route.asPath.split('/').at(-1);
//   // console.log(orderId);
//   // const fetchData = () => {
//   //   getOrderDetail(orderId || '')
//   //     .then((res) => {
//   //       setData(res?.data);
//   //       setTablePayment([
//   //         {...tablePayment[0], content: res?.data.totalPrice},
//   //         {...tablePayment[1], content: res?.data.shipFee},
//   //         {...tablePayment[2], content: res?.data.totalDiscount},
//   //         {...tablePayment[3], content: res?.data.totalOrder},
//   //         {...tablePayment[4], content: res?.data.paymentMethod},
//   //       ])
//   //     })
//   // }
//   // useEffect(() => {
//   //   fetchData();
//   // }, [])

//   const [orderData, setOrderData] = useState({ ...OrderDetail })
//   return (
//     <div className="w-[800px] m-auto" ref={props.ref}>
//       <div className='px-2'>
//         <div>
//           <Title level={5}>Địa chỉ nhận hàng</Title>
//           <div className='flex flex-col'>
//           <Text>{props.data.nameReceiver}</Text>
//           <Text>{props.data.phoneReceiver}</Text>
//           <Text>{`${props.data.address?.street}, ${props.data.address?.ward} , ${props.data.address?.district}, ${props.data.address?.province}`}</Text>
//           </div>
//         </div>
//         <Table
//           rowKey="name"
//           bordered
//           pagination={false}
//           dataSource={tablePayment}
//           columns={columns} />
//       </div>
//     </div>
//   );
// }
