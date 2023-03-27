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
import { Card, Col, Input, InputNumber, Row, Space, Image, Button } from 'antd'
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

const Detail = () => {
  const [data, setData] = useState<DataType>()
  const [classifyData, setClassifyData] = useState<DataType>()
  const [loading, setLoading] = useState(true)

  const routes = useRouter()
  const { id } = routes.query

  const columns: ColumnsType<DataWarehouse> = []
  if (data) {
    columns.push({
      title: 'Mã kho',
      dataIndex: 'id',
      render(text: string, record: DataWarehouse, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
      sorter: (a: DataWarehouse, b: DataWarehouse) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Tên kho',
      dataIndex: 'name',
      render(text: string, record: DataWarehouse, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
      sorter: (a: DataWarehouse, b: DataWarehouse) => (a.id > b.id ? 1 : -1),
    })
    columns.push({
      title: 'Số lượng',
      dataIndex: 'quantity',
      render(text: string, record: DataWarehouse, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: DataWarehouse, b: DataWarehouse) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      render(text: string, record: DataWarehouse, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataWarehouse, b: DataWarehouse) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Ngày thêm',
      dataIndex: 'updateDate',
      render(text: string, record: DataWarehouse, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 110 },
        }
      },
      sorter: (a: DataWarehouse, b: DataWarehouse) => (a.id > b.id ? 1 : -1),
    })
  }

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
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <Card>
          {id && (
            <Row className={styles.adminRow}>
              <b className='mr-10'>Mã sản phẩm</b>
              {data?.id}
            </Row>
          )}
          <Row>
            <Col xs={24} sm={15}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={6}>
                  <b>Tên sản phẩm</b>
                </Col>
                <Col xs={14} sm={18}>
                  {data?.name && (
                    <Input
                      defaultValue={data.name}
                      className={styles.adminInputShadow}
                    />
                  )}
                  {!id && <Input className={styles.adminInputShadow} />}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={1} lg={2}></Col>
            <Col xs={24} sm={8} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={8}>
                  <b>Giới tính</b>
                </Col>
                <Col xs={14} sm={16}>
                  <DropdownButton
                    label={data?.gender ?? 'Giới tính'}
                    items={['a', 'b']}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={7} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={13}>
                  <b>Đơn giá</b>
                </Col>
                <Col xs={14} sm={11}>
                  {data?.price && (
                    <InputNumber
                      defaultValue={data.price}
                      className={styles.adminInputShadow}
                    />
                  )}
                  {!id && <InputNumber className={styles.adminInputShadow} />}
                </Col>
              </Row>
            </Col>
            <Col sm={1} lg={2}></Col>
            <Col xs={24} sm={7} lg={6}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={12}>
                  <b>Giá nhập</b>
                </Col>
                <Col xs={14} sm={12}>
                  {data?.cost && (
                    <InputNumber
                      defaultValue={data?.cost}
                      className={styles.adminInputShadow}
                    />
                  )}
                  {!id && <InputNumber className={styles.adminInputShadow} />}
                </Col>
              </Row>
            </Col>
            <Col sm={1} lg={2}></Col>
            <Col xs={24} sm={8} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={8}>
                  <b>Loại</b>
                </Col>
                <Col xs={14} sm={16}>
                  <DropdownButton
                    label={data?.type ?? 'Loại'}
                    items={['a', 'b']}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={15}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={6}>
                  <b>Nhà cung cấp</b>
                </Col>
                <Col xs={14} sm={18}>
                  {data?.supplier && (
                    <Input
                      defaultValue={data.supplier}
                      className={styles.adminInputShadow}
                    />
                  )}
                  {!id && <Input className={styles.adminInputShadow} />}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={1} lg={2}></Col>
            <Col xs={24} sm={8} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={8}>
                  <b>Lứa tuổi</b>
                </Col>
                <Col xs={14} sm={16}>
                  <DropdownButton
                    label={data?.age ?? 'Lứa tuổi'}
                    items={['a', 'b']}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className='flex flex-wrap my-3'>
            {data?.image?.map((img: string, index: number) => {
              return (
                <span key={index} className='relative drop-shadow-md mx-2'>
                  <Image
                    style={{ maxWidth: 100, maxHeight: 100 }}
                    src={img}
                    alt='img'
                  />
                  <Button
                    className='absolute flex items-center  justify-center'
                    style={{
                      top: -6,
                      right: -6,
                      width: 14,
                      height: 14,
                      fontSize: 8,
                      borderRadius: 12,
                      backgroundColor: Colors.adminRed900,
                      color: Colors.white,
                    }}
                    icon={<CloseOutlined />}
                  ></Button>
                </span>
              )
            })}
            <Button
              icon={<FileImageOutlined />}
              style={{
                height: 100,
                marginLeft: 10,
                backgroundColor: Colors.adminGreen900,
                color: Colors.white,
                fontWeight: 'bold',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Thêm ảnh
            </Button>
          </div>
          <p className='flex justify-end'>
            <AddButton label='Lưu' icon={<CheckOutlined />} />
          </p>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddButton
            label='Thêm lựa chọn'
            onClick={() => {}}
            large
            icon={<PlusOutlined />}
          />
        </div>
        {data?.classify &&
          data.classify.map((item: any, index: number) => {
            return (
              <div key={index}>
                <TableList<DataWarehouse>
                  data={item.containedAt}
                  columns={columns}
                  pagination={false}
                  loading={loading}
                  header={
                    <Row>
                      <Col xs={24} sm={15} lg={10}>
                        <Space className='mb-4'>
                          <b>Màu</b>
                          <Input
                            className={styles.adminInputShadow}
                            defaultValue={item.color}
                          />
                        </Space>
                      </Col>
                      <Col xs={24} sm={9} lg={8}>
                        <Space className='mb-4'>
                          <b>Kích thước</b>
                          <DropdownButton label={item.size} items={['S']} />
                        </Space>
                      </Col>
                      <Col xs={24} sm={24} lg={6}>
                        <AddButton
                          label='Thêm vào kho mới'
                          onClick={() => {
                            routes.push(
                              `${BASE_URL}/admin/goods/tranfer?id=${id}&size=${item.size}&color=${item.color}`
                            )
                          }}
                        />
                      </Col>
                    </Row>
                    // <div className='flex justify-between'>
                    //   <Space>
                    //     <b>Màu</b>
                    //     <Input
                    //       className={styles.adminInputShadow}
                    //       defaultValue={item.color}
                    //     />
                    //   </Space>

                    //   <Space>
                    //     <b>Kích thước</b>
                    //     <DropdownButton label={item.size} items={['S']} />
                    //   </Space>
                    //   <AddButton
                    //     label='Thêm vào kho mới'
                    //     onClick={() => {
                    //       routes.push(
                    //         `${BASE_URL}/admin/goods/tranfer?id=${id}&size=${item.size}&color=${item.color}`
                    //       )
                    //     }}
                    //   />
                    // </div>
                  }
                />
              </div>
            )
          })}
      </Space>
    </>
  )
}

Detail.displayName = 'Goods Detail'

export default Detail
