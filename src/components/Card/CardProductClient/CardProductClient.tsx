import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Typography, Image } from 'antd'
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FormatMoney, formatNumber, ProductDetailDataProps } from '@/utils'
import { addGoodsBff } from '@/api'
import { setNotificationType, setNotificationValue, useAppDispatch } from '@/redux'

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
  const link = `/products/${props.goodsId}`;
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  var valueColor = '';
  var valueSize = '';
  var quantity = 0;
  for (let i = 0; i < props.listQuantity?.length; i++) {
    if (props.listQuantity[i].quantity > 0) {
      valueColor = props.listQuantity[i].color;
      valueSize = props.listQuantity[i].size;
      quantity = 1;
      break;
    }
  }
  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    onAddToCart();
  }
  const handleClickCard = () => {
    router.replace(link)
  }

  const onAddToCart = async () => {
    if (localStorage.getItem('userId')) {
      await addGoodsBff(localStorage.getItem('userId') ?? '',
        {
          ...props, goodsColor: valueColor ?? '',
          goodsSize: valueSize ?? '',
          quantity, image: '',
        })
        .then(res => {
          if (res?.StatusCode === '200') {
            dispatch(setNotificationValue('Thêm vào giỏ hàng thành công'))
          }
          else {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thêm vào giỏ hàng, vui lòng thử lại'))
          }
        })
    }
  }

  return (
    <div className='card-product-client flex w-1/4 px-3 pb-4' style={{ minWidth: 180, maxWidth: 300 }}>
      <Card
        hoverable
        onClick={handleClickCard}
        className='rounded-xl flex w-full'
        bodyStyle={{
          padding: '12px',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '1px 5px 5px 1px #ddd',
          overflow: 'hidden',
          borderRadius: 12,
        }}
      >
        <div className='pb-2 flex items-center justify-center'>
          <Image src={props.images[0] || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} preview={false} className='pb-2 !h-64' />
        </div>
        <div className='flex-1'>
          <div className='flex flex-col justify-between h-full'>
            <Text strong className='text-lg' style={{ lineHeight: '1.25rem' }}>
              {props.name}
            </Text>
            <div className='flex justify-between items-center pt-2'>
              {props.discount === 0 ? (
                <Text strong className='text-lg'>
                  {FormatMoney(props.unitPrice)}
                </Text>
              ) : (
                <div className='flex flex-col leading-none'>
                  <Text strong className='text-lg text-red-600 leading-none'>
                    {FormatMoney(props.price)}
                  </Text>
                  <div className='mt-1'>
                    <Text
                      strong
                      className='text-xs line-through text-gray-400 pr-1 leading-none'
                    >
                      {FormatMoney(props.unitPrice)}
                    </Text>
                    <Text strong className='text-xs leading-none'>
                      -{props.discount}%
                    </Text>
                  </div>
                </div>
              )}
              <ButtonClientPrimary
                disabled={quantity === 0}
                onClick={handleAddToCart}
                icon={<FontAwesomeIcon className='text-xl p-2' icon={faCartPlus} />}
              />
            </div>

          </div>
        </div>

      </Card>
    </div>
  )
}
