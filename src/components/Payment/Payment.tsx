import * as React from 'react';
import { Typography, Input, Row, Col, Form, Radio, Image, Checkbox, Button, Space } from 'antd'
import type { RadioChangeEvent } from 'antd';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import { useRouter } from 'next/router';

export interface PaymentProps {
}

const { Text, Title } = Typography
const { TextArea } = Input

export interface CartItemProps {
  goodsId: string;
  name: string;
  unitPrice: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
  discount: number;
}
const listCartItem: CartItemProps[] = [
  {
    goodsId: '1',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: 'Áo khoác thời trang mùa đông 2208B7013',
    unitPrice: 100000,
    quantity: 1,
    size: '36',
    color: 'yellow',
    discount: 10
  },
  {
    goodsId: '2',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
    name: 'Áo khoác thời trang mùa đông 2208B7013',
    unitPrice: 100000,
    quantity: 1,
    size: '36',
    color: 'yellow',
    discount: 10
  }
]

export default function Payment(props: PaymentProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = React.useState('offline');
  const [methodOnline, setMethodOnline] = React.useState('Momo');
  const onFinish = (values: any) => {
    console.log('Success:', values);
    router.push('/manage-orders');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangePaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  }
  const handleChangeMethodOnline = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  }

  return (
    <div className='px-8 payment'>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={15}>
            <div>
              <Title level={3}>Thông tin của bạn</Title>
              <Text className='text-[#A9A9A9] text-sm'>Vui lòng điền thông tin nhận hàng</Text>
            </div>
            <div>
              <Form.Item
                className='mb-1'
                label={<Text strong>Tên</Text>}
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
              >
                <Input className='' placeholder='Tên người nhận' />
              </Form.Item>
              <Form.Item
                className='mb-1'
                label={<Text strong>Số điện thoại</Text>}
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người nhận!' }]}
              >
                <Input className='' placeholder='Số điện thoại' />
              </Form.Item>
              <Form.Item
                className='mb-1'
                label={<Text strong>Email</Text>}
                name="email"
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
                      <Input className='' placeholder='Tỉnh thành' />
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
                      <Input className='' placeholder='Quận huyện' />
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
                      <Input className='' placeholder='Phường xã' />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  className='mb-1'
                  label={<Text strong>Số nhà, đường</Text>}
                  name="road"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ nhà!',
                    },
                  ]}
                >
                  <Input className='' placeholder='Số nhà, đường' />
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
                {paymentMethod === 'online' ?
                  <div className='p-2 border rounded-xl'>
                    <Form.Item
                      className='mb-0'
                      name="methodOnline"
                      rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán online!' }]}
                    >
                      <Radio.Group className='w-full' onChange={handleChangeMethodOnline} value={methodOnline}>
                        <Radio value="vnpal" className='w-full p-2 border rounded-xl font-bold mb-2 w-full'>
                          <div className='flex justify-between'>
                            <Text>VNPal</Text>
                            <Image height={24} preview={false}
                              src='https://vnpay.vn/_nuxt/img/scan-to-pay.be02e1e.svg' alt='logo VNPay' />
                          </div>
                        </Radio>
                        <Radio value="momo" className='w-full p-2 border rounded-xl font-bold'>
                          <div className='flex justify-between'>
                            <Text>Momo</Text>
                            <Image height={28} preview={false}
                              src='https://img.mservice.com.vn/app/img/portal_documents/mini-app_design-guideline_branding-guide-2-2.png' alt='logo momo' />
                          </div>
                        </Radio>
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
                <ButtonClientPrimary htmlType="submit"
                  name='Đặt hàng'
                />
              </Form.Item>
            </div>
          </Col>
          <Col span={9}>
            <div className='border rounded-xl px-2 py-3'>
              <Title level={4}>
                Đơn hàng
              </Title>
              {listCartItem.map((item, index) => {
                return (
                  <>
                    <div className="flex">
                      <Image width={140} height={160} preview={false} className='rounded-xl' src={item.image} alt='' />
                      <div className='flex-1 pl-4'>
                        <Row className='flex-1'>
                          <Col span={24}>
                            <Text>
                              {item.name}
                            </Text>
                          </Col>
                        </Row>
                        <div className='mt-0'>
                          <Space>
                            <Text className='text-[#A9A9A9] flex w-28'>Màu sắc:</Text>
                            <Text className='w-16'>{item.color}</Text>
                          </Space>
                        </div>
                        <div className='mt-0'>
                          <Space>
                            <Text className='text-[#A9A9A9] flex w-28'>Size:</Text>
                            <Text className=' w-16'>{item.size}</Text>
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
                  </>
                )
              })}
              <div className='px-4 flex justify-between'>
                <Text strong>Tổng cộng</Text>
                <Text strong className='text-lg'>500.000 đ</Text>
              </div>
              <div className='px-4 flex justify-between'>
                <Text strong>Vận chuyển</Text>
                <Text strong className='text-lg'>30.000 đ</Text>
              </div>
              <div className='px-4 flex justify-between items-center'>
                <div className='flex flex-col'>
                  <Text strong>Tổng đơn</Text>
                  <Text className='text-[#6A983C]'>Nhận hàng: 17-20 tháng 10</Text>
                </div>
                <Text strong className='text-[#6A983C] text-2xl'>530.000 đ</Text>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
