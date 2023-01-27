import React, { useEffect, useState } from 'react'
import LayoutAdmin from '@/components/Layout/LayoutAdmin/LayoutAdmin'
import AddButton from '@/components/Button/AddButton'
import { TableList } from '@/components/TableList'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Image, List, Space } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'

const BranchDetail = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([
    { address: 'Đại học Bách Khoa, Đông hòa, DĨ an, Bình Dương' },
    { manager: 'VInh Hiển' },
    { area: 200 },
    { staff: 10 },
    { workingTime: '8:00->22:00' },
    { createdDate: '01/01/2022' },
  ])
  const router = useRouter()

  const getData = async () => {
    // await axios.get(`http://localhost:3000/api/branchData`).then((res) => {
    //   setData(res.data)
    // })
  }

  useEffect(() => {
    getData()
  }, [])

  const content = (
    <>
      <Card
        className='max-w-full-lg'
        title={'Chi nhánh 1'.toUpperCase()}
        bordered={false}
        loading={loading}
      >
        <Row justify='center' align='middle'>
          {/* xs sm lg xl */}
          <Col xs={24} sm={12}>
            <Image
              preview={true}
              src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${
                Math.random() * 10000
              }`}
              width={'80%'}
            />
          </Col>
          <Col xs={24} sm={12}>
            <List
              size={30}
              bordered={false}
              dataSource={data}
              renderItem={(item) => {
                const key = Object.keys(item)
                return (
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} sm={8}>
                      <b>{key}</b>
                    </Col>
                    <Col xs={24} sm={16}>
                      {item[key]}
                    </Col>
                  </Row>
                )
              }}
            />
            <Row justify='end' align='bottom'>
              <Space size={20}>
                <Button>Chỉnh sửa</Button>
                <Button>Xóa</Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card className='!max-w-full-lg'>
        <LineChart />
      </Card>
    </>
  )

  return <LayoutAdmin content={content} selected={0} />
}

BranchDetail.displayName = 'Branch Detail'

export default BranchDetail
