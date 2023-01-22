import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import LayoutAdmin from '@/components/Layout/LayoutAdmin/LayoutAdmin'
import AddButton from '@/components/Button/AddButton'
import TableList from '@/components/Table/table'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router'

interface DataType {
  id: string
  name: string
  address: string
}

const BranchDetail = memo(() => {
  const [data, setData] = useState<DataType[]>([])
  const router = useRouter()
  console.log(router.query)

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
        ellipsis: true,
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
                console.log('edit')
              }}
            />
          ),
        }
      },
    })
  }

  const getData = async () => {
    await axios.get(`http://localhost:3000/api/branchData`).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const content = (
    <div>
      <AddButton label='Thêm mới' />
      <TableList<DataType>
        data={data}
        title='Danh sách chi nhánh'
        columns={columns}
        selectUrl={BASE_URL}
      />
    </div>
  )

  return <LayoutAdmin content={content} selected={0} />
})

BranchDetail.displayName = 'Branch Detail'

export default BranchDetail
