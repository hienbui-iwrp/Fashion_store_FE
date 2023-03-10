import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Space, Typography, Image, Row, Col, Divider, Radio, InputNumber, Spin } from 'antd';
import { Checkbox } from 'antd';
import ButtonClientPrimary from '../Button/ButtonClientPrimary';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ProductInCartProps } from '@/utils'
import { getCart } from '@/api/cart';
import { FormatMoney } from '@/utils';
import Loading from '@/components/Loading';
import { checkLogin } from '@/utils/check';
import styles from './Cart.module.css'

const { Title, Text } = Typography

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};
export interface CartProps {
}

export interface CartProps { }

export interface CartItemProps {
  goodsId: string
  name: string
  unitPrice: number
  image: string
  quantity: number
  size: string
  color: string
  discount: number
}

export default function Cart(props: CartProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [sum, setSum] = useState(0);
  const [quantity, setQuantity] = useState<number>(1)
  const maxQuantity: number = 1000
  const [data, setData] = useState<ProductInCartProps[]>([])
  const onChangeQuantity = (index: number, value: number) => {
    if (value > 0 && value < maxQuantity) {
      setQuantity(value)
    }
  };
  const handleToPayment = () => {
    router.push('/payment');
  }

  const fetchData = async () => {
    await getCart('1')
      .then((res) => {
        setData(res?.data)
        setLoading(false);
      })
  }

  useEffect(() => {
    checkLogin(router)
    fetchData()
  }, [])

  return (
    loading ? <Loading /> :
      <div className='w-[550px] m-auto border mt-4 mb-8 rounded-xl p-2'>
        <Title level={3}>Giỏ hàng</Title>
        <div className={styles.listCartItem}>
          {data.map((item, index) => {
            return (
              <div key={index + item.toString()}>
                <Checkbox
                  key={index}
                  onChange={onChange}
                  className='w-full flex-1'
                >
                  <div className='flex'>
                    <Image
                      width={140}
                      height={160}
                      preview={false}
                      className=''
                      src={item.image}
                      alt={item.name}
                    />
                    <div className='flex-1 pl-4'>
                      <Row className='flex-1'>
                        <Col span={19}>
                          <Text>{item.name}</Text>
                        </Col>
                        <Col span={5}>
                          <Title
                            className='!text-red-600 underline flex justify-end'
                            level={5}
                          >
                            Xóa
                          </Title>
                        </Col>
                      </Row>
                      <div className='mt-0'>
                        <Space>
                          <Text className='text-[#A9A9A9] flex w-28'>Màu sắc:</Text>
                          <Text className='bg-[#D9D9D9] text-red-600 flex justify-center w-16'>{item.color}</Text>
                        </Space>
                      </div>
                      <div className='mt-2'>
                        <Space>
                          <Text className='text-[#A9A9A9] flex w-28'>Size:</Text>
                          <Text className='bg-[#D9D9D9] text-red-600 flex justify-center w-16'>{item.size}</Text>
                        </Space>
                      </div>
                      <div className='flex justify-between items-center mt-10'>
                        {item.discount === 0 ? (
                          <Text strong className='text-lg'>
                            {item.unitPrice} đ
                          </Text>
                        ) : (
                          <div className='flex flex-col leading-none'>
                            <Text
                              strong
                              className='text-lg text-red-600 leading-none'
                            >
                              {(
                                item.unitPrice *
                                (1 - item.discount / 100)
                              ).toFixed(0)}{' '}
                              đ
                            </Text>
                            <div>
                              <Text
                                strong
                                className='text-xs line-through text-gray-400 pr-1 leading-none'
                              >
                                {item.unitPrice} đ
                              </Text>
                              <Text strong className='text-xs leading-none'>
                                -{item.discount}%
                              </Text>
                            </div>
                          </div>
                        )}
                        <div>
                          <MinusCircleOutlined
                            className='cursor-pointer text-lg'
                            onClick={() => {
                              onChangeQuantity(
                                index,
                                data[index].quantity - 1
                              )
                            }}
                          />
                          <InputNumber
                            className={styles.inputQuantity}
                            size='small'
                            min={1}
                            max={1000}
                            value={item.quantity}
                            onChange={(value) =>
                              onChangeQuantity(index, value || 0)
                            }
                          />
                          <PlusCircleOutlined
                            className='cursor-pointer text-lg'
                            onClick={() => {
                              onChangeQuantity(
                                index,
                                data[index].quantity + 1
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Checkbox>
                <Divider className='my-2' />
              </div>
            )
          })}
        </div>
        <div className='px-4 flex justify-between'>
          <Text strong>Tổng cộng</Text>
          <Text strong className='text-red-600 text-lg'>
            {FormatMoney(sum)}
          </Text>
        </div>
        <div className='px-4 pt-2 flex justify-end'>
          <ButtonClientPrimary name='Thanh toán' onClick={handleToPayment} />
        </div>
      </div>
  )
}
