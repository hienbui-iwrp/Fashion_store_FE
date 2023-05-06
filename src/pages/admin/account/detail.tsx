import React, { useEffect, useState } from 'react'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, Col, DatePicker, List, Row } from 'antd'
import { TableList } from '@/components'
import { useRouter } from 'next/router'
import { formatDate, formatNumber, ModalOrderDetail } from '@/utils'
import { ColumnsType } from 'antd/es/table'
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
  account: string
  name: string
  phone: string
  dateOfBirth: Date
  address: string
  createdDate: Date
}

interface OrderData {
  id: string
  status: string
  total: number
  createdDate: Date
  goods: { id: string; name: string; price: number; quantity: number }[]
  tax: number
}

interface ItemType {
  name: string
  content: string
}

const Detail = () => {
  const [data, setData] = useState<DataType>()
  const [orderData, setOrderData] = useState<OrderData[]>([])
  const [dataItems1, setDataItems1] = useState<ItemType[]>()
  const [dataItems2, setDataItems2] = useState<ItemType[]>()
  const [loading, setLoading] = useState(true)
  const [modalOrderDetail, setModalOrderDetail] = useState(false)
  const [currentData, setCurrentData] = useState<OrderData>()

  const routes = useRouter()

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/accountDetailData?id=${routes.query.id}`)
      .then((res) => {
        setData(res.data)
        const _data = res.data
        setDataItems1([
          { name: 'Mã tài khoản', content: _data.id },
          { name: 'Tên người dùng', content: _data.name },
          { name: 'Điện thoại', content: _data.phone },
        ])
        setDataItems2([
          { name: 'Ngày sinh', content: formatDate(_data.dateOfBirth) },
          { name: 'Ngày tạo', content: formatDate(_data.createdDate) },
          { name: 'Địa chỉ', content: _data.address },
        ])
      })
  }

  const getOrderData = async () => {
    await axios.get(`${BASE_URL}/api/admin/accountOrderData`).then((res) => {
      setOrderData(res.data)
    })
  }

  useEffect(() => {
    getData()
    getOrderData()
    setLoading(false)
  }, [])

  const columns: ColumnsType<OrderData> = []
  if (data) {
    columns.push({
      title: 'Mã đơn',
      dataIndex: 'id',
      render(text: string, record: OrderData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: OrderData, b: OrderData) => (a.id > b.id ? 1 : -1),
    })
    columns.push({
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      render(text: string, record: OrderData, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: OrderData, b: OrderData) =>
        a.createdDate > b.createdDate ? 1 : -1,
    })

    columns.push({
      title: 'Trạng thái',
      dataIndex: 'status',
      render(text: string, record: OrderData, index: number) {
        return text
      },
      onCell: (record, index: number | undefined) => {
        return {
          style: {
            background: index ? (index % 2 ? Colors.white : Colors.adminBackground) : Colors.adminBackground,
            color:
              record.status == 'Đang giao' ? Colors.adminRed500 : Colors.black,
            minWidth: 100,
          },
        }
      },
      sorter: (a: OrderData, b: OrderData) => (a.status > b.status ? 1 : -1),
    })
    columns.push({
      title: 'Tổng giá trị',
      dataIndex: 'total',
      render(text: string, record: OrderData, index: number) {
        return formatNumber(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 130 },
        }
      },
      sorter: (a: OrderData, b: OrderData) => (a.total > b.total ? 1 : -1),
    })
  }

  return (
    <>
      <Row>
        <Col xs={24} lg={8} style={{ marginRight: 25, marginBottom: 25 }}>
          <Card>
            <h2 style={{ marginBottom: 10, fontSize: 18 }}>
              <b>{data?.account}</b>
            </h2>
            <Row>
              <Col xs={12} lg={24}>
                <List
                  bordered={false}
                  dataSource={dataItems1 ?? []}
                  renderItem={(item) => {
                    return (
                      <Row style={{ padding: 8 }}>
                        <Col xs={24} sm={12}>
                          <b>{item.name}</b>
                        </Col>
                        <Col xs={24} sm={12}>
                          {item.content}
                        </Col>
                      </Row>
                    )
                  }}
                />
              </Col>
              <Col xs={12} lg={24}>
                <List
                  bordered={false}
                  dataSource={dataItems2 ?? []}
                  renderItem={(item) => {
                    return (
                      <Row style={{ padding: 8 }}>
                        <Col xs={24} sm={12}>
                          <b>{item.name}</b>
                        </Col>
                        <Col xs={24} sm={12}>
                          {item.content}
                        </Col>
                      </Row>
                    )
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={15}>
          <TableList<OrderData>
            scroll={{ x: '35vw' }}
            loading={loading}
            data={orderData}
            columns={columns}
            ellipsis={true}
            onSelectRow={() => setModalOrderDetail(true)}
            callback={(item) => {
              setCurrentData(item)
            }}
            header={
              <Row className='flex justify-between	'>
                <Col>
                  <b>Đơn hàng</b>
                </Col>
                <Col>
                  <DatePicker
                    picker='month'
                    placeholder='Month'
                    format={'MM/YYYY'}
                    defaultValue={dayjs(formatDate(new Date()), 'MM/YYYY')}
                    className={styles.adminInputShadow}
                    onChange={(date, dateString) => {
                      console.log(dateString)
                    }}
                  />
                </Col>
              </Row>
            }
          />
        </Col>
      </Row>
      <ModalOrderDetail
        open={modalOrderDetail}
        cancel={() => setModalOrderDetail(false)}
        extraData={currentData}
      />
    </>
  )
}

Detail.displayName = 'Account Detail'

export default Detail
