import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Typography, Image } from 'antd'
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { formatNumber, ProductDetailDataProps } from '@/utils'

const { Text } = Typography

export interface CardProductClientProps {
  goodsId: string
  name: string
  unitPrice: number
  image: string
  quantity: number
  size: string
  color: string
  discount: number
}

export default function CardProductClient(props: ProductDetailDataProps) {
  const link = `/products/${props.goodsId}`
  const router = useRouter()
  const handleAddToCart = () => {}
  const handleClickCard = () => {
    router.replace(link)
  }
  return (
    <div className='w-1/4 px-3 pb-4 ' style={{ minWidth: 180, maxWidth: 300 }}>
      <Card
        hoverable
        onClick={handleClickCard}
        className='rounded-xl'
        bodyStyle={{
          padding: '12px',
          boxShadow: '1px 5px 5px 1px #ddd',
          overflow: 'hidden',
          borderRadius: 12,
        }}
      >
        <Image src={props.images[0]} preview={false} className='pb-2' />
        {/* <img className='' alt='example'  /> */}
        <Text strong className='text-lg ' style={{ lineHeight: '1rem' }}>
          {props.name}
        </Text>
        <div className='flex justify-between items-center pt-2'>
          {props.discount === 0 ? (
            <Text strong className='text-lg'>
              {formatNumber(props.unitPrice)} đ
            </Text>
          ) : (
            <div className='flex flex-col leading-none'>
              <Text strong className='text-lg text-red-600 leading-none'>
                {formatNumber(props.price)} đ
              </Text>
              <div className='mt-1'>
                <Text
                  strong
                  className='text-xs line-through text-gray-400 pr-1 leading-none'
                >
                  {formatNumber(props.unitPrice)} đ
                </Text>
                <Text strong className='text-xs leading-none'>
                  -{formatNumber(props.discount)}%
                </Text>
              </div>
            </div>
          )}
          <ButtonClientPrimary
            iconInput={
              <FontAwesomeIcon className='text-xl p-2' icon={faCartPlus} />
            }
          />
        </div>
      </Card>
    </div>
  )
}
