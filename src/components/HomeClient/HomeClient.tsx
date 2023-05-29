import * as React from 'react'
import { Carousel, Divider, Image } from 'antd'
import FeaturedProducts from '../FeaturedProducts'
import {
  getAllProductsBff,
  getAllProductsBpel,
  getBestSellerProductsBff,
  getEventCurrentClientBff,
  getNewProductsBff,
} from '@/api'
import {
  ProductDetailDataProps,
  ProductsDataProps,
  formatEventDataXML,
  formatProductsDataXML,
  formatRouteImage,
} from '@/utils'
import { useState } from 'react'
import Loading from '@/components/Loading'
import { useSelector } from 'react-redux'
import { selectProducts } from '@/redux/selectors'
import { productsActions, useAppDispatch } from '@/redux'
import { GoodsAccessory } from '@/constants'

export interface HomeClientProps { }

const contentStyle: React.CSSProperties = {
  height: '450px',
  color: '#fff',
  lineHeight: '260px',
  textAlign: 'center',
  background: '#eef',
}

export default function HomeClient(props: HomeClientProps) {
  const dataProducts: ProductsDataProps = useSelector(selectProducts)
  const dispatch = useAppDispatch()
  const { setListProduct } = productsActions

  const [dataEvent, setDataEvent] = useState([])
  const [dataNewProducts, setDataNewProducts] = useState<
    ProductDetailDataProps[]
  >([])
  const [dataBestSellerProducts, setDataBestSellerProducts] = useState<
    ProductDetailDataProps[]
  >([])
  const [dataProductsOfMan, setDataProductsOfMan] = useState<
    ProductDetailDataProps[]
  >([])
  const [dataProductsOfWoman, setDataProductsOfWoman] = useState<
    ProductDetailDataProps[]
  >([])
  const [dataProductsOfBaby, setDataProductsOfBaby] = useState<
    ProductDetailDataProps[]
  >([])
  const [dataProductsOfAccessory, setDataProductsOfAccessory] = useState<
    ProductDetailDataProps[]
  >([])
  const [loadingEvent, setLoadingEvent] = useState(true)
  const [loadingNewProduct, setLoadingNewProduct] = useState(true)
  const [loadingBestSeller, setLoadingBestSeller] = useState(true)
  const [loadingAllProducts, setLoadingAllProducts] = useState(true)

  const filterProducts = (
    listValueFilter: string[],
    dataListProducts: ProductDetailDataProps[]
  ) => {
    let listProduct: ProductDetailDataProps[] = dataListProducts
    if (listValueFilter.length !== 0) {
      listProduct = listProduct.filter((item, index) => {
        if (index > 3) {
          return false
        }
        return (
          listValueFilter.includes(item.type) ||
          listValueFilter.includes(item.gender) ||
          listValueFilter.includes(item.age)
        )
      })
    }
    return listProduct
  }

  const fetchEventData = async () => {
    await getEventCurrentClientBff().then((res) => {
      if (res?.StatusCode === '200') {
        const tempData = res.Data.map((item: any) => formatEventDataXML(item))
        setDataEvent(tempData)
        setLoadingEvent(false)
      }
    })
  }
  const fetchNewProducts = async () => {
    await getNewProductsBff().then((res) => {
      if (res?.StatusCode === '200') {
        const data = formatProductsDataXML(res?.Data)
        setDataNewProducts(data)
        setLoadingNewProduct(false)
      }
    })
  }
  const fetchBestSellerProducts = async () => {
    await getBestSellerProductsBff().then((res) => {
      console.log(res)
      if (res?.StatusCode === '200') {
        const data = formatProductsDataXML(res?.Data)
        setDataBestSellerProducts(data)
        setLoadingBestSeller(false)
      }
    })
  }

  const fetchAllProducts = async () => {
    await getAllProductsBpel().then((res) => {
      if (res?.StatusCode === '200') {
        const data = formatProductsDataXML(res?.Data)
        dispatch(setListProduct({ totalProducts: 0, listProduct: data }))
        setDataProductsOfMan(filterProducts(['1'], data))
        setDataProductsOfWoman(filterProducts(['2'], data))
        setDataProductsOfBaby(filterProducts(['KID'], data))
        setDataProductsOfAccessory(
          filterProducts(
            GoodsAccessory.map((item) => item.value),
            data
          )
        )
        setLoadingAllProducts(false)
      }
    })
  }

  React.useEffect(() => {
    fetchEventData()
    fetchBestSellerProducts()
    fetchNewProducts()
    fetchAllProducts()
  }, [])

  return (
    <div>
      {loadingEvent ? (
        <Loading />
      ) : (
        <Carousel autoplay className=' -mx-3 sm:-mx-6 md:-mx-14 !rounded-xl'>
          {dataEvent.map((event: any) => {
            return (
              <div key={event.id}>
                <Image
                  src={(event.image)}
                  alt={event.name}
                  style={{ width: '100vw', height: 400, borderRadius: 20 }}
                />
              </div>
            )
          })}
        </Carousel>
      )}
      <div className=''>
        {loadingBestSeller ? (
          <Loading />
        ) : (
          <FeaturedProducts
            name='SẢN PHẨM BÁN CHẠY NHẤT'
            listProducts={dataBestSellerProducts}
          />
        )}
        <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
        {loadingNewProduct ? (
          <Loading />
        ) : (
          <FeaturedProducts
            name='SẢN PHẨM MỚI'
            listProducts={dataNewProducts}
          />
        )}
        {loadingAllProducts ? (
          <Loading />
        ) : (
          <>
            {dataProductsOfMan.length ? (
              <>
                <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
                <FeaturedProducts
                  name='THỜI TRANG NAM'
                  listProducts={dataProductsOfMan}
                />
              </>
            ) : null}
            {dataProductsOfWoman.length ? (
              <>
                <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
                <FeaturedProducts
                  name='THỜI TRANG NỮ'
                  listProducts={dataProductsOfWoman}
                />
              </>
            ) : null}
            {dataProductsOfBaby.length ? (
              <>
                <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
                <FeaturedProducts
                  name='THỜI TRANG TRẺ EM'
                  listProducts={dataProductsOfBaby}
                />
              </>
            ) : null}
            {dataProductsOfAccessory.length ? (
              <>
                <Divider style={{ borderWidth: 1, backgroundColor: '#ddd' }} />
                <FeaturedProducts
                  name='PHỤ KIỆN'
                  listProducts={dataProductsOfAccessory}
                />
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
