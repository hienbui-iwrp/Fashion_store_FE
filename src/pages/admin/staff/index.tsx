import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { ModalAddEditStaff } from '@/utils'
import { InputSearch } from '@/components'

interface DataType {
  id: string
  name: string
  role: string
  workingLocation: string
}

const Staff = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditStaff, setModalAddEditStaff] = useState(false)
  const [currentData, setCurrentData] = useState<DataType>()

  const columns: ColumnsType<DataType> = []
  if (data[0]) {
    for (const key in data[0]) {
      columns.push({
        title:
          key === 'id'
            ? 'Mã chi nhánh'
            : key === 'name'
            ? 'Tên'
            : key === 'role'
            ? 'Vị trí'
            : 'Nơi làm việc',
        dataIndex: key,
        sorter: (a: any, b: any) => (a[key] > b[key] ? 1 : -1),
        ellipsis: true,
        render(text: string, record: DataType, index: number) {
          return {
            children: <div>{text}</div>,
          }
        },
      })
    }
    columns.push({
      title: '',
      render(text: string, record: DataType, index: number) {
        return {
          children: (
            <AddButton
              iconInput={<EditOutlined />}
              borderRadius={5}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentData(record)
                setModalAddEditStaff(true)
              }}
            />
          ),
        }
      },
    })
  }

  const getData = async () => {
    await axios.get(`${BASE_URL}/api/admin/staffManagement`).then((res) => {
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddButton
            label='Thêm mới'
            onClick={() => setModalAddEditStaff(true)}
            large
          />
          <InputSearch />
        </div>
        <TableList<DataType>
          data={data}
          title='Danh sách nhân viên'
          columns={columns}
          selectUrl={BASE_URL + 'admin/staff/detail'}
          loading={loading}
        />
      </Space>
      {modalAddEditStaff && (
        <ModalAddEditStaff
          open={modalAddEditStaff}
          cancel={() => setModalAddEditStaff(false)}
          extraData={currentData}
        />
      )}
    </>
  )

  return <LayoutAdmin content={content} selected={20} />
}

Staff.displayName = 'Staff Management'

export default Staff
