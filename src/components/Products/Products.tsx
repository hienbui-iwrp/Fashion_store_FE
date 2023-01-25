import { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Typography, Select, Col, Row, Radio, Space, Checkbox, Divider } from 'antd'
import type { RadioChangeEvent } from 'antd';
import type { SelectProps } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styles from './Products.module.css'

const { Title, Text } = Typography


export interface ProductsProps {
}
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['0 - 500.000đ', '500.000 - 1.000.000 đ', '1.000.000 - 3.000.000 đ', '3.000.000 - 5.000.000 đ', '5.000.000 đ trở lên'];
const defaultCheckedList = ['0 - 500.000đ', '500.000 - 1.000.000 đ'];

export default function Products(props: ProductsProps) {
  const options: SelectProps['options'] = [];
  const [value, setValue] = useState(1);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChangePrice = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleListChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <div className='products-content px-4 md:px-8'>
      <div className="products-title flex justify-between">
        <Title level={3}>Tất cả sản phẩm</Title>
        <div>
          <Text className='bg-lime-200 rounded-lg px-2'>118</Text>
          <Text> sản phẩm</Text>
        </div>
      </div>
      <div className='products-filter'>
        <div className='flex gap-2'>
          <FilterOutlined className='flex items-center text-3xl' />
          <Select
            placeholder={<Text strong>Giới tính</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
          <Select
            placeholder={<Text strong>Kiểu dáng</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
          <Select
            placeholder={<Text strong>Áo quần</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
          <Select
            placeholder={<Text strong>Giày dép</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
          <Select
            placeholder={<Text strong>Phụ kiện</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
          <Select
            placeholder={<Text strong>Size</Text>}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
        </div>

        <Select
          mode="multiple"
          allowClear
          defaultActiveFirstOption={false}
          showSearch={false}
          bordered={false}
          style={{ width: '100%' }}
          defaultValue={['a10', 'c12']}
          options={options}
          dropdownRender={() => (<></>)}
          dropdownStyle={{ display: 'none' }}
        />
      </div>
      <div className='products-list'>
        <Row>
          <Col className='products-sort ' span={5}>
            <div>
              <Title level={3}>Sắp xếp</Title>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Mặc định</Radio>
                  <Radio value={2}>từ A - Z</Radio>
                  <Radio value={3}>từ Z - A</Radio>
                  <Radio value={4}>Giá thấp đến cao</Radio>
                  <Radio value={5}>Giá cao đến thấp</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div>
              <Title level={3}>Giá</Title>
              <CheckboxGroup className={styles.productsSortPrice} options={plainOptions} value={checkedList} onChange={onChangePrice} />
            </div>
          </Col>
          <Col className='products-list-product' span={19}>list products</Col>
        </Row>
      </div>
    </div>

  );
}
