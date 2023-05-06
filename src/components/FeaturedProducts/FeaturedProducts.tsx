import * as React from 'react'
import { Typography } from 'antd'
import CardProductClient from '../Card/CardProductClient'
import { ProductDetailDataProps } from '@/utils'

const { Title } = Typography

export interface FeaturedProductsProps {
  name: string,
  listProducts: ProductDetailDataProps[]
}


export default function FeaturedProducts(props: FeaturedProductsProps) {
  const itemsHidden: ProductDetailDataProps[] = []
  if (props.listProducts.length < 4) {
    for (let i = 0; i < 4 - props.listProducts.length; i++) {
      itemsHidden.push(props.listProducts[0])
    }
  }
  return (
    <div className='pt-3'>
      <Title level={3} className='!font-bold !mb-4 text-center'>
        {props.name}
      </Title>
      <div className={`flex w-full flex-wrap justify-between`}>
        {props.listProducts.map((item, index) => {
          return <CardProductClient key={index} dataProduct={{ ...item }} />
        })}
        {itemsHidden.map((item, index) => {
          return <CardProductClient key={index} className='invisible' dataProduct={{ ...item }} />
        })}
      </div>
    </div>
  )
}
