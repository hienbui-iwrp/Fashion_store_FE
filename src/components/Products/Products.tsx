import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store'
import { selectProducts, selectProductsByCategory } from '@/redux/selectors'
import { productsActions } from '@/redux/slices'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import {
  Typography,
  Select,
  Col,
  Row,
  Radio,
  Space,
  Checkbox,
  Card,
  List,
} from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { SelectProps } from 'antd'
import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons'
import CardProductClient from '../Card/CardProductClient'
import { ProductsDataProps, ProductDetailDataProps, formatProductsDataXML } from '@/utils'
import axios from 'axios'
import { getAllProducts, getAllProductsBff, getAllProductsBpel, searchProductsBff } from '@/api/products'
import { BASE_URL, Colors, GoodsAccessory, GoodsClothes, GoodsFootwear, GoodsGenders, GoodsOptions } from '@/constants'
import styles from './Products.module.css'
import { FilterTag } from '../FilterTag'
import { useRouter } from 'next/router';
import Loading from '../Loading';

const { Title, Text } = Typography

export interface ProductsProps {
  filter: string[]
  search?: string
}

const CheckboxGroup = Checkbox.Group

const plainOptions = [
  { label: '0 - 500.000đ', value: 'lt5h' },
  { label: '500.000 - 1.000.000 đ', value: '5hTo1m' },
  { label: '1.000.000 - 3.000.000 đ', value: '1mTo3m' },
  { label: '3.000.000 - 5.000.000 đ', value: '3mTo5m' },
  { label: '5.000.000 đ trở lên', value: 'gt5m' },
]
const defaultCheckedList: string[] = []

export default function Products(props: ProductsProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false)
  const { setListProduct } = productsActions;
  const dataProducts: ProductsDataProps = useSelector(selectProducts);
  const options = GoodsOptions;
  const [valueSort, setValueSort] = useState('default')
  const [data, setData] = useState<ProductsDataProps>({
    ...dataProducts
  })
  const [listValueFilter, setListValueFilter] = useState<string[]>(props.filter)
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const filterProducts = (checklist: CheckboxValueType[], listValueFilter: string[]) => {
    // setLoaded(true);
    setLoading(true);
    if (listValueFilter.length === 0 && checklist.length === 0) {
      setData({ ...dataProducts })
    }
    else {
      let listProduct: ProductDetailDataProps[] = [...dataProducts.listProduct];
      // let listProduct: ProductDetailDataProps[] = listValueFilter.length === 0 ? [...dataProducts.listProduct] : [...data.listProduct];
      console.log('check', checklist, listValueFilter);
      if (checklist.length > 0 && checklist.length < 5) {
        listProduct = listProduct.filter(item => {
          if (item.price <= 500000 && checklist.includes('lt5h'))
            return true;
          if (item.price > 500000 && item.price <= 1000000 && checklist.includes('5hTo1m'))
            return true;
          if (item.price > 1000000 && item.price <= 3000000 && checklist.includes('1mTo3m'))
            return true;
          if (item.price > 3000000 && item.price <= 5000000 && checklist.includes('3mTo5m'))
            return true;
          if (item.price > 5000000 && checklist.includes('gt5m'))
            return true;
          return false
        })
      }
      if (listValueFilter.length !== 0) {
        listProduct = listProduct.filter((item) => {
          return listValueFilter.includes(item.type) || listValueFilter.includes(item.gender) || listValueFilter.includes(item.age)
        })
      }
      switch (valueSort) {
        case 'a-z':
          const dataSortAlphaBetIncrease = listProduct.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return a.name.localeCompare(b.name) })
          setData({
            totalProducts: dataSortAlphaBetIncrease.length,
            listProduct: dataSortAlphaBetIncrease
          })
          break
        case 'z-a':
          let dataSortAlphaBetDecrease = listProduct.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return b.name.localeCompare(a.name) })
          setData({
            totalProducts: dataSortAlphaBetDecrease.length,
            listProduct: dataSortAlphaBetDecrease
          })
          break
        case 'increase':
          let dataSortIncrease = listProduct.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return a.price - b.price })
          setData({
            totalProducts: dataSortIncrease.length,
            listProduct: dataSortIncrease
          })
          break
        case 'decrease':
          let dataSortDecrease = listProduct.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return b.price - a.price })
          setData({
            totalProducts: dataSortDecrease.length,
            listProduct: dataSortDecrease
          })
          break
        default:
          let dataDefault = dataProducts.listProduct.filter(item => {
            for (let i = 0; i < listProduct.length; i++) {
              if (listProduct[i].goodsId === item.goodsId) {
                return true;
              }
            }
            return false;
          });
          setData({
            totalProducts: dataDefault.length,
            listProduct: dataDefault
          })
      }
      // setData({
      //   totalProducts: listProduct.length,
      //   listProduct: [...listProduct]
      // })
    }
    // setLoaded(false);
    setLoading(false);
  }

  const onChangePrice = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    filterProducts(list, listValueFilter)
  }

  const onChangeSort = (e: RadioChangeEvent) => {
    setValueSort(e.target.value)
    // const dataShow = listValueFilter.length === 0 ? [...dataProducts.listProduct ] : [...data.listProduct ]
    const dataShow = [...data.listProduct]
    switch (e.target.value) {
      case 'a-z':
        const dataSortAlphaBetIncrease = dataShow.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return a.name.localeCompare(b.name) })
        setData({
          totalProducts: dataSortAlphaBetIncrease.length,
          listProduct: dataSortAlphaBetIncrease
        })
        break
      case 'z-a':
        let dataSortAlphaBetDecrease = dataShow.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return b.name.localeCompare(a.name) })
        setData({
          totalProducts: dataSortAlphaBetDecrease.length,
          listProduct: dataSortAlphaBetDecrease
        })
        break
      case 'increase':
        let dataSortIncrease = dataShow.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return a.price - b.price })
        setData({
          totalProducts: dataSortIncrease.length,
          listProduct: dataSortIncrease
        })
        break
      case 'decrease':
        let dataSortDecrease = dataShow.sort((a: ProductDetailDataProps, b: ProductDetailDataProps) => { return b.price - a.price })
        setData({
          totalProducts: dataSortDecrease.length,
          listProduct: dataSortDecrease
        })
        break
      default:
        let dataDefault = dataProducts.listProduct.filter(item => {
          for (let i = 0; i < data.listProduct.length; i++) {
            if (data.listProduct[i].goodsId === item.goodsId) {
              return true;
            }
          }
          return false;
        });
        setData({
          totalProducts: dataDefault.length,
          listProduct: dataDefault
        })
    }
  }

  const handleSelectFilter = (value: string) => {
    const newListValueFilter = [...listValueFilter, value]
    if (!listValueFilter.includes(value)) {
      setListValueFilter(newListValueFilter)
    }
    filterProducts(checkedList, newListValueFilter)
  }

  const handleDeselect = (value: string) => {
    const newListValueFilter = listValueFilter.filter((item) => {
      return item !== value
    })
    setListValueFilter(newListValueFilter)
    filterProducts(checkedList, newListValueFilter)
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const handleListChange = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  const fetchData = async () => {
    setLoading(true);
    await getAllProductsBpel({ pageSize: 100, offset: 1 }).then((res) => {
      if (res?.StatusCode === '200') {
        const data = formatProductsDataXML(res?.Data);
        setData({ totalProducts: 0, listProduct: data });
        dispatch(setListProduct({ totalProducts: 0, listProduct: data }));
        filterProducts(checkedList, listValueFilter);
        setLoaded(true);
      }
    })
    setLoading(false);
  }

  const fetchDataSearch = async (value: string) => {
    setLoading(true);
    await searchProductsBff(value)
      .then((res) => {
        if (res?.StatusCode === '200') {
          const data = formatProductsDataXML(res?.Data);
          setData({ totalProducts: 0, listProduct: data });
          dispatch(setListProduct({ totalProducts: 0, listProduct: data }));
          filterProducts(checkedList, listValueFilter);
          setLoaded(true);
        }
      })
    setLoading(false);
  }

  useEffect(() => {
    if (!props.search) {
      fetchData();
    }
    else {
      fetchDataSearch(props.search);
    }
  }, [])
  // }, [loaded])

  useEffect(() => {
    if (props.filter.length > 0) {
      console.log('yes filter', props.filter);
      setListValueFilter([...props.filter]);
      filterProducts(checkedList, props.filter);
    }
  }, [props.filter])

  useEffect(() => {
    if (props.search) {
      fetchDataSearch(props.search);
    }
  }, [props.search])

  return (
    <div className='products-content '>
      <div className='products-title flex justify-between'>
        <Title level={3}>Tất cả sản phẩm</Title>
      </div>
      <div className='products-filter'>
        <div className='flex gap-2'>
          {/* <FilterOutlined className='flex items-center text-3xl' /> */}
          <Select
            placeholder={<Text strong>Giới tính</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={GoodsGenders}
            suffixIcon={
              <CaretDownOutlined
                style={{
                  color: Colors.adminGreen700,
                  marginLeft: 10,
                  marginRight: -5,
                }}
              />
            }
          />
          <Select
            placeholder={<Text strong>Áo quần</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={GoodsClothes}
            suffixIcon={
              <CaretDownOutlined
                style={{
                  color: Colors.adminGreen700,
                  marginLeft: 10,
                  marginRight: -5,
                }}
              />
            }
          />
          <Select
            placeholder={<Text strong>Giày dép</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={GoodsFootwear}
            suffixIcon={
              <CaretDownOutlined
                style={{
                  color: Colors.adminGreen700,
                  marginLeft: 10,
                  marginRight: -5,
                }}
              />
            }
          />
          <Select
            placeholder={<Text strong>Phụ kiện</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={GoodsAccessory}
            suffixIcon={
              <CaretDownOutlined
                style={{
                  color: Colors.adminGreen700,
                  marginLeft: 10,
                  marginRight: -5,
                }}
              />
            }
          />
        </div>

        <Select
          mode='multiple'
          allowClear
          defaultActiveFirstOption={false}
          showSearch={false}
          bordered={false}
          style={{ width: '100%' }}
          defaultValue={listValueFilter}
          value={listValueFilter}
          onDeselect={handleDeselect}
          onClear={() => {
            setListValueFilter([]);
            filterProducts(checkedList, listValueFilter);
          }}
          options={options}
          dropdownRender={() => <></>}
          dropdownStyle={{ display: 'none' }}
        />
      </div>
      <div className='products-list'>
        <Row>
          <Col className='products-sort ' span={5}>
            <div>
              <Title level={4}>Sắp xếp</Title>
              <Radio.Group onChange={onChangeSort} value={valueSort}>
                <Space direction='vertical'>
                  <Radio value={'default'}>Mặc định</Radio>
                  <Radio value={'a-z'}>từ A - Z</Radio>
                  <Radio value={'z-a'}>từ Z - A</Radio>
                  <Radio value={'increase'}>Giá thấp đến cao</Radio>
                  <Radio value={'decrease'}>Giá cao đến thấp</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div>
              <Title level={4}>Giá</Title>
              <CheckboxGroup
                className={styles.productsSortPrice}
                options={plainOptions}
                value={checkedList}
                onChange={onChangePrice}
              />
            </div>
          </Col>
          <Col className='products-list-product' span={19}>
            {
              loading ? <Loading /> :
                <div className='flex w-full flex-wrap'>
                  {data.listProduct &&
                    data.listProduct.map((item, index) => {
                      return <CardProductClient key={index} dataProduct={{ ...item }} />
                    })}
                </div>
            }
          </Col>
        </Row>
      </div>
    </div>
  )
}
