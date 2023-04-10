import * as React from 'react'
import { Typography } from 'antd'
import CardProductClient from '../Card/CardProductClient'
import { ProductDetailDataProps } from '@/utils'

const { Title } = Typography

export interface FeaturedProductsProps {
  name: string
}

const listFeaturedProduct = [
  {
    goodsId: '1',
    images: [
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    ],
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    price: 90000,
    listQuantity: [
      {
        size: '36',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '36',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '37',
        color: 'trắng',
        quantity: 0,
      },
      {
        size: '37',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '37',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '37',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '38',
        color: 'trắng',
        quantity: 10,
      },
      {
        size: '38',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '38',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '38',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '39',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '39',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'đen',
        quantity: 5,
      },
    ],
    type: 'áo khoác',
    discount: 10,
    gender: 'nữ',
    age: 'adult',
    description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`,
  },
  {
    goodsId: '2',
    images: [
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    ],
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    price: 90000,
    listQuantity: [
      {
        size: '36',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '36',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '37',
        color: 'trắng',
        quantity: 0,
      },
      {
        size: '37',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '37',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '37',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '38',
        color: 'trắng',
        quantity: 10,
      },
      {
        size: '38',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '38',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '38',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '39',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '39',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'đen',
        quantity: 5,
      },
    ],
    type: 'áo khoác',
    discount: 10,
    gender: 'nữ',
    age: 'adult',
    description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`,
  },
  {
    goodsId: '3',
    images: [
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    ],
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    price: 90000,
    listQuantity: [
      {
        size: '36',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '36',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '37',
        color: 'trắng',
        quantity: 0,
      },
      {
        size: '37',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '37',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '37',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '38',
        color: 'trắng',
        quantity: 10,
      },
      {
        size: '38',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '38',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '38',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '39',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '39',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'đen',
        quantity: 5,
      },
    ],
    type: 'áo khoác',
    discount: 10,
    gender: 'nữ',
    age: 'adult',
    description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`,
  },
  {
    goodsId: '4',
    images: [
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    ],
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    price: 90000,
    listQuantity: [
      {
        size: '36',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '36',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '36',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '37',
        color: 'trắng',
        quantity: 0,
      },
      {
        size: '37',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '37',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '37',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '38',
        color: 'trắng',
        quantity: 10,
      },
      {
        size: '38',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '38',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '38',
        color: 'đen',
        quantity: 5,
      },
      {
        size: '39',
        color: 'trắng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'xanh',
        quantity: 5,
      },
      {
        size: '39',
        color: 'vàng',
        quantity: 5,
      },
      {
        size: '39',
        color: 'đen',
        quantity: 5,
      },
    ],
    type: 'áo khoác',
    discount: 10,
    gender: 'nữ',
    age: 'adult',
    description: `Áo khoác thời trang nam nữ 2208B7013 được làm từ sợi nilong và đảm bảo cho bạn 1 một mùa đông ấm áp`,
  },
]

export default function FeaturedProducts(props: FeaturedProductsProps) {
  return (
    <div className='pt-3'>
      <Title level={3} className='!font-bold !mb-4 text-center'>
        {props.name}
      </Title>
      <div className='flex w-full flex-wrap	justify-center'>
        {listFeaturedProduct.map((item, index) => {
          return <CardProductClient key={index} {...item} />
        })}
      </div>
    </div>
  )
}
