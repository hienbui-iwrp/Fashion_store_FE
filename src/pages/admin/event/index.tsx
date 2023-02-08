import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { formatDate, formatTime } from '@/utils'
import { InputSearch } from '@/components'

interface DataType {
  id: string
  name: string
  startTime: Date
  endTime: Date
  discount: number
}

const Account = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)

  const columns: ColumnsType<DataType> = []
  if (data) {
    columns.push({
      title: 'Mã sự kiện',
      dataIndex: 'id',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Tên sự kiện',
      dataIndex: 'name',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
    })

    columns.push({
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{formatTime(text) + ' - ' + formatDate(text)}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.startTime > b.startTime ? 1 : -1,
    })
    columns.push({
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{formatTime(text) + ' - ' + formatDate(text)}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.endTime > b.endTime ? 1 : -1),
    })

    columns.push({
      title: 'Mức giảm',
      dataIndex: 'discount',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text + '%'}</div>,
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

  const content = (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div className='flex justify-between'>
          <AddButton label='Thêm mới' onClick={() => {}} large />
          <InputSearch />
        </div>
        <TableList<DataType>
          data={data}
          title='Danh sách sự kiện'
          columns={columns}
          selectUrl={BASE_URL + 'admin/event/detail'}
          loading={loading}
          ellipsis={true}
        />
      </Space>
    </>
  )

  return <LayoutAdmin content={content} selected={4} />
}

Account.displayName = 'Account Management'

export default Account
