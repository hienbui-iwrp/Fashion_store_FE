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
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import styles from './ProductDetail.module.css'

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

const listProductImage: string[] = [
  'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
  'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
  'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
]

export default function ProductDetail(props: ProductDetailProps) {
  const [quantity, setQuantity] = React.useState<number>(1)
  const maxQuantity: number = 1000
  const [imageShow, setImageShow] = React.useState<string>('')
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <Text>Mô tả</Text>,
      children: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`,
    },
  ]

  const onChangeQuantity = (value: number) => {
    if (value > 0 && value < maxQuantity) {
      setQuantity(value)
    }
  }

  const onChangeColor = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`)
  }

  const onChangeTabs = (key: string) => {
    console.log(key)
  }

  const handleChangeImage = (image: string) => {
    setImageShow(image)
  }

  useEffect(() => {
    setImageShow(listProductImage[0])
  }, [])

  return (
    <div className='mb-4 px-8'>
      <Row className=''>
        <Col span={9}>
          <div className='flex justify-center'>
            <Image
              alt='img'
              width={350}
              height={400}
              className='py-2'
              src={imageShow}
              alt=''
            />
          </div>

          <div className='flex justify-center mt-2'>
            {listProductImage.map((item, index) => {
              return (
                <Image
                  alt='img'
                  key={index}
                  className='px-2'
                  preview={false}
                  width={60}
                  height={60}
                  onClick={() => handleChangeImage(item)}
                  src={item}
                  alt=''
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
              <Text strong>áo khoác</Text>
            </Space>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Tình trạng:</Text>
              <Text strong className='text-[#6A983C]'>
                Còn hàng
              </Text>
            </Space>
          </div>
          <div className='mt-8'>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Màu sắc:</Text>
              <Radio.Group
                buttonStyle='solid'
                onChange={onChangeColor}
                defaultValue='a'
                className={styles.productColor}
              >
                <Radio.Button value='a'>Trắng</Radio.Button>
                <Radio.Button value='b'>Xanh</Radio.Button>
                <Radio.Button value='c'>Đỏ</Radio.Button>
                <Radio.Button value='d'>Vàng</Radio.Button>
              </Radio.Group>
            </Space>
          </div>
          <div className='mt-8'>
            <Space>
              <Text className='text-[#A9A9A9] flex w-28'>Size:</Text>
              <Radio.Group
                buttonStyle='solid'
                onChange={onChangeColor}
                defaultValue='a'
                className={styles.productSize}
              >
                <Radio.Button value='d'>S</Radio.Button>
                <Radio.Button value='a'>M</Radio.Button>
                <Radio.Button value='b'>L</Radio.Button>
                <Radio.Button value='c'>XL</Radio.Button>
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
