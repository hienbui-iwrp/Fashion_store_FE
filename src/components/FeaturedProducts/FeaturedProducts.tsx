import * as React from 'react';
import { Typography } from 'antd'
import CardProductClient from '../Card/CardProductClient';

const { Title } = Typography

export interface FeaturedProductsProps {
  name: string
}

const listFeaturedProduct = [
  {
    goodsId: '1',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    quantity: 1,
    size: '36',
    color: 'yellow',
    discount: 10
  },
  {
    goodsId: '2',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    quantity: 1,
    size: '36',
    color: 'yellow',
    discount: 10
  },
  {
    goodsId: '3',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    quantity: 1,
    size: '36',
    color: 'yellow',
    discount: 10
  },
  {
    goodsId: '4',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: 'Áo khoác mùa đông a',
    unitPrice: 100000,
    quantity: 1,
    size: '36',
    color: 'yellow',
    discount: 10
  },
]

export default function FeaturedProducts(props: FeaturedProductsProps) {
  return (
    <div className='pt-3'>
      <Title level={3} className="!font-bold !mb-2">{props.name}</Title>
      <div className='flex w-full'>
        {listFeaturedProduct.map((item, index) => {
          return (
            <CardProductClient key={index} {...item} />
          )
        })}
      </div>
    </div>
  );
}
