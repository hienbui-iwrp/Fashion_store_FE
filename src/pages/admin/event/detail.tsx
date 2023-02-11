import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import {
  Card,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Space,
  TimePicker,
  Image,
  Form,
} from 'antd'
import { AddButton, LayoutAdmin, RemoveButton, TableList } from '@/components'
import { formatDate, formatTime, ModalAllGoods } from '@/utils'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

interface DataType {
  id: string
  name: string
  discount: number
  startTime: Date
  endTime: Date
  goods: Goods[]
  image: string
}

interface Goods {
  id: string
  name: string
  cost: number
  price?: number
  supplier?: string
  gender?: string
  type?: string
  age?: string
  color: string
  size: string
  image?: string[]
}

const Account = () => {
  const [data, setData] = useState<DataType>()
  const [loading, setLoading] = useState(true)
  const [modalAllGoods, setModalAllGoods] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const columns: ColumnsType<Goods> = []
  if (data) {
    columns.push({
      title: 'Mã sản phẩm',
      dataIndex: 'id',
      render(text: string, record: Goods, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: Goods, b: Goods) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Hình ảnh',
      dataIndex: 'image',
      render(text: string, record: Goods, index: number) {
        return {
          children: (
            <Image
              alt='img'
              src={record?.image ? record?.image[0] : ''}
              preview={{
                src: record?.image ? record?.image[0] : '',
              }}
              style={{
                maxWidth: 40,
                maxHeight: 40,
              }}
            />
          ),
        }
      },
    })

    columns.push({
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render(text: string, record: Goods, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: Goods, b: Goods) => (a.name > b.name ? 1 : -1),
    })

    columns.push({
      title: 'Kích thước',
      dataIndex: 'size',
      render(text: string, record: Goods, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: Goods, b: Goods) => (a.size > b.size ? 1 : -1),
    })

    columns.push({
      title: 'Màu sắc',
      dataIndex: 'color',
      render(text: string, record: Goods, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: Goods, b: Goods) => (a.color > b.color ? 1 : -1),
    })

    columns.push({
      title: 'Giá gốc',
      dataIndex: 'cost',
      render(text: string, record: Goods, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: Goods, b: Goods) => (a.cost > b.cost ? 1 : -1),
    })

    columns.push({
      title: '',
      dataIndex: '',
      render(text: string, record: Goods, index: number) {
        return {
          children: (
            <RemoveButton label='' borderRadius={5} onClick={() => {}} />
          ),
        }
      },
    })
  }

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/eventDetailData?id=${id}`)
      .then((res) => {
        setData(res.data)
      })
  }

  useEffect(() => {
    if (id) getData()
    setLoading(false)
  }, [id])

  const content = (
    <>
      <Card>
        <Row className='justify-between'>
          <Col xs={24} sm={20} lg={10}>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Tên sự kiện</b>
              </Col>
              <Col span={16}>
                {data && (
                  <Input
                    className={styles.adminInputShadow}
                    defaultValue={data.name}
                  />
                )}
                {!id && <Input className={styles.adminInputShadow} />}
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Mức giảm</b>
              </Col>
              <Col span={16}>
                {data && (
                  <InputNumber
                    className={styles.adminInputShadow}
                    defaultValue={data.discount}
                  />
                )}
                {!id && <InputNumber className={styles.adminInputShadow} />}
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Ảnh</b>
              </Col>
              <Col span={16}>
                <Space className='flex items-start justify-between items-center'>
                  <Image
                    alt='img'
                    src={
                      data?.image ??
                      'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
                    }
                    preview={{
                      src:
                        data?.image ??
                        'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
                    }}
                    style={{
                      maxWidth: 130,
                      boxShadow: '1px 1px 2px 1px #ccc',
                    }}
                  />
                  <AddButton
                    iconInput={<FileImageOutlined />}
                    label={'Chọn ảnh'}
                  />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={20} lg={11}>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Ngày</b>
              </Col>
              <Col span={16}>
                <Space size={30}>
                  {data && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                      defaultValue={dayjs(
                        formatDate(data?.startTime),
                        'DD/MM/YYYY'
                      )}
                    />
                  )}
                  {!id && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                    />
                  )}

                  {data && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                      defaultValue={dayjs(
                        formatDate(data?.endTime),
                        'DD/MM/YYYY'
                      )}
                    />
                  )}
                  {!id && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                    />
                  )}
                </Space>
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Thời điểm</b>
              </Col>
              <Col span={16}>
                <Space size={30}>
                  {data && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                      defaultValue={dayjs(formatTime(data?.startTime), 'HH:mm')}
                    />
                  )}
                  {!id && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                    />
                  )}
                  {data && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                      defaultValue={dayjs(formatTime(data?.endTime), 'HH:mm')}
                    />
                  )}
                  {!id && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                    />
                  )}
                </Space>
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Áp dụng</b>
              </Col>
              <Col span={16}>
                <div className='flex items-center	justify-between'>
                  <span>2 Sản phẩm</span>
                  <AddButton
                    label='Chọn sản phẩm'
                    onClick={() => setModalAllGoods(true)}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Space className='flex justify-end' size={'large'}>
          <RemoveButton
            label='Hủy'
            iconInput={<CloseOutlined />}
            borderRadius={10}
          />
          <AddButton
            label='Lưu'
            iconInput={<CheckOutlined />}
            borderRadius={10}
          />
        </Space>
      </Card>
      <TableList<Goods>
        data={data?.goods ?? []}
        title='Sản phẩm áp dụng'
        columns={columns}
        loading={loading}
        ellipsis={true}
      />
      {modalAllGoods && (
        <ModalAllGoods
          open={modalAllGoods}
          cancel={() => setModalAllGoods(false)}
          extraData={data?.goods.map((item) => {
            return { id: item.id, color: item.color, size: item.size }
          })}
        />
      )}
    </>
  )

  return <LayoutAdmin content={content} selected={4} />
}

Account.displayName = 'Account Management'

export default Account
