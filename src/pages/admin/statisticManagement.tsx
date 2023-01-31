import React, { useEffect, useState } from 'react'
import { BASE_URL } from '@/constants'
import axios from 'axios'
import { Card, Space, DatePicker, Row, Col } from 'antd'
import { LineChart } from '@/components/LineChart'
import { AddButton, DropdownButton, LayoutAdmin } from '@/components'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

interface DataType {
  id: string
  name: string
  address: string
  manager: string
  area: number
  staff: number
  startTime: Date
  endTime: Date
  image?: string
}

interface StatisticDataType {
  revenue?: number
  profit?: number
  date: Date
}

const StatisticManagement = () => {
  const [statisticData, setStatisticData] = useState<StatisticDataType[]>([])

  const getStatisticData = async () => {
    await axios.get(`${BASE_URL}/api/admin/statisticData`).then((res) => {
      setStatisticData(res.data)
    })
  }

  useEffect(() => {
    getStatisticData()
  }, [])

  const items = [
    { content: 'item 1', onclick: () => {} },
    { content: 'item 2', onclick: () => {} },
    { content: 'item 3', onclick: () => {} },
    { content: 'item 4', onclick: () => {} },
  ]

  const content = (
    <Space direction='vertical' style={{ width: '99%' }} size='large'>
      <Card className='!max-w-full-lg'>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col xs={24} lg={24} xl={10} className='my-2'>
            <Space direction='horizontal' size={10}>
              <DropdownButton label={'Chi nhánh'} items={items} />
              <DropdownButton label={'Giới tính'} items={items} />
              <DropdownButton label={'Loại'} items={items} />
            </Space>
          </Col>
          <Col xs={24} lg={16} xl={8} className='my-2'>
            <Space direction='horizontal' size={10}>
              <DatePicker
                placeholder='Start Date'
                format={'DD/MM/YYYY'}
                onChange={(date, dateString) => {
                  console.log(dateString)
                }}
              />
              <DatePicker
                placeholder='End Date'
                format={'DD/MM/YYYY'}
                onChange={(date, dateString) => {
                  console.log(dateString)
                }}
              />
            </Space>
          </Col>
          <Col xs={24} lg={8} xl={4} className='my-2'>
            <AddButton label='Chọn sản phẩm' />
          </Col>
        </Row>

        <LineChart data={statisticData} haveRevenue={false} haveProfit={true} />
      </Card>
      <Card className='!max-w-full-lg'>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col xs={24} lg={24} xl={10} className='my-2'>
            <Space direction='horizontal' size={10}>
              <DropdownButton label={'Chi nhánh'} items={items} />
              <DropdownButton label={'Giới tính'} items={items} />
              <DropdownButton label={'Loại'} items={items} />
            </Space>
          </Col>
          <Col xs={24} lg={16} xl={8} className='my-2'>
            <Space direction='horizontal' size={10}>
              <DatePicker
                placeholder='Start Date'
                format={'DD/MM/YYYY'}
                onChange={(date, dateString) => {
                  console.log(dateString)
                }}
              />
              <DatePicker
                placeholder='End Date'
                format={'DD/MM/YYYY'}
                onChange={(date, dateString) => {
                  console.log(dateString)
                }}
              />
            </Space>
          </Col>
          <Col xs={24} lg={8} xl={4} className='my-2'>
            <AddButton label='Chọn sản phẩm' />
          </Col>
        </Row>
        <LineChart data={statisticData} haveRevenue={true} haveProfit={false} />
      </Card>
    </Space>
  )

  return <LayoutAdmin content={content} selected={1} />
}

StatisticManagement.displayName = 'Statistic Management'

export default StatisticManagement
