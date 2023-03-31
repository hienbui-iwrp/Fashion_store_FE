import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors, Routes } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { formatDate, formatTime } from '@/utils'
import { InputSearch } from '@/components'
import { useRouter } from 'next/router'

interface DataType {
  id: string
  name: string
  startTime: Date
  endTime: Date
  discount: number
}

const Event = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const columns: ColumnsType<DataType> = []
  if (data) {
    columns.push({
      title: 'Mã sự kiện',
      dataIndex: 'id',
      fixed: 'left',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 110 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Tên sự kiện',
      dataIndex: 'name',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 110 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
    })

    columns.push({
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      render(text: string, record: DataType, index: number) {
        return formatTime(text) + ' - ' + formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 150 },
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.startTime > b.startTime ? 1 : -1,
    })
    columns.push({
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      render(text: string, record: DataType, index: number) {
        return formatTime(text) + ' - ' + formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 150 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.endTime > b.endTime ? 1 : -1),
    })

    columns.push({
      title: 'Mức giảm',
      dataIndex: 'discount',
      render(text: string, record: DataType, index: number) {
        return text + '%'
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.discount > b.discount ? 1 : -1),
    })
  }

  const getData = async () => {
    await axios.get(`${BASE_URL}/api/admin/eventData`).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div className='flex justify-between'>
          <AddButton
            label='Thêm mới'
            onClick={() => {
              router.push(BASE_URL + 'event/detail')
            }}
            large
          />
          <InputSearch />
        </div>
        <TableList<DataType>
          data={data}
          title='Danh sách sự kiện'
          columns={columns}
          selectUrl={Routes.admin.eventDetail}
          loading={loading}
          ellipsis={true}
        />
      </Space>
    </>
  )
}

Event.displayName = 'Event Management'

export default Event
