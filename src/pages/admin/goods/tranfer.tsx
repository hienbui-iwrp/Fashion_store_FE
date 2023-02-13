import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import {
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Space,
  Image,
  Button,
  Radio,
} from 'antd'
import { AddButton, DropdownButton, LayoutAdmin, TableList } from '@/components'
import { formatDate, ModalAddEditStaff } from '@/utils'
import { InputSearch } from '@/components'
import { useRouter } from 'next/router'

interface DataType {
  id: string
  name: string
  price: number
  cost: number
  supplier: string
  gender: string
  age: string
  type: string
  image: string[]
  classify: { size: string; color: string; containedAt: DataWarehouse[] }[]
}

type DataWarehouse = {
  id: string
  name: string
  createdDate: Date
  updateDate: Date
  quantity: number
}

const Tranfer = () => {
  const [data, setData] = useState<DataType>()
  const [classifyData, setClassifyData] = useState<DataType>()
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<number>(0)

  const routes = useRouter()
  const { id, color, size } = routes.query

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/goodsDetailData?id=${id}`)
      .then((res) => {
        setData(res.data)
        setClassifyData(res.data.classify)
      })
  }

  useEffect(() => {
    if (id) getData()
    setLoading(false)
  }, [id])

  return (
    <LayoutAdmin selected={5}>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <Card>
          <Row className={styles.adminRow}>
            <Col xs={24} sm={12}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Mã sản phẩm</b>
                </Col>
                <Col xs={14} lg={16}>
                  {data?.id}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={1} lg={2}></Col>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Mã kho</b>
                </Col>
                <Col xs={14} lg={16}>
                  warehouse_1
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col xs={24} sm={12}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Tên sản phẩm</b>
                </Col>
                <Col xs={14} lg={16}>
                  {data?.name}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={1} lg={2}></Col>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Kho</b>
                </Col>
                <Col xs={14} lg={16}>
                  <DropdownButton
                    label={'Kho 1'}
                    items={[{ content: 'a' }, { content: 'b' }]}
                    disabled
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col xs={24} sm={12}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Màu</b>
                </Col>
                <Col xs={14} lg={16}>
                  {color}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col xs={24} sm={12}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Kích thước</b>
                </Col>
                <Col xs={14} lg={16}>
                  {size}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card>
          <div>
            <b>Hành động</b>
          </div>
          <Radio.Group
            onChange={(event: any) => {
              setMode(event.target.value)
              console.log(event.target.value)
            }}
            style={{ width: '100%' }}
          >
            <Row className={styles.row}>
              <Col xs={24} sm={8} lg={4}>
                <Radio value={1}>Nhập kho</Radio>
              </Col>
              <Col xs={24} sm={8} lg={4}>
                <Radio value={2}>Chuyển kho</Radio>
              </Col>
              <Col xs={24} sm={8} lg={4}>
                <Radio value={3}>Xuất kho</Radio>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Radio value={4}>Trả hàng nhà cung cấp</Radio>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Radio value={5}>Khách trả hàng</Radio>
              </Col>
            </Row>
          </Radio.Group>
          <Row className='mt-10'>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={9}>
                  <b>Kho đến</b>
                </Col>
                <Col xs={14} lg={15}>
                  <DropdownButton
                    label='Kho 1'
                    items={[{ content: 'a' }, { content: 'a' }]}
                    disabled={mode != 2}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={2} lg={4}></Col>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Số lượng</b>
                </Col>
                <Col xs={14} lg={16}>
                  <InputNumber className={styles.adminInputShadow} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={9}>
                  <b>Nhà cung cấp</b>
                </Col>
                <Col xs={14} lg={15}>
                  <Input
                    className={styles.adminInputShadow}
                    disabled={mode != 1 && mode != 4}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={2} lg={4}></Col>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Mã đơn</b>
                </Col>
                <Col xs={14} lg={16}>
                  <Input
                    className={styles.adminInputShadow}
                    disabled={mode != 3 && mode != 5}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={9}>
                  <b>Giao vận</b>
                </Col>
                <Col xs={14} lg={15}>
                  <DropdownButton
                    label='GHN'
                    items={[{ content: 'a' }, { content: 'a' }]}
                    disabled={mode != 1 && mode != 2 && mode != 3 && mode != 4}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className='flex justify-end mt-3'>
            <AddButton label='Thực hiện' />
          </div>
        </Card>
      </Space>
    </LayoutAdmin>
  )
}

Tranfer.displayName = 'Goods Tranfer'

export default Tranfer
