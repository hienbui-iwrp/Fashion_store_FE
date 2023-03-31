import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors, Routes } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, DatePicker, Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { formatDate, formatNumber, ModalAddEditStaff } from '@/utils'
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
      title: 'Cửa hàng',
      dataIndex: 'branch',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.branch.toLowerCase() > b.branch.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Mã đơn',
      dataIndex: 'id',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Ngày giao dịch',
      dataIndex: 'createdDate',
      render(text: string, record: DataType, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 130 },
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.createdDate > b.createdDate ? 1 : -1,
    })

    columns.push({
      title: 'Giá trị',
      dataIndex: 'total',
      render(text: string, record: DataType, index: number) {
        return formatNumber(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 50 },
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

  return (
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
            <DatePicker style={{ borderRadius: 12 }} />
            <DatePicker style={{ borderRadius: 12 }} />
          </Space>
          <InputSearch />
        </div>
        <TableList<DataType>
          data={data}
          title='Danh sách đơn hàng'
          columns={columns}
          selectUrl={Routes.admin.orderDetail}
          loading={loading}
          ellipsis={true}
        />
      </Space>
    </>
  )
}

Order.displayName = 'Order Management'

export default Order
