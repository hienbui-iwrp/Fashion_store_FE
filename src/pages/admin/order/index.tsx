import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, DatePicker, Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { formatDate, FormatNumber, ModalAddEditStaff } from '@/utils'
import { InputSearch } from '@/components'

interface DataType {
  id: string
  branch: string
  total: number
  createdDate: Date
}

const Order = () => {
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
      title: 'Cửa hàng',
      dataIndex: 'branch',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.branch.toLowerCase() > b.branch.toLowerCase() ? 1 : -1,
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
          children: <div>{FormatNumber(text)}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.total > b.total ? 1 : -1),
    })
  }

  const getData = async () => {
    await axios.get(`${BASE_URL}/api/admin/orderData`).then((res) => {
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Space size='large' style={{ marginBottom: 10 }}>
            <DatePicker />
            <DatePicker />
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
    </>
  )

  return <LayoutAdmin content={content} selected={70} />
}

Order.displayName = 'Order Management'

export default Order
