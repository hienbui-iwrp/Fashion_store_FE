import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAppDispatch } from '@/redux/store'
import {
  productsPaymentActions,
  setNotificationType,
  setNotificationValue,
} from '@/redux/slices'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import {
  Space,
  Typography,
  Image,
  Row,
  Col,
  Divider,
  Radio,
  InputNumber,
  Spin,
  Button,
} from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { Checkbox } from 'antd'
import ButtonClientPrimary from '../Button/ButtonClientPrimary'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { ProductInCartProps, formatCartDataXML, formatResponse, formatRouteImage } from '@/utils'
import {
  deleteAllGoodsBff,
  deleteGoodsBff,
  getCart,
  getCartBff,
  getCartBpel,
  updateCartBff,
} from '@/api/cart'
import { FormatMoney } from '@/utils'
import Loading from '@/components/Loading'
import { checkLogin } from '@/utils/check'
import styles from './Cart.module.css'
import { FormatMoneyD } from '@/utils/formats/FormatMoney'
import { ImageEmpty } from '@/constants/image'
import { Colors } from '@/constants'

const { Title, Text } = Typography

export interface CartProps { }

interface Option {
  label: JSX.Element
  key: string
  value: string
  disabled?: boolean
}

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
  const router = useRouter()
  const dispatch: any = useAppDispatch()
  const [cartId, setCartId] = useState<string>()
  const { setProductsPayment } = productsPaymentActions
  const [loading, setLoading] = useState(true)
  const [sum, setSum] = useState(0)
  const [quantity, setQuantity] = useState<number>(1)
  const maxQuantity: number = 1000
  const [data, setData] = useState<ProductInCartProps[]>([])
  const [productsChecked, setProductsChecked] = useState<ProductInCartProps[]>(
    []
  )

  const [options, setOptions] = useState<Option[]>([])

  const onSelectItemGoods = (e: CheckboxChangeEvent) => {
    const product = JSON.parse(e.target.value)
    const goodsId = product.goodsId
    const index = productsChecked.findIndex(
      (product) => product.goodsId === goodsId
    )
    if (index === -1) {
      setProductsChecked([...productsChecked, product])
      setSum(sum + product.price * product.quantity)
    } else {
      setProductsChecked(
        productsChecked.filter((product) => product.goodsId !== goodsId)
      )
      setSum(sum - product.price * product.quantity)
    }
  }

  const updateCart = async () => {
    if (cartId) {
      await updateCartBff(cartId, data).then((res) => {
        if (res?.StatusCode === '200') {
          setOptions(setForOptions(data))
        } else {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi chỉnh sửa giỏ hàng'))
        }
      })
    }
  }

  const onChangeQuantity = (index: number, value: number) => {
    if (value > 0 && value < maxQuantity) {
      data[index].quantity = value
      updateCart()
    }
  }

  const onRemoveProductItem = async (
    index: number,
    goods: ProductInCartProps
  ) => {
    await deleteGoodsBff(cartId ?? '', [goods]).then((res) => {
      if (res?.StatusCode === '200') {
        data.splice(index, 1)
        setOptions(setForOptions(data))
      } else {
        dispatch(setNotificationType('error'))
        dispatch(setNotificationValue('Có lỗi khi chỉnh sửa giỏ hàng'))
      }
    })
  }

  const onRemoveAll = async () => {
    await deleteAllGoodsBff(cartId ?? '').then((res) => {
      if (res?.StatusCode === '200') {
        setData([])
        setOptions(setForOptions([]))
      } else {
        dispatch(setNotificationType('error'))
        dispatch(setNotificationValue('Có lỗi khi chỉnh sửa giỏ hàng'))
      }
    })
  }

  const handleToPayment = () => {
    dispatch(
      setProductsPayment({
        totalPrice: sum,
        listProductPayment: productsChecked,
      })
    )
    router.push('/payment')
  }

  const setForOptions = (products: ProductInCartProps[]) => {
    return products.map((product: ProductInCartProps, index: number) => {
      return {
        label: (
          <div className='flex w-[500px]'>
            <Image
              width={140}
              height={160}
              preview={false}
              className=''
              src={(product.image) ?? ImageEmpty}
              alt={product.name}
            />
            <div className='flex-1 pl-4'>
              <Row className='flex-1'>
                <Col span={19}>
                  <Link href={`products/${product.goodsId}`}>
                    <Text>{product.name}</Text>
                  </Link>
                </Col>
                <Col span={5}>
                  <Title
                    className='!text-red-600 underline flex justify-end'
                    level={5}
                    onClick={(e) => {
                      e.preventDefault()
                      onRemoveProductItem(index, product)
                    }}
                  >
                    Xóa
                  </Title>
                </Col>
              </Row>
              <div className='mt-0'>
                <Space>
                  <Text className='text-[#A9A9A9] flex w-28'>Màu sắc:</Text>
                  <b>
                    <Text
                      className='bg-[#D9D9D9] text-white flex justify-center w-24'
                      style={{
                        borderRadius: 10,
                        backgroundColor: Colors.clientEmerald500,
                      }}
                    >
                      {product.goodsColor}
                    </Text>
                  </b>
                </Space>
              </div>
              <div className='mt-2'>
                <Space>
                  <Text className='text-[#A9A9A9] flex w-28'>Size:</Text>
                  <b>
                    <Text
                      className='bg-[#D9D9D9] text-white flex justify-center w-24'
                      style={{
                        borderRadius: 10,
                        backgroundColor: Colors.clientEmerald500,
                      }}
                    >
                      {product.goodsSize}
                    </Text>
                  </b>
                </Space>
              </div>
              <div className='flex justify-between items-center mt-10'>
                {product.discount === 0 ? (
                  <Text strong className='text-lg'>
                    {FormatMoney(product.unitPrice)}
                  </Text>
                ) : (
                  <div className='flex flex-col leading-none'>
                    <Text strong className='text-lg text-red-600 leading-none'>
                      {/* {(
                        product.unitPrice *
                        (1 - product.discount / 100)
                      ).toFixed(0)}{' '} */}
                      {FormatMoney(product.price)}
                    </Text>
                    <div>
                      <Text
                        strong
                        className='text-xs line-through text-gray-400 pr-1 leading-none'
                      >
                        {FormatMoney(product.unitPrice)}
                      </Text>
                      <Text strong className='text-xs leading-none'>
                        -{product.discount}%
                      </Text>
                    </div>
                  </div>
                )}
                <div>
                  <MinusCircleOutlined
                    className='cursor-pointer text-lg'
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      onChangeQuantity(index, product.quantity - 1)
                    }}
                  />
                  <InputNumber
                    className={styles.inputQuantity}
                    size='small'
                    min={1}
                    max={product.maxQuantity || 1000}
                    value={product.quantity}
                    onChange={(value) => onChangeQuantity(index, value || 0)}
                  />
                  <PlusCircleOutlined
                    className='cursor-pointer text-lg'
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      onChangeQuantity(index, product.quantity + 1)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ),
        value: JSON.stringify({ ...product }),
        key: product.goodsId,
      }
    })
  }

  const fetchData = async () => {
    await getCartBpel(localStorage.getItem('userId') || '').then((res) => {
      if (res?.StatusCode === '200') {
        const tempData = formatCartDataXML(res?.Data[0])
        setCartId(tempData.cartId)
        setData(tempData.productsInCart)
        setOptions(setForOptions(tempData.productsInCart))
      }
    })
    // await getCartBff(localStorage.getItem('userId') || '').then((res) => {
    //   if (res?.StatusCode === '200') {
    //     const tempData = formatCartDataXML(res?.Data[0])
    //     setCartId(tempData.cartId)
    //     setData(tempData.productsInCart)
    //     setOptions(setForOptions(tempData.productsInCart))
    //   }
    // })
    setLoading(false)
  }

  useEffect(() => {
    checkLogin(router)
    fetchData()
  }, [loading])


  const onChange = (checkedValues: CheckboxValueType[]) => {
    // console.log('object changed', checkedValues)
    let sumTemp = 0
    setProductsChecked(
      checkedValues.map((value: any, _) => {
        const product = JSON.parse(value)
        sumTemp +=
          product.unitPrice * (1 - product.discount / 100) * product.quantity
        return product
      })
    )
    setSum(sumTemp)
  }

  return loading ? (
    <Loading />
  ) : (
    <div className='bg-white w-[550px] m-auto border mt-4 mb-8 rounded-xl p-2'>
      <div className='flex justify-between'>
        <Title level={3}>Giỏ hàng</Title>
        {data.length ? (
          <Button
            type='link'
            danger
            onClick={() => {
              onRemoveAll()
            }}
          >
            Xóa tất cả
          </Button>
        ) : null}
      </div>
      {data.length ? (
        <div>
          <div className={styles.listCartItem}>
            <Checkbox.Group
              options={options}
              onChange={onChange}
              className='flex flex-wrap'
            />
          </div>
          <div className='px-4 flex justify-between'>
            <Text strong>Tổng cộng</Text>
            <Text strong className='text-red-600 text-lg'>
              {FormatMoney(sum)}
            </Text>
          </div>
          <div className='px-4 pt-2 flex justify-end'>
            <ButtonClientPrimary
              disabled={!productsChecked.length}
              name='Thanh toán'
              onClick={handleToPayment}
            />
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <Text>Bạn chưa có sản phẩm nào trong giỏ hàng.</Text>
          <Link href={`/products`}>
            <ButtonClientPrimary type='primary' name='Xem sản phẩm' />
          </Link>
        </div>
      )}
    </div>
  )
}
