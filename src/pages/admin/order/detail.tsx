import { LayoutAdmin, TableList } from '@/components'
import { BASE_URL } from '@/constants'
import { formatAddress, formatDate, formatNumber } from '@/utils'
import { Card, Col, Divider, Row } from 'antd'
import { ColumnsType } from 'antd/es/table'
import axios from 'axios'
import { useRouter } from 'next/router'
import { resourceUsage } from 'process'
import React, { useEffect, useState } from 'react'

type DataType = {
  id: string
  branch: string
  createdDate: Date
  goods: Goods[]
  tax: number
  discount: number
  staff?: string
  user?: string
  nameUser?: string
  street?: string
  ward?: string
  district?: string
  province?: string
  ship?: number
}

type Goods = {
  name: string
  price: number
  quantity: number
}

const Detail = () => {
  const [data, setData] = useState<DataType>()

  const routes = useRouter()
  const { id } = routes.query

  const columns: ColumnsType<Goods> = []
  if (data) {
    columns.push({
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render(text: string, record: Goods, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: Goods, b: Goods) => (a.name > b.name ? 1 : -1),
    })
    columns.push({
      title: 'Đơn giá',
      dataIndex: 'price',
      render(text: string, record: Goods, index: number) {
        return formatNumber(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: Goods, b: Goods) => (a.price > b.price ? 1 : -1),
    })
    columns.push({
      title: 'Số lượng',
      dataIndex: 'quantity',
      render(text: string, record: Goods, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: Goods, b: Goods) => (a.quantity > b.quantity ? 1 : -1),
    })

    columns.push({
      title: 'Thành tiền',
      dataIndex: '',
      render(text: string, record: Goods, index: number) {
        return formatNumber(record.quantity * record.price)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: Goods, b: Goods) =>
        a.quantity * a.price > b.quantity * b.price ? 1 : -1,
    })
  }

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/orderDetail?id=${id}`)
      .then((res) => {
        setData(res.data)
      })
  }

  useEffect(() => {
    if (id) getData()
  }, [id])

  return (
    data && (
      <>
        <Card>
          <TableList<Goods>
            data={data?.goods ?? []}
            columns={columns}
            scroll={{ y: '30vh' }}
            header={
              <>
                <Row>
                  <Col xs={12}>
                    <Row>
                      <Col xs={24} lg={10}>
                        <b>Mã cửa hàng</b>
                      </Col>
                      <Col xs={24} lg={14}>
                        {data?.branch}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24} lg={10}>
                        <b>Ngày giao dịch</b>
                      </Col>
                      <Col xs={24} sm={14}>
                        {formatDate(data?.createdDate)}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12}>
                    <Row>
                      <Col xs={24} lg={10}>
                        <b>Mã đơn</b>
                      </Col>
                      <Col xs={24} lg={14}>
                        {data?.id}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24} lg={10}>
                        <b>
                          {data?.staff ? 'Nhân viên giao dịch' : 'Người mua'}
                        </b>
                      </Col>
                      <Col xs={24} lg={14}>
                        {data?.staff ?? ` ${data?.user} (${data?.nameUser})`}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {data?.street && (
                  <Row>
                    <Col xs={24} lg={5}>
                      <b>Địa chỉ</b>
                    </Col>
                    <Col xs={24} lg={18}>
                      {formatAddress(data)}
                    </Col>
                  </Row>
                )}
              </>
            }
            pagination={false}
          />
          <Divider
            style={{
              height: 2,
              backgroundColor: '#333',
            }}
          />
          <div className='flex justify-end'>
            <Col xs={18} sm={12} lg={8}>
              <Row>
                <Col span={12}>
                  <b>Tổng tiền</b>
                </Col>
                <Col span={12}>
                  {formatNumber(
                    data?.goods?.reduce(
                      (acc: number, cur: any) => acc + cur.price * cur.quantity,
                      0
                    ) ?? 0
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={12}>Thuế</Col>
                <Col span={12}>{formatNumber(data?.tax ?? 0)}</Col>
              </Row>
              <Row>
                <Col span={12}>Khuyến mãi</Col>
                <Col span={12}>{formatNumber(data?.discount ?? 0)}</Col>
              </Row>
              {data?.ship && (
                <Row>
                  <Col span={12}>Phí ship</Col>
                  <Col span={12}>{formatNumber(data?.ship ?? 0)}</Col>
                </Row>
              )}
              <Divider />
              <Row>
                <Col span={12}>
                  <b>Tổng cộng</b>
                </Col>
                <Col span={12}>
                  {formatNumber(
                    (data?.goods?.reduce(
                      (acc: number, cur: any) => acc + cur.price * cur.quantity,
                      0
                    ) ?? 0) +
                      (data?.tax ?? 0) +
                      (data?.ship ?? 0)
                  )}
                </Col>
              </Row>
            </Col>
          </div>
        </Card>
      </>
    )
  )
}

export default Detail
