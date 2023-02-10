import * as React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Typography } from 'antd';
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductDetailDataProps } from '@/utils';

const { Text } = Typography;

export interface CardProductClientProps {
  goodsId: string;
  name: string;
  unitPrice: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
  discount: number;
}

export default function CardProductClient(props: ProductDetailDataProps) {
  const link = `/products/${props.goodsId}`;
  const router = useRouter();
  const handleAddToCart = () => {

  }
  const handleClickCard = () => {
    router.replace(link);
  }
  return (
    <div className='w-1/4 pl-1 pr-1 pb-4'>
      <Card hoverable onClick={handleClickCard} className='rounded-xl' bodyStyle={{ padding: '12px' }}>
        <img className='' alt="example" src={props.images[0]} />
        <Text strong className="text-lg">{props.name}</Text>
        <div className='flex justify-between items-center'>
          {props.discount === 0 ?
            <Text strong className="text-lg">{props.unitPrice} đ</Text> :
            <div className='flex flex-col leading-none'>
              <Text strong className="text-lg text-red-600 leading-none">{props.price} đ</Text>
              <div>
                <Text strong className="text-xs line-through text-gray-400 pr-1 leading-none">{props.unitPrice} đ</Text>
                <Text strong className="text-xs leading-none">-{props.discount}%</Text>
              </div>
            </div>
          }
          <ButtonClientPrimary iconInput={<FontAwesomeIcon className="text-xl p-2" icon={faCartPlus} />} />
        </div>
      </Card>
    </div>
  );
}
