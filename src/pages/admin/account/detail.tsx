import React, { useEffect, useState } from 'react'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, Col, List, Row, Space } from 'antd'
import { LayoutAdmin } from '@/components'
import { useRouter } from 'next/router'
import { formatDate } from '@/utils'

interface DataType {
  id: string
  account: string
  name: string
  phone: string
  dateOfBirth: Date
  address: string
  createdDate: Date
}

interface ItemType {
  name: string
  content: string
}

const Detail = () => {
  const [data, setData] = useState<DataType>()
  const [dataItems1, setDataItems1] = useState<ItemType[]>()
  const [dataItems2, setDataItems2] = useState<ItemType[]>()

  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      })
  }
  console.log(data)

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  const content = (
    <Row>
      <Col xs={24} lg={10} style={{ marginRight: 25, marginBottom: 25 }}>
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
      <Col xs={24} lg={13}>
        <Card>asdasdasd</Card>
      </Col>
    </Row>
  )

  return <LayoutAdmin content={content} selected={3} />
}

Detail.displayName = 'Account Detail'

export default Detail
