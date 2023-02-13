import React, { useEffect, useState } from 'react'
import { BASE_URL } from '@/constants'
import axios from 'axios'
import { Card, Space, DatePicker, Row, Col } from 'antd'
import { LineChart } from '@/components/LineChart'
import { AddButton, DropdownButton, FilterTag, LayoutAdmin } from '@/components'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from '@/styles/Admin.module.css'
import { ModalAllGoods } from '@/utils'

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

const Statistic = () => {
  const [statisticData, setStatisticData] = useState<StatisticDataType[]>([])
  const [modalAllGoods, setModalAllGoods] = useState(false)

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

  return (
    <LayoutAdmin selected={1}>
      {' '}
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <Card className='!max-w-full-lg'>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col xs={24} sm={24} lg={10} className='my-2'>
              <Space direction='horizontal' size={15}>
                <DropdownButton label={'Chi nhánh'} items={items} />
                <DropdownButton label={'Giới tính'} items={items} />
                <DropdownButton label={'Loại'} items={items} />
              </Space>
            </Col>
            <Col xs={24} sm={16} lg={8} className='my-2'>
              <Space direction='horizontal' size={15}>
                <DatePicker
                  placeholder='Start Date'
                  format={'DD/MM/YYYY'}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    console.log(dateString)
                  }}
                />
                <DatePicker
                  placeholder='End Date'
                  format={'DD/MM/YYYY'}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    console.log(dateString)
                  }}
                />
              </Space>
            </Col>
            <Col xs={24} sm={8} lg={4} className='my-2'>
              <AddButton
                label='Chọn sản phẩm'
                onClick={() => setModalAllGoods(true)}
              />
            </Col>
          </Row>
          <Space size={4}>
            <FilterTag
              label='Nam'
              onClick={() => {
                console.log('close')
              }}
            />
            <FilterTag
              label='Áo khoác'
              onClick={() => {
                console.log('close')
              }}
            />
          </Space>

          <LineChart data={statisticData} profit showTotal />
        </Card>
        <Card className='!max-w-full-lg'>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col xs={24} lg={24} xl={10} className='my-2'>
              <Space direction='horizontal' size={25}>
                <DropdownButton label={'Chi nhánh'} items={items} />
                <DropdownButton label={'Giới tính'} items={items} />
                <DropdownButton label={'Loại'} items={items} />
              </Space>
            </Col>
            <Col xs={24} lg={16} xl={8} className='my-2'>
              <Space direction='horizontal' size={25}>
                <DatePicker
                  placeholder='Start Date'
                  format={'DD/MM/YYYY'}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    console.log(dateString)
                  }}
                />
                <DatePicker
                  placeholder='End Date'
                  format={'DD/MM/YYYY'}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    console.log(dateString)
                  }}
                />
              </Space>
            </Col>
            <Col xs={24} lg={8} xl={4} className='my-2'>
              <AddButton
                label='Chọn sản phẩm'
                onClick={() => setModalAllGoods(true)}
              />
            </Col>
          </Row>
          <LineChart data={statisticData} revenue showTotal />
        </Card>
      </Space>
      <ModalAllGoods
        open={modalAllGoods}
        cancel={() => setModalAllGoods(false)}
        single={true}
      />
    </LayoutAdmin>
  )
}

Statistic.displayName = 'Statistic Management'

export default Statistic
