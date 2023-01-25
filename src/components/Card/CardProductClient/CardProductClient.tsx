import * as React from 'react';
import { Button, Card, Typography } from 'antd';
import ButtonClientPrimary from '@/components/Button/ButtonClientPrimary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

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

export default function CardProductClient(props: CardProductClientProps) {
  const handleAddToCart = () => {

  }
  return (
    <div className='w-1/4 pl-1 pr-1'>
      <Card hoverable className='rounded-xl' bodyStyle={{ padding: '12px' }}>
        <img className='' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        <Text strong className="text-lg">{props.name}</Text>
        <div className='flex justify-between'>
          <Text strong className="text-lg">{props.unitPrice}</Text>
          <ButtonClientPrimary iconInput={<FontAwesomeIcon className="text-xl p-2" icon={faCartPlus} />} />
        </div>
      </Card>
    </div>
  );
}
