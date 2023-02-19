import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, DatePicker, Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { formatDate, formatNumber, ModalAddEditStaff } from '@/utils'
import { InputSearch } from '@/components'

interface DataType {
  id: string
  user: string
  total: number
  createdDate: Date
}

const Online = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)

  const columns: ColumnsType<DataType> = []
  if (data) {
    columns.push({
      title: 'STT',
      dataIndex: '',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{index}</div>,
        }
      },
    })

    columns.push({
      title: 'Người dùng',
      dataIndex: 'user',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Mã đơn',
      dataIndex: 'id',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Ngày giao dịch',
      dataIndex: 'createdDate',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{formatDate(text)}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.createdDate > b.createdDate ? 1 : -1,
    })

    columns.push({
      title: 'Giá trị',
      dataIndex: 'total',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{formatNumber(text)}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.total > b.total ? 1 : -1),
    })
  }

  const getData = async () => {
    await axios.get(`${BASE_URL}/api/admin/orderOnlineData`).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <LayoutAdmin selected={71}>
      {' '}
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Space size='large' style={{ marginBottom: 10 }}>
            <DatePicker style={{ borderRadius: 12 }} />
            <DatePicker style={{ borderRadius: 12 }} />
          </Space>
          <InputSearch />
        </div>
        <TableList<DataType>
          data={data}
          title='Danh sách nhân viên'
          columns={columns}
          selectUrl={BASE_URL + 'admin/order/detail'}
          loading={loading}
          ellipsis={true}
        />
      </Space>
    </LayoutAdmin>
  )
}

Online.displayName = 'Order Online Management'

export default Online
