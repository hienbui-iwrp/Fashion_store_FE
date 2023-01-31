import React, { useEffect, useState } from 'react'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { Card, Col, Row, Image, List, Space, Modal } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'
import { AddButton, LayoutAdmin, RemoveButton } from '@/components'
import { ModalAddBranch } from '@/utils/modals'
import { useModalDelete } from '@/hooks'
import { formatTime } from '@/utils'

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
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])
  const [statisticData, setStatisticData] = useState<StatisticDataType[]>([])
  const [dataFetch, setDataFetch] = useState<DataType>()
  const [modalAddBranch, setModalAddBranch] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/branchDetailData?id=${id}`)
      .then((res) => {
        formatData(res.data)
        setDataFetch(res.data)
      })
  }
  const formatData = (data: any) => {
    let dataFormat: any[] = []
    for (const key in data) {
      if (key == 'image') continue
      if (key == 'startTime' || key == 'endTime')
        dataFormat = [...dataFormat, { [key]: new Date(data[key]) }]
      else dataFormat = [...dataFormat, { [key]: data[key] }]
    }

    setData(dataFormat)
  }

  const getStatisticData = async () => {
    await axios.get(`${BASE_URL}/api/admin/statisticData`).then((res) => {
      setStatisticData(res.data)
    })
  }

  useEffect(() => {
    getData()
    getStatisticData()
  }, [])

  const { showModelDelete, contextModalDelete } = useModalDelete({
    title: 'Xóa chi nhánh',
    content: 'Bạn có chắc  chắn muốn xóa chi nhánh này?',
    onOk: () => {
      console.log('delete branch')
    },
  })

  const content = (
    <Space direction='vertical' style={{ width: '99%' }} size='large'>
      <Card className='!max-w-full-lg'>
        <LineChart data={statisticData} haveRevenue={false} haveProfit={true} />
      </Card>
      <Card className='!max-w-full-lg'>
        <LineChart data={statisticData} haveRevenue={true} haveProfit={false} />
      </Card>
    </Space>
  )

  return <LayoutAdmin content={content} selected={1} />
}

StatisticManagement.displayName = 'Statistic Management'

export default StatisticManagement
