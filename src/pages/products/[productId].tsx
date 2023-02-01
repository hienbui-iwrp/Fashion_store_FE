import * as React from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '@/components/ProductDetail'

export interface ProductDetailProps {
  goodsId: string;
  name: string;
  unitPrice: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
  discount: number;
}

const productDetailProps : ProductDetailProps = {
  goodsId: '1',
  image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  name: 'Áo khoác mùa đông a',
  unitPrice: 100000,
  quantity: 1,
  size: '36',
  color: 'yellow',
  discount: 10
}

export default function ProductDetailPage(props: ProductDetailProps) {
  const router = useRouter();
  console.log('check', router.query)
  return (
    <ProductDetail {...productDetailProps} />
  );
}
