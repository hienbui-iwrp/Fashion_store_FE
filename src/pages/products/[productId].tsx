import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '@/components/ProductDetail'
import { ProductDetailDataProps } from '@/utils'
import axios from 'axios'
import { getProductDetail } from '@/api/products';
import { BASE_URL } from '@/constants'

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

export default function ProductDetailPage(props: ProductDetailDataProps) {
  const router = useRouter();
  console.log(router.asPath.split('/').at(-1));
  const [data, setData] = useState<ProductDetailDataProps>({
    goodsId: '',
    images: [''],
    name: '',
    unitPrice: 0,
    price: 0,
    quantity: 0,
    size: [],
    color: [],
    type: '',
    discount: 0,
    gender: '',
    age: '',
    description: '',
  })

  const fetchData = async () => {
    getProductDetail('1')
      .then((res) => {
        console.log('fetch check', res)
        setData(res?.data);
      })

    // await axios
    //   .get(`${BASE_URL}/api/product/detail`)
    //   .then((res) => {
    //     console.log(res)
    //     setData(res.data);
    //   })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <ProductDetail {...data} />
  );
}
