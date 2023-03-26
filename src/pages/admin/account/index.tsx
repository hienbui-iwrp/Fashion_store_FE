import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Routes } from '@/constants'
import { Space } from 'antd'
import { TableList } from '@/components'
import {
  formatDate,
  formatAccountDataXML,
  formatAddress,
  AccountProps,
} from '@/utils'
import { InputSearch } from '@/components'
import { getAllAccountBff } from '@/api'
import { useRouter } from 'next/router'

const Account = () => {
  const router = useRouter()
  const [data, setData] = useState<AccountProps[]>([])
  const [loading, setLoading] = useState(true)

  const columns: ColumnsType<AccountProps> = []
  if (data) {
    columns.push({
      title: 'Mã tài khoản',
      dataIndex: 'id',
      render(text: string, record: AccountProps, index: number) {
        return text
      },
      onCell: (record: AccountProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: AccountProps, b: AccountProps) =>
        a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1,
      fixed: 'left',
    })

    columns.push({
      title: 'Tên tài khoản',
      dataIndex: 'username',
      render(text: string, record: AccountProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: AccountProps, b: AccountProps) =>
        a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1,
      fixed: 'left',
    })

    columns.push({
      title: 'Tên người dùng',
      dataIndex: 'name',
      render(text: string, record: AccountProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 140 },
        }
      },
      sorter: (a: AccountProps, b: AccountProps) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Vai trò',
      dataIndex: '',
      render(text: string, record: AccountProps, index: number) {
        return record.role == 1 ? 'Khách hàng' : 'Quản trị viên'
      },
      sorter: (a: AccountProps, b: AccountProps) => (a.role > b.role ? 1 : -1),
    })

    columns.push({
      title: 'Điện thoại',
      dataIndex: 'phoneNumber',
      render(text: string, record: AccountProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: AccountProps, b: AccountProps) =>
        a.phoneNumber > b.phoneNumber ? 1 : -1,
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: '',
      render(text: string, record: AccountProps, index: number) {
        return formatAddress(record)
      },
      sorter: (a: AccountProps, b: AccountProps) =>
        formatAddress(a) > formatAddress(b) ? 1 : -1,
    })

    columns.push({
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render(text: string, record: AccountProps, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: AccountProps, b: AccountProps) =>
        a.createdAt > b.createdAt ? 1 : -1,
    })

    columns.push({
      title: 'Tình trạng',
      dataIndex: 'isActivated',
      render(text: string, record: AccountProps, index: number) {
        return text == 'true' ? 'Đã dừng' : 'Đang hoạt động'
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: AccountProps, b: AccountProps) =>
        a.isActivated > b.isActivated ? 1 : -1,
    })
  }

  const getData = async () => {
    await getAllAccountBff().then((res) => {
      if (res?.StatusCode == 200) {
        const _data = res?.Data.map((item: any) => {
          return formatAccountDataXML(item)
        })
        setData(_data)
      }
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <InputSearch />
        </div>
        <TableList<AccountProps>
          data={data}
          title='Danh sách nhân viên'
          columns={columns}
          // selectUrl={BASE_URL + 'admin/account/detail'}
          callback={(record: any) => {
            if (record.role == 1)
              router.push(Routes.admin.accountDetail + `?id=${record.id}`)
            else router.push(Routes.admin.staffDetail + `?id=${record.id}`)
          }}
          loading={loading}
          ellipsis={true}
          scroll={{ x: '50vw' }}
        />
      </Space>
    </>
  )
}

Account.displayName = 'Account Management'

export default Account
