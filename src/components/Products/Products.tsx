import { useState, useEffect } from 'react'
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
import { FilterOutlined } from '@ant-design/icons'
import CardProductClient from '../Card/CardProductClient'
import { ProductsDataProps, ProductDetailDataProps } from '@/utils'
import axios from 'axios'
import { getAllProducts } from '@/api/products'
import { BASE_URL } from '@/constants'
import styles from './Products.module.css'

const { Title, Text } = Typography

export interface ProductsProps {}
const CheckboxGroup = Checkbox.Group

const plainOptions = [
  '0 - 500.000đ',
  '500.000 - 1.000.000 đ',
  '1.000.000 - 3.000.000 đ',
  '3.000.000 - 5.000.000 đ',
  '5.000.000 đ trở lên',
]
const defaultCheckedList = ['0 - 500.000đ', '500.000 - 1.000.000 đ']

export default function Products(props: ProductsProps) {
  const options: SelectProps['options'] = [
    { value: 'man', label: 'Nam' },
    { value: 'woman', label: 'Nữ' },
    { value: 'unisex', label: 'Unisex' },
    { value: 'jacket', label: 'Áo khoác' },
    { value: 'sweater', label: 'Áo len' },
    { value: 'T-shirt', label: 'Áo thun' },
    { value: 'Trousers', label: 'Quần tây' },
    { value: 'kaki', label: 'Quần kaki' },
    { value: 'short', label: 'Quần sọt' },
    { value: 'sport Shoes', label: 'Giày thể thao' },
    { value: 'western shoes', label: 'Giày tây' },
    { value: 'sandal', label: 'Dép' },
    { value: 'ring', label: 'Nhẫn' },
    { value: 'hat', label: 'Nón' },
    { value: 'bag', label: 'Túi/balo' },
    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
  ]
  const [value, setValue] = useState(1)
  const [data, setData] = useState<ProductsDataProps>({
    totalProducts: 0,
    listProduct: [],
  })
  const [listValueFilter, setListValueFilter] = useState(['man'])
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)

  const onChangePrice = (list: CheckboxValueType[]) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const handleSelectFilter = (value: string) => {
    if (!listValueFilter.includes(value)) {
      setListValueFilter([...listValueFilter, value])
    }
  }

  const handleDeselect = (value: string) => {
    setListValueFilter(
      listValueFilter.filter((item) => {
        return item !== value
      })
    )
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const handleListChange = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  const fetchData = async () => {
    getAllProducts().then((res) => {
      console.log(res)
      setData(res?.data)
    })

    // await axios
    //   .get(`${BASE_URL}/api/products`)
    //   .then((res) => {
    //     console.log(res)
    //     setData(res.data)
    //   })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='products-content px-4 md:px-8'>
      <div className='products-title flex justify-between'>
        <Title level={3}>Tất cả sản phẩm</Title>
        <Space>
          <Text className='bg-lime-200 rounded-lg px-2'>
            {data.totalProducts}
          </Text>
          <Text> sản phẩm</Text>
        </Space>
      </div>
      <div className='products-filter'>
        <div className='flex gap-2'>
          <FilterOutlined className='flex items-center text-3xl' />
          <Select
            placeholder={<Text strong>Giới tính</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={[
              { value: 'man', label: 'Nam' },
              { value: 'woman', label: 'Nữ' },
              { value: 'unisex', label: 'Unisex' },
            ]}
          />
          <Select
            placeholder={<Text strong>Áo quần</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={[
              { value: 'jacket', label: 'Áo khoác' },
              { value: 'sweater', label: 'Áo len' },
              { value: 'T-shirt', label: 'Áo thun' },
              { value: 'Trousers', label: 'Quần tây' },
              { value: 'kaki', label: 'Quần kaki' },
              { value: 'short', label: 'Quần sọt' },
            ]}
          />
          <Select
            placeholder={<Text strong>Giày dép</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={[
              { value: 'sport Shoes', label: 'Giày thể thao' },
              { value: 'western shoes', label: 'Giày tây' },
              { value: 'sandal', label: 'Dép' },
            ]}
          />
          <Select
            placeholder={<Text strong>Phụ kiện</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={[
              { value: 'ring', label: 'Nhẫn' },
              { value: 'hat', label: 'Nón' },
              { value: 'bag', label: 'Túi/balo' },
            ]}
          />
          <Select
            placeholder={<Text strong>Size</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            onSelect={handleSelectFilter}
            options={[
              { value: '31', label: '31' },
              { value: '32', label: '32' },
              { value: '33', label: '33' },
              { value: '34', label: '34' },
              { value: '35', label: '35' },
              { value: '36', label: '36' },
              { value: '37', label: '37' },
              { value: '38', label: '38' },
              { value: '39', label: '39' },
              { value: '40', label: '40' },
              { value: '41', label: '41' },
              { value: '42', label: '42' },
              { value: '43', label: '43' },
              { value: '44', label: '44' },
            ]}
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
          onClear={() => setListValueFilter([])}
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
              <Radio.Group onChange={onChange} value={value}>
                <Space direction='vertical'>
                  <Radio value={1}>Mặc định</Radio>
                  <Radio value={2}>từ A - Z</Radio>
                  <Radio value={3}>từ Z - A</Radio>
                  <Radio value={4}>Giá thấp đến cao</Radio>
                  <Radio value={5}>Giá cao đến thấp</Radio>
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
            <div className='flex w-full flex-wrap'>
              {data.listProduct &&
                data.listProduct.map((item, index) => {
                  return <CardProductClient key={index} {...item} />
                })}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
