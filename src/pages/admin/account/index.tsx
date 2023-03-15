import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { getAllAccount } from '@/api/account'
import { EditOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { Card, Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { formatDate, ModalAddEditStaff, formatAccountDataXML } from '@/utils'
import { InputSearch } from '@/components'

interface DataType {
  id: string
  account: string
  name: string
  phone: string
  dateOfBirth: Date
  address: string
  createdDate: Date
}

const Account = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)

  const columns: ColumnsType<DataType> = []
  if (data) {
    columns.push({
      title: 'Mã tài khoản',
      dataIndex: 'id',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1,
      fixed: 'left',
    })

    columns.push({
      title: 'Tên tài khoản',
      dataIndex: 'account',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.account.toLowerCase() > b.account.toLowerCase() ? 1 : -1,
      fixed: 'left',
    })

    columns.push({
      title: 'Tên người dùng',
      dataIndex: 'name',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Điện thoại',
      dataIndex: 'phone',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.phone > b.phone ? 1 : -1),
    })

    columns.push({
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{formatDate(text)}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.dateOfBirth > b.dateOfBirth ? 1 : -1,
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: 'address',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.address.toLowerCase() > b.address.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{formatDate(text)}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) =>
        a.createdDate > b.createdDate ? 1 : -1,
    })
  }

  const getData = async () => {
    await getAllAccount().then((res) => {
      if(res?.StatusCode == 200) {
        const _data = res?.Data.map((item: any) => {
          return formatAccountDataXML(item)
        })
        console.log('data',_data);
      }
    })

    await axios.get(`${BASE_URL}/api/admin/accountData`).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <LayoutAdmin selected={3}>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <InputSearch />
        </div>
        <TableList<DataType>
          data={data}
          title='Danh sách nhân viên'
          columns={columns}
          selectUrl={BASE_URL + 'admin/account/detail'}
          loading={loading}
          ellipsis={true}
          scroll={{ x: '75vw' }}
        />
      </Space>
    </LayoutAdmin>
  )
}

Account.displayName = 'Account Management'

export default Account
