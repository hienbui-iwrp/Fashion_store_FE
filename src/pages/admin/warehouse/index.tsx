import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import styles from '@/styles/Admin.module.css'
import { Card, Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import {
  formatAddress,
  formatDate,
  formatTime,
  ModalAddEditWarehouse,
} from '@/utils'
import { InputSearch } from '@/components'

type DataType = {
  id: string
  name: string
  street: string
  ward: string
  distict: string
  province: string
  capacity: string
  empty: string
  manager: string
  staff: number
  createdDate: Date
}
const Warehouse = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditWarehouse, setModalAddEditWarehouse] = useState(false)
  const [currentData, setCurrentData] = useState<DataType>()

  const columns: ColumnsType<DataType> = []
  if (data) {
    columns.push({
      title: 'Mã kho',
      dataIndex: 'id',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.id > b.id ? 1 : -1),
      fixed: 'left',
    })

    columns.push({
      title: 'Tên kho',
      dataIndex: 'name',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
      fixed: 'left',
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: '',
      render(text: string, record: DataType, index: number) {
        return formatAddress(record)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataType, b: DataType) =>
        formatAddress(a) > formatAddress(b) ? 1 : -1,
    })

    columns.push({
      title: 'Sức chứa',
      dataIndex: 'capacity',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.capacity > b.capacity ? 1 : -1),
    })

    columns.push({
      title: 'Còn lại',
      dataIndex: 'empty',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.empty > b.empty ? 1 : -1),
    })

    columns.push({
      title: 'Quản lý',
      dataIndex: 'manager',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.manager > b.manager ? 1 : -1),
    })

    columns.push({
      title: 'Nhân viên',
      dataIndex: 'staff',
      render(text: string, record: DataType, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: DataType, b: DataType) => (a.staff > b.staff ? 1 : -1),
    })

    columns.push({
      title: 'Ngày thành lập',
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
  }

  const getData = async () => {
    await axios.get(`${BASE_URL}/api/admin/warehouseData`).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
      {' '}
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div className='flex justify-between'>
          <AddButton
            label='Thêm mới'
            onClick={() => {
              setCurrentData(undefined)
              setModalAddEditWarehouse(true)
            }}
            large
          />
          <InputSearch />
        </div>
        <TableList<DataType>
          data={data}
          title='Danh sách kho'
          columns={columns}
          loading={loading}
          ellipsis={true}
          scroll={{ x: '75vw' }}
          onSelectRow={() => setModalAddEditWarehouse(true)}
          callback={(item: any) => setCurrentData(item)}
        />
      </Space>
      {modalAddEditWarehouse && (
        <ModalAddEditWarehouse
          open={modalAddEditWarehouse}
          cancel={() => setModalAddEditWarehouse(false)}
          extraData={currentData}
        />
      )}
    </>
  )
}

Warehouse.displayName = 'Warehouse Management'

export default Warehouse
