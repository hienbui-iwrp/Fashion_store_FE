import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, BRANCH_SERVICE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { ModalAddEditBranch } from '@/utils'

interface DataType {
  id: string
  name: string
  address: string
  createdAt: Date
  manager: string
  openTime: Date
  closeTime: Date
}

const Branch = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)
  const [currentData, setCurrentData] = useState<DataType>()

  const columns: ColumnsType<DataType> = []
  if (data[0]) {
    columns.push({
      title: 'Mã chi nhánh',
      dataIndex: 'id',
      sorter: (a: DataType, b: DataType) => (a.id > b.id ? 1 : -1),
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: (a: DataType, b: DataType) => (a.address > b.address ? 1 : -1),
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: '',
      render(text: string, record: DataType, index: number) {
        return {
          children: (
            <AddButton
              iconInput={<EditOutlined />}
              borderRadius={5}
              onClick={(e) => {
                setCurrentData(record)
                e.stopPropagation()
                setModalAddEditBranch(true)
              }}
            />
          ),
        }
      },
    })
  }

  const getData = async () => {
    await axios.get(`${BRANCH_SERVICE_URL}/`).then((res) => {
      // BranchCode string
      // BranchName string
      // BranchProvince string
      // BranchDistrict string
      // BranchWard string
      // BranchStreet string
      // CreatedAt time.Time
      // Manager string
      // OpenTime time.Time
      // CloseTime time.Time
      setData(formatData(res.data.Data))
    })
  }

  const formatData = (data: any) => {
    return data.map((item: any) => {
      return {
        id: item.BranchCode,
        name: item.BranchName,
        address:
          item.BranchStreet +
          ', ' +
          item.BranchWard +
          ', ' +
          item.BranchDistrict +
          ', ' +
          item.BranchProvince,
        createdAt: new Date(item.CreatedAt),
        openTime: new Date(item.OpenTime),
        closeTime: new Date(item.CloseTime),
      }
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  const content = (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='small'>
        <AddButton
          label='Thêm mới'
          onClick={() => setModalAddEditBranch(true)}
          large
        />
        <TableList<DataType>
          data={data ?? []}
          title='Danh sách chi nhánh'
          columns={columns}
          selectUrl={BASE_URL + 'admin/branch/detail/'}
          loading={loading}
        />
      </Space>
      {modalAddEditBranch && (
        <ModalAddEditBranch
          open={modalAddEditBranch}
          cancel={() => setModalAddEditBranch(false)}
          extraData={currentData}
        />
      )}
    </>
  )

  return <LayoutAdmin content={content} selected={0} />
}

Branch.displayName = 'Branch Management'

export default Branch
