import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store'
import { selectProductsPayment, selectUser } from '@/redux/selectors'
import moment from 'moment';
import { productsPaymentActions, setNotificationType, setNotificationValue } from '@/redux/slices'
import { Typography, Input, Row, Col, Form, Radio, Image, Checkbox, Button, Space, notification } from 'antd'
import type { RadioChangeEvent } from 'antd';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import { useRouter } from 'next/router';
import { FormatMoney, ProductInCartProps, formatRouteImage } from '@/utils';
import { createOrder, createOrderBpel, makeOrder } from '@/api/customer-order';
import { deleteGoodsBff } from '@/api';
import Loading from '../Loading';
import { useEffect } from 'react';
import Link from 'next/link';
import { VNPay } from '@/api/payment';

export interface PaymentProps {
}

const { Text, Title } = Typography
const { TextArea } = Input


export default function Payment(props: PaymentProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const formRef = React.useRef(null);
  const dispatch = useDispatch()
  const dataProductsPayment: any = useSelector(selectProductsPayment);
  const dataUser = useSelector(selectUser);
  const listCartItem: ProductInCartProps[] = dataProductsPayment.listProductPayment;
  // console.log('redux data products payment', dataProductsPayment);
  const [paymentMethod, setPaymentMethod] = React.useState('offline');
  const [methodOnline, setMethodOnline] = React.useState('vnpay');
  const [totalOrder, setTotalOrder] = React.useState(dataProductsPayment.totalPrice)
  const [shipFee, setShipFee] = React.useState<number | null>(null)
  const [expectedDate, setExpectedDate] = React.useState<string | null>(null)
  const onFinish = (values: any) => {
    const orderData = {
      ...values, goodsList: dataProductsPayment.listProductPayment,
      shipFee, totalPrice: dataProductsPayment.totalPrice,
      customerId: dataUser.info.username,
      transactionDate: moment().format("YYYY-MM-DD"),
      address: {
        street: values.street,
        ward: values.ward,
        district: values.district,
        province: values.province
      },
      expectedDate: expectedDate ? expectedDate : '2023-06-08'
    }
    // sendOrderInfo(orderData);
    if (values.paymentMethod === 'offline') {
      Promise.all([completedOrder(orderData), removeProductBoughtInCart(orderData)])
        .then(([resCompleteOrder, resRemove]) => {
          console.log('res', resCompleteOrder);
          if (resCompleteOrder?.StatusCode === '200') {
            dispatch(setNotificationValue('Tạo đơn hàng thành công'));
            router.push('/manage-orders');
          } else {
            dispatch(setNotificationType('error'));
            dispatch(setNotificationValue('Có lỗi xảy ra, tạo đơn hàng thất bại'));
          }
        })
        .catch(err => console.log('có lỗi xảy ra:', err));
    } else {
      if (window != undefined) {
        localStorage.setItem('orderData', JSON.stringify(orderData));
      }
      VNPay(totalOrder + shipFee);
    }
  };

  const completedOrder = async (orderData: any) => {
    return await createOrderBpel(orderData);
    // return await createOrder(orderData);
  }

  const removeProductBoughtInCart = async (orderData: any) => {
    return await deleteGoodsBff(orderData.customerId, orderData.goodsList);
  }

  const sendOrderInfo = async (orderData: any) => {
    await makeOrder(orderData)
      .then((res) => {
        console.log(res);
        setShipFee(Number(res?.Data.shipFee));
        setExpectedDate(res?.Data.expectedDate);
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangePaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  }
  const handleChangeMethodOnline = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  }
  const handleBlur = (event: any) => {
    //@ts-ignore
    const formData = formRef.current.getFieldsValue();
    if (formData.province && formData.district && formData.ward && formData.street) {
      const orderData = {
        ...formData, goodsList: dataProductsPayment.listProductPayment,
        shipFee, totalPrice: dataProductsPayment.totalPrice,
        customerId: dataUser.info.username,
        transactionDate: moment().format("MM-DD-YYYY"),
        address: {
          street: formData.street,
          ward: formData.ward,
          district: formData.district,
          province: formData.province
        },
        expectedDate: expectedDate ? expectedDate : '2023-06-08'
      }
      sendOrderInfo(orderData);
    }
  };

  useEffect(() => {
    if (dataProductsPayment.listProductPayment.length) {
      setLoading(false);
    }
    else {
      router.push('/cart');
    }
  }, [])

  return (
    loading ? <Loading /> :
      <div className='px-8 payment'>
        <Form
          ref={formRef}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={14}>
              <div>
                <Title level={3}>Thông tin của bạn</Title>
                <Text className='text-[#A9A9A9] text-sm'>Vui lòng điền thông tin nhận hàng</Text>
              </div>
              <div>
                <Form.Item
                  className='mb-1'
                  label={<Text strong>Tên</Text>}
                  name="nameReceiver"
                  rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                >
                  <Input className='' placeholder='Tên người nhận' />
                </Form.Item>
                <Form.Item
                  className='mb-1'
                  label={<Text strong>Số điện thoại</Text>}
                  name="phoneReceiver"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người nhận!' }]}
                >
                  <Input className='' placeholder='Số điện thoại' />
                </Form.Item>
                <Form.Item
                  className='mb-1'
                  label={<Text strong>Email</Text>}
                  name="emailReceiver"
                  rules={[
                    {
                      type: 'email',
                      message: 'Email không đúng định dạng!',
                    },
                  ]}
                >
                  <Input className='' placeholder='Email' />
                </Form.Item>
                <div className='border p-2 rounded-xl mt-4'>
                  <Title level={4}>Địa chỉ nhận hàng</Title>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item
                        className='mb-1'
                        label={<Text strong>Tỉnh / Thành phố</Text>}
                        name="province"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập tỉnh thành!',
                          },
                        ]}
                      >
                        <Input onBlur={handleBlur} className='' placeholder='Tỉnh thành' />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        className='mb-1'
                        label={<Text strong>Quận / huyện</Text>}
                        name="district"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập quận huyện!',
                          },
                        ]}
                      >
                        <Input onBlur={handleBlur} className='' placeholder='Quận huyện' />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        className='mb-1'
                        label={<Text strong>Phường / xã</Text>}
                        name="ward"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập phường xã!',
                          },
                        ]}
                      >
                        <Input onBlur={handleBlur} className='' placeholder='Phường xã' />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    className='mb-1'
                    label={<Text strong>Số nhà, đường</Text>}
                    name="street"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ nhà!',
                      },
                    ]}
                  >
                    <Input onBlur={handleBlur} className='' placeholder='Số nhà, đường' />
                  </Form.Item>
                </div>
                <div>
                  <Title level={4}>Phương thức thanh toán</Title>
                  <Form.Item
                    className='mb-2'
                    name="paymentMethod"
                    rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                  >
                    <Radio.Group className='w-full' onChange={handleChangePaymentMethod} value={paymentMethod}>
                      <Row gutter={16}>
                        <Col span={12} className="">
                          <Radio value="offline" className='w-full p-2 border rounded-xl font-bold'>Thanh toán trực tiếp</Radio>
                        </Col>
                        <Col span={12} className="">
                          <Radio value="online" className='w-full p-2 border rounded-xl font-bold'>Thanh toán trực tuyến</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                  {paymentMethod === 'online' || paymentMethod === 'vnpay' || paymentMethod === 'momo' ?
                    <div className='p-2 border rounded-xl'>
                      <Form.Item
                        className='mb-0'
                        name="methodOnline"
                        rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán online!' }]}
                      >
                        <Radio.Group className='w-full' onChange={handleChangeMethodOnline} value={methodOnline}>
                          <Radio value="vnpay" className='w-full p-2 border rounded-xl font-bold mb-2 w-full'>
                            <div className='flex justify-between'>
                              <Text>VNPay</Text>
                              <Image height={24} preview={false}
                                src='/vnpay-logo-inkythuatso-01.jpg' alt='logo VNPay' />
                            </div>
                          </Radio>
                          {/* <Radio value="momo" className='w-full p-2 border rounded-xl font-bold'>
                            <div className='flex justify-between'>
                              <Text>Momo</Text>
                              <Image height={28} preview={false}
                                src='https://img.mservice.com.vn/app/img/portal_documents/mini-app_design-guideline_branding-guide-2-2.png' alt='logo momo' />
                            </div>
                          </Radio> */}
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    : null}
                </div>
                <div>
                  <br />
                  <Title level={4} className='!mb-0'>Thông tin thêm</Title>
                  <Text>Bạn cần thêm điều gì? Chúng tôi sẽ làm nó giúp bạn!</Text>
                  <Form.Item
                    className='mb-2'
                    label={<Text strong>Ghi chú</Text>}
                    name="note"
                  >
                    <TextArea rows={4} placeholder="Hãy nói những điều bạn mong muốn thêm ..." />
                  </Form.Item>
                </div>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Bạn cần phải đồng ý với điều khoản và chính sách riêng tư')),
                    },
                  ]}
                >
                  <Checkbox className='border p-1 rounded-md'>
                    Tôi đồng ý với điều kiện, điều khoản và chính sách riêng tư
                  </Checkbox>
                </Form.Item>
                <Form.Item >
                  <ButtonClientPrimary disabled={!shipFee} htmlType="submit"
                    name='Đặt hàng'
                  />
                </Form.Item>
              </div>
            </Col>
            <Col span={10}>
              <div className='border rounded-xl px-2 py-3'>
                <Title level={4}>
                  Đơn hàng
                </Title>
                {listCartItem.map((item, index) => {
                  return (
                    <div
                      key={item.goodsId}
                    >
                      <div className="flex">
                        <Link href={`/products/${item.goodsId}`}>
                          <Image width={140} height={160} preview={false} className='rounded-xl' src={(item.image)} alt='' />
                        </Link>
                        <div className='flex-1 pl-4'>
                          <Row className='flex-1'>
                            <Col span={24}>
                              <Link href={`/products/${item.goodsId}`}>
                                <Text>
                                  {item.name}
                                </Text>
                              </Link>
                            </Col>
                          </Row>
                          <div className='mt-0'>
                            <Space>
                              <Text className='text-[#A9A9A9] flex w-28'>Màu sắc:</Text>
                              <Text className='w-16'>{item.goodsColor}</Text>
                            </Space>
                          </div>
                          <div className='mt-0'>
                            <Space>
                              <Text className='text-[#A9A9A9] flex w-28'>Size:</Text>
                              <Text className=' w-16'>{item.goodsSize}</Text>
                            </Space>
                          </div>
                          <div className='mt-0'>
                            <Space>
                              <Text className='text-[#A9A9A9] flex w-28'>Số lượng:</Text>
                              <Text className=' w-16'>{item.quantity}</Text>
                            </Space>
                          </div>
                          <div className='flex justify-between items-center mt-8'>
                            {item.discount === 0 ?
                              <Text strong className="text-lg">{item.unitPrice} đ</Text> :
                              <div className='flex flex-col leading-none'>
                                <Text strong className="text-lg text-red-600 leading-none">{(item.unitPrice * (1 - item.discount / 100)).toFixed(0)} đ</Text>
                                <div>
                                  <Text strong className="text-xs line-through text-gray-400 pr-1 leading-none">{item.unitPrice} đ</Text>
                                  <Text strong className="text-xs leading-none">-{item.discount}%</Text>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
                  )
                })}
                <hr className="py-1" />
                <div className='px-4 flex justify-between'>
                  <Text strong>Tổng cộng</Text>
                  <Text strong className='text-lg'>{FormatMoney(totalOrder)}</Text>
                </div>
                <div className='px-4 flex justify-between'>
                  <Text strong>Vận chuyển</Text>
                  <Text strong className='text-lg'>{shipFee ? FormatMoney(shipFee) : FormatMoney(0)}</Text>
                </div>
                <div className='px-4 flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <Text strong>Tổng đơn</Text>
                    <Text className='text-[#6A983C]'>Nhận hàng: {expectedDate ? expectedDate : 'Vui lòng nhập đầy đủ thông tin'}</Text>
                  </div>
                  <Text strong className='text-[#6A983C] text-2xl'>{FormatMoney(totalOrder + (shipFee ? shipFee : 0))}</Text>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
  );
}
