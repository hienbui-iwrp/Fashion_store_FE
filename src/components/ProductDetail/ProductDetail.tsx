import React, { useState, useEffect } from 'react'
import {
  PlusOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import {
  Col,
  Row,
  Image,
  Typography,
  Space,
  Button,
  InputNumber,
  Tabs,
} from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { TabsProps } from 'antd'
import { Radio } from 'antd'
import { ProductDetailDataProps } from '@/utils'
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import styles from './ProductDetail.module.css'
import { Colors } from '@/constants'

export interface ProductDetailProps {
  goodsId: string
  name: string
  unitPrice: number
  image: string
  quantity: number
  size: string
  color: string
  discount: number
}

const { Title, Text } = Typography

export default function ProductDetail(props: ProductDetailDataProps) {
  const [quantity, setQuantity] = useState<number>(1)
  const maxQuantity = props.quantity
  // const [maxQuantity, setMaxQuantity] = useState<number>(props.quantity)
  const [imageShow, setImageShow] = useState<string>(props.images[0])
  const [valueSize, setValueSize] = useState(props.size[0])
  const [valueColor, setValueColor] = useState(props.color[0])
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <Text>Mô tả</Text>,
      children: `${props.description}`,
    },
  ]

  const onChangeQuantity = (value: number | null) => {
    if (value !== null && value > 0 && value < maxQuantity) {
      setQuantity(value)
    }
  }

  const onChangeColor = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`)
    setValueColor(e.target.value)
  }

  const onChangeSize = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`)
    setValueSize(e.target.value)
  }

  const onChangeTabs = (key: string) => {
    console.log(key)
  }

  const handleChangeImage = (image: string) => {
    setImageShow(image)
  }

  useEffect(() => {
    setImageShow(props.images[0])
    setValueColor(props.color[0])
    setValueSize(props.size[0])
    // setMaxQuantity(props.quantity)
  }, [props])

  return (
    <div className='mb-4 px-8'>
      <Row className=''>
        <Col span={9}>
          <div className='flex justify-center'>
            <Image
              width={350}
              height={400}
              className='py-2'
              src={imageShow}
              alt={props.name}
            />
          </div>

          <div className='flex justify-center mt-2'>
            {props.images.map((item, index) => {
              return (
                <Image
                  key={index}
                  className='px-2'
                  preview={false}
                  width={60}
                  height={60}
                  onClick={() => handleChangeImage(item)}
                  src={item}
                  alt={props.name}
                />
              )
            })}
          </div>
        </Col>
        <Col span={15}>
          <Title level={3} className='pb-8'>
            {' '}
            sản phẩm x
          </Title>
          <div className='flex flex-col'>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Mã hàng:</Text>
              <Text strong>ABDNCd</Text>
            </Space>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Loại:</Text>
              <Text strong>{props.type}</Text>
            </Space>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Tình trạng:</Text>
              {props.quantity === 0 ? (
                <Text strong style={{ color: Colors.adminRed500 }}>
                  Hết hàng
                </Text>
              ) : (
                <Text strong style={{ color: Colors.adminGreen700 }}>
                  Còn hàng
                </Text>
              )}
            </Space>
          </div>
          <div className='mt-8'>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Màu sắc:</Text>
              <Radio.Group
                buttonStyle='solid'
                onChange={onChangeColor}
                value={valueColor}
                className={styles.productColor}
              >
                {props.color.map((item, index) => {
                  return (
                    <Radio.Button key={index} value={item}>
                      {item}
                    </Radio.Button>
                  )
                })}
              </Radio.Group>
            </Space>
          </div>
          <div className='mt-8'>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Size:</Text>
              <Radio.Group
                buttonStyle='solid'
                onChange={onChangeSize}
                value={valueSize}
                className={styles.productSize}
              >
                {props.size.map((item, index) => {
                  return (
                    <Radio.Button key={index} value={item}>
                      {item}
                    </Radio.Button>
                  )
                })}
              </Radio.Group>
            </Space>
          </div>
          <div className='flex justify-between items-center mt-10'>
            {props.discount === 0 ? (
              <Text strong className='text-lg'>
                {props.unitPrice} đ
              </Text>
            ) : (
              <div className='flex flex-col leading-none'>
                <Text strong className='text-lg text-red-600 leading-none'>
                  {(props.unitPrice * (1 - props.discount / 100)).toFixed(0)} đ
                </Text>
                <div>
                  <Text
                    strong
                    className='text-xs line-through text-gray-400 pr-1 leading-none'
                  >
                    {props.unitPrice} đ
                  </Text>
                  <Text strong className='text-xs leading-none'>
                    -{props.discount}%
                  </Text>
                </div>
              </div>
            )}
            <div>
              <MinusCircleOutlined
                className='cursor-pointer text-lg'
                onClick={() => {
                  onChangeQuantity(quantity - 1)
                }}
              />
              <InputNumber
                className='mx-2'
                size='small'
                min={1}
                max={1000}
                value={quantity}
                onChange={onChangeQuantity}
              />
              <PlusCircleOutlined
                className='cursor-pointer text-lg'
                onClick={() => {
                  onChangeQuantity(quantity + 1)
                }}
              />
            </div>
            <ButtonClientPrimary
              name='Thêm vào giỏ hàng'
              iconInput={
                <FontAwesomeIcon className='text-xl p-2' icon={faCartPlus} />
              }
            />
          </div>
        </Col>
      </Row>
      <Tabs defaultActiveKey='1' items={items} onChange={onChangeTabs} />
    </div>
  )
}
