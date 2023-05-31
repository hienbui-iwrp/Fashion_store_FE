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
  // console.log('object props: ', props);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false)
  const { setListProduct } = productsActions;
  const dataProducts: ProductsDataProps = useSelector(selectProducts);
  const options = GoodsOptions;
  // const options: SelectProps['options'] = [
  //   { value: 'man', label: 'Nam' },
  //   { value: 'woman', label: 'Nữ' },
  //   { value: 'unisex', label: 'Unisex' },
  //   { value: 'jacket', label: 'Áo khoác' },
  //   { value: 'sweater', label: 'Áo len' },
  //   { value: 'T-shirt', label: 'Áo thun' },
  //   { value: 'Trousers', label: 'Quần tây' },
  //   { value: 'kaki', label: 'Quần kaki' },
  //   { value: 'short', label: 'Quần sọt' },
  //   { value: 'sport Shoes', label: 'Giày thể thao' },
  //   { value: 'western shoes', label: 'Giày tây' },
  //   { value: 'sandal', label: 'Dép' },
  //   { value: 'ring', label: 'Nhẫn' },
  //   { value: 'hat', label: 'Nón' },
  //   { value: 'bag', label: 'Túi/balo' },
  //   { value: '31', label: '31' },
  //   { value: '32', label: '32' },
  //   { value: '33', label: '33' },
  //   { value: '34', label: '34' },
  //   { value: '35', label: '35' },
  //   { value: '36', label: '36' },
  //   { value: '37', label: '37' },
  //   { value: '38', label: '38' },
  //   { value: '39', label: '39' },
  //   { value: '40', label: '40' },
  //   { value: '41', label: '41' },
  //   { value: '42', label: '42' },
  //   { value: '43', label: '43' },
  //   { value: '44', label: '44' },
  //   { value: 'S', label: 'S' },
  //   { value: 'M', label: 'M' },
  //   { value: 'L', label: 'L' },
  //   { value: 'XL', label: 'XL' },
  //   { value: 'XXL', label: 'XXL' },
  //   { value: 'XXXL', label: 'XXXL' },
  // ]
  const [value, setValue] = useState('default')
  const [data, setData] = useState<ProductsDataProps>({
    ...dataProducts
  })
  const [listValueFilter, setListValueFilter] = useState<string[]>(props.filter)
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const filterProducts = (checklist: CheckboxValueType[], listValueFilter: string[]) => {
    setLoaded(true);
    setLoading(true);
    let listProduct: ProductDetailDataProps[] = [...dataProducts.listProduct]
    console.log('check', checklist, listValueFilter);
    if (listValueFilter.length !== 0) {
      listProduct = listProduct.filter((item) => {
        return listValueFilter.includes(item.type) || listValueFilter.includes(item.gender) || listValueFilter.includes(item.age)
      })
    }
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
    setData({
      totalProducts: listProduct.length,
      listProduct: [...listProduct]
    })
    setLoaded(false);
    setLoading(true);
  }

  const onChangePrice = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    filterProducts(list, listValueFilter)
  }

  const onChangeSort = (e: RadioChangeEvent) => {
    setValue(e.target.value)
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
        setData(dataProducts)
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
  }, [loaded])

  useEffect(() => {
    if (props.filter.length > 0) {
      console.log('yes filter', props.filter);
      setListValueFilter([...props.filter]);
      filterProducts(checkedList, listValueFilter);
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
              <Radio.Group onChange={onChangeSort} value={value}>
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
                  {/* {dataProducts.listProduct &&
                dataProducts.listProduct.map((item, index) => {
                  return <CardProductClient key={index} {...item} />
                })} */}
                </div>
            }
          </Col>
        </Row>
      </div>
    </div>
  )
}
