import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
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
}

const BranchManagement = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)

  const columns: ColumnsType<DataType> = []
  if (data[0]) {
    for (const key in data[0]) {
      columns.push({
        title:
          key === 'id'
            ? 'Mã chi nhánh'
            : key === 'name'
            ? 'Tên chi nhánh'
            : 'Địa chỉ',
        dataIndex: key,
        sorter: (a: DataType, b: DataType) => (a[key] > b[key] ? 1 : -1),
        render(text: string, record: DataType, index: number) {
          return {
            props: {
              style: {
                background: index % 2 ? Colors.white : Colors.adminBackground,
              },
            },
            children: <div>{text}</div>,
          }
        },
      })
    }
    columns.push({
      title: '',
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: (
            <AddButton
              iconInput={<EditOutlined />}
              borderRadius={5}
              onClick={(e) => {
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
    await axios.get(`${BASE_URL}/api/admin/branchData`).then((res) => {
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
        <AddButton
          label='Thêm mới'
          onClick={() => setModalAddEditBranch(true)}
        />
        <TableList<DataType>
          data={data}
          title='Danh sách chi nhánh'
          columns={columns}
          selectUrl={BASE_URL + 'admin/branchDetail/'}
          loading={loading}
        />
      </Space>
      <ModalAddEditBranch
        open={modalAddEditBranch}
        cancel={() => setModalAddEditBranch(false)}
      />
    </>
  )

  return <LayoutAdmin content={content} selected={0} />
}

BranchManagement.displayName = 'Branch Management'

export default BranchManagement
