import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '@/components/ProductDetail'
import { ProductDetailDataProps, formatProductDataXML } from '@/utils'
import axios from 'axios'
import { getProductDetail, getProductDetailBff } from '@/api/products';
import { BASE_URL } from '@/constants'
import Loading from '@/components/Loading';

export default function ProductDetailPage(props: ProductDetailDataProps) {
  const router = useRouter();
  // const { id } = router.query;
  // const productId = router.asPath.split('/').at(-1)
  const { productId } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProductDetailDataProps>({
    goodsId: '',
    images: [''],
    name: '',
    unitPrice: 0,
    price: 0,
    listQuantity: [],
    type: '',
    discount: 0,
    gender: '',
    age: '',
    description: '',
  })

  const fetchData = async () => {
    if (productId) {
      await getProductDetailBff(String(productId))
        .then((res) => {
          if (res?.StatusCode === '200') {
            const data = formatProductDataXML(res?.Data[0]);
            setData(data);
            setLoading(false);
          }
        })
    }
    // await axios
    //   .get(`${BASE_URL}/api/product/detail`)
    //   .then((res) => {
    //     console.log(res)
    //     setData(res.data);
    //   })
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    loading ? <Loading /> :
      <ProductDetail {...data} />
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}