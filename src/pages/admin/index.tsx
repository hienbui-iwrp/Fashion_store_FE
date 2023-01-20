import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import LayoutAdmin from '@/components/Layout/LayoutAdmin/LayoutAdmin'
import AddButton from '@/components/Button/AddButton'
import TableList from '@/components/Table/table'
import { ColumnsType } from 'antd/es/table'
import { Colors } from '@/constants'
import axios from 'axios'

interface DataType {
  id: string
  name: string
  address: string
}

const BranchManagement = memo(() => {
  const [data, setData] = useState<DataType[]>([])

  const columns: ColumnsType<DataType> = []
  if (data[0])
    for (const key in data[0]) {
      columns.push({
        title: key,
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

  const getData = async () => {
    await axios.get(`http://localhost:3000/api/branchData`).then((res) => {
      console.log(res)
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
        title='Danh sách kho'
        columns={columns}
      />
    </div>
  )

  return <LayoutAdmin content={content} selected={0} />
})

BranchManagement.displayName = 'Branch Management'

export default BranchManagement
